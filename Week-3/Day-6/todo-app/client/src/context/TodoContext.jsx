/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const TodoContext = createContext({});

const BASE_API = "http://localhost:8000";

export default function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createTodo = async (title) => {
    if (!title || title.trim() === "") {
      toast.error("Invalid Title");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(BASE_API, { title });
      setTodos((prev) => [response.data.data, ...prev]);
      toast.success("Todo Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getAllTodos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(BASE_API);
      setTodos(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id) => {
    setIsLoading(true);
    try {
      await axios.put(`${BASE_API}/${id}`);

      const newTodos = [...todos];
      const todo = newTodos.find((todo) => todo._id === id);

      todo.isCompleted = !todo.isCompleted;
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_API}/${id}`);

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{ todos, createTodo, isLoading, updateTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}
