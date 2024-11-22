import Todo from "../models/todo.js";
import { errorHandler, responseHandler } from "../utils/handlers.js";

const createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    if (!title.trim()) {
      return errorHandler(res, 400, "Invalid Title");
    }

    const todo = await Todo.create({ title });
    return responseHandler(res, 201, "Todo Created", todo);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, "Internal Server Error", error);
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    return responseHandler(res, 200, "Data Fetched", todos);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, "Internal Server Error", error);
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    return responseHandler(res, 200, "Updated Successfully", todo);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, "Internal Server Error", error);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    return responseHandler(res, 200, "Updated Successfully");
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, "Internal Server Error", error);
  }
};

export { createTodo, getAllTodos, updateTodo, deleteTodo };
