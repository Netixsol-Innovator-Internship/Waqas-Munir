import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { connectDB } from "./utils/connectDB.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/posts", postRoutes);

app.listen(5000, connectDB);
