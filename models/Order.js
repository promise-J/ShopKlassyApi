const mongoose = require('mongoose')

const opts = {
  toJSON: {
    virtuals: true,
  },
};

const OrderSchema = mongoose.Schema({
  userId: { type: String, required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: { type: String, trim: true },
    desc: { type: String, trim: true },
    img: { type: String },
    size: { type: String },
    color: { type: String },
    price: { type: Number },
    quantity: { type: Number }
  }],
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: 'pending' }
}, { timestamps: true }, opts)

OrderSchema.set("toJSON", {
  virtuals: true,
});

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order