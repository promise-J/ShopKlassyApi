const User = require('../models/User')
const Product = require('../models/Product')
const bcrypt = require('bcrypt')

module.exports = {
    updateUser: async(req, res)=>{
        let updateUser = {}
        const {password, ...others} = req.body
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
            updateUser = {...req.body}
        }
        updateUser = {...others}
        try {
            
            const user = await User.findByIdAndUpdate(req.params.id, {$set: updateUser}, {new: true})
            res.json(user)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getUser: async(req, res)=>{
      try {
          const user = await User.findById(req.params.id)
          const {password, ...other} = user._doc
          return res.status(200).json(other)
      } catch (error) {
          return res.status(500).json(error)
      }
    },
    getUsers: async(req, res)=>{
        const query = req.query.new
        try {
            const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find({})
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    deleteUser: async(req, res)=>{
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            return res.status(200).json(`${user.username} deleted`)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getStat: async(req, res)=>{
        const date = new Date()
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
        try {       
                const data = await User.aggregate([
                    {$match: {createdAt: {$gte: lastYear}}},
                    {$project: {
                        month: {$month: "$createdAt"},
                    },
                  },
                    {$group: {_id: "$month", total: {$sum: 1},},}
                ])
                res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    updateCart: async(req, res)=>{
        try{
            const {productId, title, desc, img, size, color, price, quantity} = req.body
            let updatedCart
            const user = await User.findById(req.user._id)
            const exsitAlready = user.cart.some(c=> String(c.productId) === String(productId))
            console.log(exsitAlready)
            
            if(!exsitAlready){
            updatedCart = await User.findOneAndUpdate({_id: req.user._id}, {
                   $push: {
                       cart: {
                           productId,
                           quantity: Number(quantity),
                           title,
                           img,
                           desc,
                           price,
                           color,
                           size
                       }
                   }
               }, {new: true})
            return res.json(updatedCart.cart)
            }
            updatedCart = await User.findOneAndUpdate({_id: req.user._id, "cart.productId": productId}, {
                    "$set": {
                        "cart.$.quantity": Number(quantity)
                    }
            }, {new: true})
            // return res.json("record dey, updated")
            return res.status(200).json(updatedCart.cart)
        }catch(error){
            return res.status(500).json(error)
        }
    },
    fetchCartItem: async(req, res)=>{
        try {
            const {cart} = await User.findById(req.user._id)

            return res.status(200).json(cart)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    removeCartItem: async(req, res)=>{
        try {
            const { productId } = req.body
            if(!productId) return res.status(400).json('Provide a ProductId')

            const user = await User.findById(req.user._id)
            const existAlready = user.cart.some(c=> String(c.productId) === String(productId))
            if(!existAlready){
                return res.status(400).json("Product not in cart")
            }
            console.log('product exists')
            const result = await User.findOneAndUpdate({_id: req.user._id}, {
                $pull: {
                    cart: {productId}
                }
            }, {new: true})
            return res.status(200).json(result)
            // const res = await 
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    handleFavorite: async(req, res)=>{
        const productId = req.body.productId
        const userId = req.user._id
        try {
            const currentUser = await User.findById(userId)
            
            if(!productId) return res.status(400).json('Product ID must be defined')

            const favExists = await User.find({favorite: {"$in": [productId]}})
            if(favExists.length > 0){
                let allProducts
                const man = await User.findByIdAndUpdate(req.user._id, {
                    $pull: {favorite: productId}
                },{new: true})
                // allProducts = await Product.find({_id: man.favorite})
                return res.status(200).json({msg: "Product removed from favorite"})
            }
            const man = await User.findByIdAndUpdate(req.user._id,{
                 $push: {favorite: productId}
                },{new: true})
                // allProducts = await Product.find({_id: man.favorite})
            return res.status(200).json({msg: "Product added to favorite"})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
    fetchFavorite: async(req, res)=>{
        try {
            const user = await User.findById(req.user._id)
            const allProducts = await Product.find({_id: user.favorite})
            return res.status(200).json(allProducts)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

