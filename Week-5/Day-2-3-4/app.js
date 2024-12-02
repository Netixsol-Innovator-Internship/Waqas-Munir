import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { connectDb } from "./utils/connectDb.js";
import { groceryRoutes } from "./routes/grocery.js";
import { userRoutes } from "./routes/user.js";

config();

const app = express();

app.use(cors());
app.use(express.json({ limit: 100 }));
app.use(express.urlencoded({ extended: false }));

app.use("/grocery", groceryRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, connectDb());
