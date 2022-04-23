const mongoose = require('mongoose')

const opts = {
    toJSON: {
      virtuals: true,
    },
  };

const UserSchema = mongoose.Schema({
    username: {type: String, trim: true, unique: true, required: true, lowercase: true},
    email: {type: String, trim: true, unique: true, required: true, lowercase: true},
    password: {type: String, trim: true, required: true},
    publicId: {type: String},
    isAdmin: {type: Boolean, default: false},
    status: {type: String, enum: ['pending', 'active'], default: 'pending'},
    favorite: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    cart: [
       {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
            title: { type: String, trim: true },
            desc: { type: String, trim: true },
            img: { type: String },
            size: { type: String },
            color: { type: String },
            price: { type: Number },
            quantity: {type: Number}
        }
    ],
    img: {type: String, default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"}
},{timestamps: true}, opts)

UserSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model('User', UserSchema)

module.exports = User