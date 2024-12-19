"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function NavActions() {
  const { token, user } = useAuth();

  console.log(token);

  return token ? (
    <div className="bg-primary w-10 h-10 flex justify-center items-center rounded-full text-white hover:bg-blue-600 transition-all">
      {user?.name.charAt(0)}
    </div>
  ) : (
    <Link
      href="/auth/signin"
      className="bg-primary py-2 px-4 rounded-md text-white hover:bg-blue-600 transition-all"
    >
      Sign in
    </Link>
  );
}
