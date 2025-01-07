import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import UserProfile from "./pages/UserProfile";

export default function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/new"
          element={<ProtectedRoute element={<CreatePost />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<UserProfile />} />}
        />
      </Routes>
    </AuthProvider>
  );
}
