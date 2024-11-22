import express from "express";
import cors from "cors";
import { config } from "dotenv";

import dbConnect from "./utils/dbConnect.js";
import todoRoutes from "./routes/todo.js";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(todoRoutes);

app.listen(8000, dbConnect());
