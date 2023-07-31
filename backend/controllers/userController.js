import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route  POST/api/users/login
//@access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      profileImg: user.profileImg,
      phone: user.phone,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register User
// @route   POST/api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get User profile
// @route   GET/api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      profileImg: user.profileImg,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,

    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update User profile
// @route   GET/api/users/profile
//@access   Private/Admin
const UpdateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get User
// @route   GET/api/users
//@access   Private/Admin
const getUser = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  if (users) {
    res.status(200);
    res.json(users);
  } else {
    res.status(404);
    throw new Error("Not found...");
  }
});

// @desc    Get User by ID
// @route   GET/api/users/:id
//@access   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

// @desc     Delete User profile
// @route   DELETE/api/users/:id
//@access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc     Update User
// @route   PUT/api/users/:id
//@access   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  getUserProfile,
  UpdateUserProfile,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
};
