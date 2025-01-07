"use client";

import Spinner from "@/components/Spinner";
import { showError } from "@/utils/errorHandler";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/context/AuthContext";
import UserTable from "@/components/UserTable";

export default function UserManagementPage() {
  const router = useRouter();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
  const [unblockedUsers, setUnblockedUsers] = useState<User[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (!user || user.role !== "admin") {
      router.push("/");
    } else {
      fetchUsers(localStorage.getItem("token") as string);
    }
  }, [token]);

  if (loading)
    return (
      <div className="min-h-[85vh]">
        <Spinner />;
      </div>
    );

  async function fetchUsers(t: string) {
    try {
      const [blockedResponse, unblockedResponse] = await Promise.all([
        axios.get(
          "https://blog-backend-cyan-xi.vercel.app/user/?status=blocked",
          {
            headers: {
              Authorization: `Bearer ${t}`,
            },
          }
        ),
        axios.get(
          "https://blog-backend-cyan-xi.vercel.app/user/?status=unblocked",
          {
            headers: {
              Authorization: `Bearer ${t}`,
            },
          }
        ),
      ]);

      setBlockedUsers(blockedResponse.data);
      setUnblockedUsers(unblockedResponse.data);
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(id: string, action: "blocked" | "unblocked") {
    try {
      await axios.patch(
        `https://blog-backend-cyan-xi.vercel.app/user/${id}`,
        {
          status: action,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`User ${action}ed!!!`);
      fetchUsers(token!);
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    }
  }

  return (
    <section className="py-8 space-y-8 min-h-[85vh]">
      <div>
        <h2 className="text-2xl font-bold mb-4">Blocked Users</h2>
        <UserTable users={blockedUsers} onAction={handleAction} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Unblocked Users</h2>
        <UserTable users={unblockedUsers} onAction={handleAction} />
      </div>
    </section>
  );
}
