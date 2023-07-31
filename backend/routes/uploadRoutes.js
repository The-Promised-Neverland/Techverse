import express from "express";
import cloudinary from "cloudinary";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

cloudinary.v2.config({
  cloud_name: "decz8mn8c",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Endpoint to upload an image to "userImages" folder
router.post("/uploadUserImage", async (req, res) => {
  const userID = req.body.userID;
  const image = req.body.image;
  try {
    // Assuming you are sending the image file in the request body with the key "image"
    const response = await cloudinary.v2.uploader.upload(image, {
      folder: "UserImages",
      public_id: userID,
      overwrite: true,
    });
    const user = await User.findById(userID);
    if (user) {
      user.profileImg = response.secure_url;
      await user.save();
      res.json({profileImg: response.secure_url});
    } else {
      console.log("Error in user");
      res.sendStatus(400);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Endpoint to upload an image to "Techverse" folder
router.post("/uploadTechverseImage", async (req, res) => {
  try {
    // Assuming you are sending the image file in the request body with the key "image"
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "Techverse",
    });

    // Send the URL of the uploaded image in the response
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    res.sendStatus(500).send({ error: "Failed to upload image" });
  }
});

export default router;
