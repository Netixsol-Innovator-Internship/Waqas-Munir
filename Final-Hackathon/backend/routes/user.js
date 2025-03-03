import express from "express";
import { getProfile, login, register } from "../controllers/user.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authenticate, getProfile);

export default router;
