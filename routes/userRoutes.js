import express from 'express'
const router = express.Router()

import {authUser, getUserProfile, registerUser, updateUserProfile, getAllUsers, deleteUser} from '../controllers/userController.js'
import {protect, isAdmin} from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.route('/').post(registerUser).get(protect, isAdmin, getAllUsers)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').delete(protect, isAdmin, deleteUser)



export default router