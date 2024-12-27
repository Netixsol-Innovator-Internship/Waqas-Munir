"use client";
import { useAuth } from "@/context/AuthContext";
import { MdDelete, MdEdit } from "react-icons/md";
import { Blog } from "./BlogItem";
import { usePathname } from "next/navigation";
import { showError } from "@/utils/errorHandler";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

type BlogActionsProps = {
  blog: Blog;
  onFetch?: () => void;
};

export default function BlogActions({ blog, onFetch }: BlogActionsProps) {
  const { user, token } = useAuth();
  const pathname = usePathname();

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Deleted!!!");
      onFetch!();
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    }
  };

  return (
    pathname.includes("/user") &&
    user?._id === blog.author._id && (
      <div className="flex gap-3 max-xxs:flex-col">
        <Link
          href={`/blogs/new?blogId=${blog._id}`}
          className="px-1 py-1 rounded-md border-2 dark:border-gray-400 border-gray-800"
        >
          <MdEdit size={16} className="dark:text-gray-400 text-gray-800" />
        </Link>
        <button
          onClick={() => handleDelete(blog._id)}
          className="px-1 py-1 rounded-md border-2 dark:border-gray-400 border-gray-800 active:scale-[98%] transition-all"
        >
          <MdDelete size={20} className="dark:text-gray-400 text-gray-800" />
        </button>
      </div>
    )
  );
}
