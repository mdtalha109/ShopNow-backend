import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'

const protect = asyncHandler(async(req, res, next) => {
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try 
      {
        let token = req.headers.authorization.split('Bearer ')[1]
        console.log(req.user)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        console.log(req.user)
        next()

      } catch (error){

        console.error(error);

        res.status(401)

        throw new Error ('Not Authorized, token failed')
      }
    }
  
})

const isAdmin = (req, res, next) => {
  
  if(req.user && req.user.isAdmin){
    next();
  }
  else{
    res.status(401)
    throw new Error('Oops, you are not admin')
  }
}

export {protect, isAdmin}