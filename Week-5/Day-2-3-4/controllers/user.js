import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

import { User } from "../models/user.js";
import { errorHandler, responseHandler } from "../utils/handlers.js";
import { generateToken } from "../utils/jwt.js";

const register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return errorHandler(res, 400, result.array()[0].msg);
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return errorHandler(res, 400, "Email already exists");

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    return responseHandler(res, 201, "Registered Successfully", user);
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return errorHandler(res, 404, "Invalid Credentials");

    const matchPass = await bcryptjs.compare(password, user.password);
    if (!matchPass) return errorHandler(res, 404, "Invalid Credentials");

    const token = generateToken(user);

    return responseHandler(res, 200, "Login Successfully", { user, token });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, error.message);
  }
};

export { register, login };
