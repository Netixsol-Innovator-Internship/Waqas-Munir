import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { createPost, getPosts, likePost } from "../controllers/post.js";

const router = express.Router();

router.post("/", authenticate, createPost);

router.get("/", getPosts);

router.patch("/:id", authenticate, likePost);

export default router;
