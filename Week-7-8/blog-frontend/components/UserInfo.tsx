"use client";

import { useAuth } from "@/context/AuthContext";

export default function UserInfo() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="font-semibold text-3xl">
        Welcome Back, <span className="italic">{user?.name}</span>!
      </h2>
    </div>
  );
}
