const Cart = require('../models/Cart')

module.exports = {
    createCart: async(req, res)=>{
      try {

          const newCart = new Cart({userId, products})
          await newCart.save()
          return res.status(200).json(newCart)
      } catch (error) {
          return res.status(500).json(error)
      }
    },
    updateCart: async(req, res)=>{
        try {
            const cart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.json(cart)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getCart: async(req, res)=>{
      try {
          const cart = await Cart.findOne({userId: req.params.id})
          return res.status(200).json(cart)
      } catch (error) {
          return res.status(500).json(error)
      }
    },
    getCarts: async(req, res)=>{
        try {
            const carts = await Cart.find({})
            return res.status(200).json(carts)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    deleteCart: async(req, res)=>{
        try {
            await Cart.findByIdAndDelete(req.params.id)
            return res.status(200).json('Cart deleted')
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

