import Header from "./components/Header";
import "./App.css";
import Balance from "./components/Balance";
import IncomeExpenses from "./components/IncomeExpenses";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import GlobalProvider from "./context/GlobalState";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function App() {
  return (
    <GlobalProvider>
      <ToastContainer />
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}
