// const mongoose = require('mongoose')

// const CartSchema = mongoose.Schema({
//     userId: { type: String, required: true },
//     products: [
//         {
//             productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
//             title: { type: String, trim: true, unique: true, required: true },
//             desc: { type: String, trim: true, required: true },
//             img: { type: String, required: true },
//             categories: { type: Array },
//             size: { type: Array },
//             color: { type: Array },
//             price: { type: Number, required: true },
//             quantity: {type: Number, required: true}
//         }
//     ]
// }, { timestamps: true })

// const Cart = mongoose.model('Cart', CartSchema)

// module.exports = Cart