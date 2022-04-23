const mongoose = require('mongoose')

const opts = {
    toJSON: {
      virtuals: true,
    },
  };

const ProductSchema = mongoose.Schema({
    title: {type: String, trim: true, unique: true, required: true},
    desc: {type: String, trim: true, required: true},
    img: {type: String, required: true},
    publicId: {type: String, required: true},
    categories: {type: Array},
    size: {type: Array},
    color: {type: Array},
    price: {type: Number, required: true},
    inStock: {type: Boolean, default: true}
},{timestamps: true}, opts)

ProductSchema.set("toJSON", {
  virtuals: true,
});

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product