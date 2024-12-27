"use client";

import BlogItem, { Blog } from "@/components/BlogItem";
import Spinner from "@/components/Spinner";
import UserInfo from "@/components/UserInfo";
import { useAuth } from "@/context/AuthContext";
import { showError } from "@/utils/errorHandler";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaPen } from "react-icons/fa";

export default function UserProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { user, token } = useAuth();

  useEffect(() => {
    const newToken = localStorage.getItem("token") as string;
    if (!newToken) router.push("/");
    else {
      fetchBlogs();
    }
  }, [token]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/blogs/user/${id}`
      );
      setBlogs(response.data);
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[85vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] py-8 space-y-8">
      <UserInfo />
      {loading ? (
        <Spinner />
      ) : user?.role !== "reader" ? (
        blogs.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold">Your Blogs</p>
              <Link
                href="/blogs/new"
                className="bg-primary px-4 py-2 rounded-md cursor-pointer"
              >
                <FaPen />
              </Link>
            </div>
            {blogs.map((blog) => (
              <BlogItem onFetch={fetchBlogs} blog={blog} key={blog._id} />
            ))}
          </div>
        ) : (
          <p>No blogs found</p>
        )
      ) : (
        <p>
          Please update your status from reader to writer for writing your blogs
        </p>
      )}
    </div>
  );
}
