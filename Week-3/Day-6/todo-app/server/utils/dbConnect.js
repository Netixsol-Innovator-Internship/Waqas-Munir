import mongoose from "mongoose";

export default async function dbConnect() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
}
