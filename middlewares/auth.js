const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
      if (!req.session.userId) {
        return res.status(400).json({ msg: "no session found" });
      }
      req.user = await User.findById(req.session.userId);
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