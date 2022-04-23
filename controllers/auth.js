const bcrypt = require('bcrypt')
const moogoose = require('mongoose')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).json('Fields must not be empty')
    const existEmail = await User.findOne({ email })
    const existUsername = await User.findOne({ username })
    if (existEmail || existUsername) return res.status(400).json('Username or Email Already Exists')
    const hashPass = await bcrypt.hash(password, await bcrypt.genSalt(10))
    const newUser = new User({
      username,
      email,
      password: hashPass,
      isAdmin: req.body.isAdmin && req.body.isAdmin,
      status: req.body.status && req.body.status,
      img: req.body.img && req.body.img,
      publicId: req.body.publicId && req.body.publicId
    })
    await newUser.save()
    return res.status(200).json(newUser)
  },
  login: async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json('Fields must not be empty')

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json('User does not exists')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json('Wrong Credential')
    // const {password: userPass, ...other} = user._doc
    // const accessToken = jwt.sign({id: other._id, isAdmin: other.isAdmin}, process.env.JWT_SECRET, {expiresIn: '3d'})
    req.session.userId = user._id
    req.session.accessTime = new Date()
    // console.log(user._id, " from authCtrl")
    await req.session.save()

    return res.status(200).json(user)
  },
  getUserInfo: async (req, res) => {
    const currentUser = req.user;
    // console.log(currentUser.toJSON())
    try {
      if (currentUser) {
        res.json({ user: currentUser.toJSON() });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      if (!req.session.userId) return res.json({ msg: "Already logged out" })
      await req.session.destroy();
      return res.json({ msg: "Logged out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
}