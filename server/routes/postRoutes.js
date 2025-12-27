import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed",
    });
  }
});

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    const uploadedImage = await cloudinary.uploader.upload(photo, {
      folder: "ai-images",
    });

    const newPost = await Post.create({
      name,
      prompt,
      photo: uploadedImage.secure_url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create post",
    });
  }
});

export default router;
