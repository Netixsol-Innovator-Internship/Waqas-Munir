import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

export default function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const res = await axios.get("http://localhost:5000/transactions");
      dispatch({
        type: "GET",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`http://localhost:5000/transactions/${id}`);
      dispatch({
        type: "DELETE",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function addTransaction(data) {
    try {
      const res = await axios.post(`http://localhost:5000/transactions`, data);
      dispatch({
        type: "ADD",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
