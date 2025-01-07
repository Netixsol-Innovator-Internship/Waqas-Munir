import mongoose from "mongoose";

export function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Db Connected");
    })
    .catch((err) => console.log(err));
}
