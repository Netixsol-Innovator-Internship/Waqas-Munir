"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  setUserAndToken: (user: User, token: string) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const setUserAndToken = (newUser: User, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", newToken);
  };

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("user")) {
        setUser(JSON.parse(localStorage.getItem("user") as string));
      }
      if (localStorage.getItem("token"))
        setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, setUserAndToken, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
