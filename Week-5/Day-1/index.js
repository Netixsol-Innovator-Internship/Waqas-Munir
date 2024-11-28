import express from "express";

import usersRoutes from "./routes/users.js";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is running on PORT 5000");
});
