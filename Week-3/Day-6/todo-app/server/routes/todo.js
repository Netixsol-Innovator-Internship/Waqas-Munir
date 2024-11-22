import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.post("/", createTodo);

router.get("/", getAllTodos);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
