import { Router } from "express";

import { login, register } from "../controllers/user.js";
import { loginValidations, registerValidations } from "../validations/index.js";

const router = Router();

router.post("/register", registerValidations, register);

router.post("/login", loginValidations, login);

export { router as userRoutes };
