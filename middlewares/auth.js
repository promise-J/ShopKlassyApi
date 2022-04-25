const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env

const auth = async (req, res, next) => {
    try {
      const token = req.headers['authorization']
      if(!token) {
        return res.status(400).json("no session found");
      }
      const decode = await jwt.verify(token, JWT_SECRET)
      if(!decode){
        return res.status(400).json("session is not valid")
      }
      req.user = await User.findById(decode.id);
      next();
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  };
  

    const authUserAndAuthorize = (req, res, next)=>{
       auth(req, res, ()=>{
           if(req.user._id == req.params.id || req.user.isAdmin){
               next()
           }else{
               return res.status(400).json('You are not authorized to do this')
           }
       })
    }

    const authUserAndAdmin = (req, res, next)=>{
       auth(req, res, ()=>{
           if(req.user.isAdmin){
             next()
           }else{
               return res.status(400).json('You are not an Admin')
           }
       })
    }

    module.exports = {
        auth,
        authUserAndAdmin,
        authUserAndAuthorize
    }