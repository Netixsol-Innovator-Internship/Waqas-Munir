"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect } from "react";

export default function NavActions() {
  const { token, clearAuth, setUserAndToken } = useAuth();

  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem("user") as string);
    const newToken = localStorage.getItem("token") as string;
    if (newUser || newToken) setUserAndToken(newUser, newToken);
  }, []);

  function handleSignOut() {
    clearAuth();
  }

  return token ? (
    <button
      onClick={handleSignOut}
      className="bg-primary py-2 px-4 rounded-md text-white hover:bg-blue-600 transition-all"
    >
      Sign out
    </button>
  ) : (
    <Link
      href="/auth/signin"
      className="bg-primary py-2 px-4 rounded-md text-white hover:bg-blue-600 transition-all"
    >
      Sign in
    </Link>
  );
}
