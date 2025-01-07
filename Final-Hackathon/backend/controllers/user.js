import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(409)
        .json({ message: "User already exists", ok: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "User Created", ok: true, data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Invalid Credentials", ok: false });

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass)
      return res
        .status(404)
        .json({ message: "Invalid Credentials", ok: false });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login", ok: true, data: { user, token } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).select("--password");

    if (!user)
      return res.status(404).json({ message: "User not found", ok: false });

    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};

export { register, login, getProfile };
