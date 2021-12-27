import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';


//Auth user and get token
//Acess: Public
//Route: POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  
    const { email, password } = req.body  
  
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })


// getting user profile 
// Acess: Private
// Route: POST /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmain: user.isAdmin 
    })
  } else {
     res.status(404)
     throw new Error('user not found')
  }
})

export {authUser, getUserProfile}

