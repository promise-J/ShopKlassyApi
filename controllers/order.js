const Order = require('../models/Order')

module.exports = {
    createOrder: async(req, res)=>{
      try {
          const newOrder = new Order(req.body)
          await newOrder.save()
          return res.status(200).json(newOrder)
      } catch (error) {
          return res.status(500).json(error)
      }
    },
    updateOrder: async(req, res)=>{
        try {
            const order = await Order.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.json(order)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getOrder: async(req, res)=>{
      try {
          const order = await Order.findOne({_id: req.params.id})
          return res.status(200).json(order)
      } catch (error) {
          return res.status(500).json(error)
      }
    },
    getOrders: async(req, res)=>{
        try {
            const orders = await Order.find({})
            return res.status(200).json(orders)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    deleteOrder: async(req, res)=>{
        try {
            await Order.findByIdAndDelete(req.params.id)
            return res.status(200).json('Order deleted')
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getIncome: async(req, res)=>{
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
        try {       
                const data = await Order.aggregate([
                    {$match: {createdAt: {$gte: prevMonth}}},
                    {$project: {
                        month: {$month: "$createdAt"},
                        sales: "$amount",
                    },
                  },
                    {$group: {_id: "$month", total: {$sum: "$sales"},},}
                ])
                res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

