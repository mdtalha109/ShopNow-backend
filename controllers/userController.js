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

// getting user profile 
// Acess: Private
// Route: PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmain: updatedUser.isAdmin 
    })
  } else {
     res.status(404)
     throw new Error('user not found')
  }
})


//Register a new user
//route: POST /api/user
//access: public 
const registerUser = asyncHandler(async (req, res) => {
  
  const { name,  email, password } = req.body  

  const userExist = await User.findOne({ email })

  if(userExist) {
    res.status(400)
    throw new Error('User Already Exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})


// Get all user for admin 
//Route: GET /api/users
//access: Private/admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users  = await User.find({})
  res.json(users)
})


// Delete User 
//Route: GET /api/users/:id
//access: Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user  = await User.findById(req.params.id)
  if(user){
    await user.remove()
    res.json({message: 'User Deleted'})
  }else{
    res.status(404);
    throw new Error('User not found')
  }
 
})








export {authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers, deleteUser}

