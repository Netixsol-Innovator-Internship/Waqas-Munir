import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import http from "http";
import mongoose from "mongoose";
import router from "./router/index";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server is running");
});

const MONGO_URI =
  "mongodb+srv://devwaqas232:devwaqas232@cluster0.d0ueg.mongodb.net/node";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
