import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const users = [];

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  const user = req.body;

  users.push({
    ...user,
    id: uuidv4(),
  });
  res.json({ message: "User Created" });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  res.send(user);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const newUsers = users.filter((user) => user.id !== id);

  res.send(newUsers);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;

  const { firstName, lastName, age } = req.body;

  const user = users.find((user) => user.id === id);

  if (firstName) {
    user.firstName = firstName;
  }

  if (lastName) {
    user.lastName = lastName;
  }

  if (age) {
    user.age = age;
  }

  res.send(user);
});

export default router;
