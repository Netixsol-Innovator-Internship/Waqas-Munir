"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { showError } from "@/utils/errorHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Blog } from "./BlogItem";

export default function AdminBlogActions({ blog }: { blog: Blog }) {
  const { user, token } = useAuth();
  const router = useRouter();

  async function approveBlog(id: string) {
    try {
      await axios.patch(
        `https://blog-backend-cyan-xi.vercel.app/blogs/status/${id}`,
        { status: "approved" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Blog approved!!!");
      router.push("/all-blogs");
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    }
  }

  async function disapproveBlog(id: string) {
    try {
      await axios.patch(
        `https://blog-backend-cyan-xi.vercel.app/blogs/status/${id}`,
        { status: "disapproved" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      router.push("/all-blogs");
      toast.success("Blog disapproved!!!");
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    }
  }

  return (
    user?.role === "admin" && (
      <div className="flex justify-end mb-6 xs:space-x-4 max-xs:flex-col gap-2">
        {blog.status === "unapproved" && (
          <>
            <button
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-all duration-200"
              onClick={() => approveBlog(blog._id)}
            >
              Approve
            </button>
            <button
              className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-200"
              onClick={() => disapproveBlog(blog._id)}
            >
              Disapprove
            </button>
          </>
        )}
        {blog.status === "approved" && (
          <button
            className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-200"
            onClick={() => disapproveBlog(blog._id)}
          >
            Disapprove
          </button>
        )}
      </div>
    )
  );
}
