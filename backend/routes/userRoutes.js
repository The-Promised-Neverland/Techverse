import express from "express";
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    UpdateUserProfile,
    getUser,
    updateUser,
    deleteUser,
    getUserById } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";



const router = express.Router();

// protect is token verification middleware and admin middleware is to check if the user is an Admin
 
router.route('/').post(registerUser).get(protect,admin,getUser);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,UpdateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser);


export default router;