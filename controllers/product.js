const Product = require('../models/Product')

module.exports = {
    createProduct: async(req, res)=>{
      try {
          const existProduct = await Product.findOne({title: req.body.title})
          if(existProduct) return res.status(400).json('This Product already exists')
          const newProduct = new Product(req.body)
          await newProduct.save()
          return res.status(200).json(newProduct)
      } catch (error) {
          return res.status(500).json(error)
      }
    },
    updateProduct: async(req, res)=>{
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.json(product)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getProduct: async(req, res)=>{
      try {
          const product = await Product.findById(req.params.id)
          return res.status(200).json(product)
      } catch (error) {
          return res.status(500).json(error)
      }
    },
    getProducts: async(req, res)=>{
        const qNew = req.query.new
        const qCategory = req.query.category
        try {
            let products 
            if(qNew){
                products = await Product.find().sort({createdAt: -1}).limit(5)
            }else if(qCategory){
                products = await Product.find({
                    categories: {
                        $in: [qCategory]
                    },
                })
            }else{
                products = await Product.find({})
            }
            return res.status(200).json(products)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    deleteProduct: async(req, res)=>{
        try {
            const product = await Product.findByIdAndDelete(req.params.id)
            return res.status(200).json(`${product.title} deleted`)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

