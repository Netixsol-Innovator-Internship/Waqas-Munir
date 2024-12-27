"use client";

import Spinner from "@/components/Spinner";
import BlogTable from "@/components/BlogTable";
import { showError } from "@/utils/errorHandler";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Blog } from "@/components/BlogItem";
import { useAuth } from "@/context/AuthContext";

export default function AdminBlogsPage() {
  const router = useRouter();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [unapprovedBlogs, setUnapprovedBlogs] = useState<Blog[]>([]);
  const [approvedBlogs, setApprovedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (!user || user.role !== "admin") {
      router.push("/");
    } else {
      fetchBlogs();
    }
  }, [token]);

  if (loading)
    return (
      <div className="min-h-[85vh]">
        <Spinner />;
      </div>
    );

  async function fetchBlogs() {
    try {
      const [unapprovedResponse, approvedResponse] = await Promise.all([
        axios.get("http://localhost:8000/blogs/all?status=unapproved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:8000/blogs/all?status=approved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setUnapprovedBlogs(unapprovedResponse.data);
      setApprovedBlogs(approvedResponse.data);
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-8 space-y-8 min-h-[85vh]">
      <div>
        <h2 className="text-2xl font-bold mb-4">Unapproved Blogs</h2>
        <BlogTable
          blogs={unapprovedBlogs}
          onAction={(id) => router.push(`/blogs/${id}`)}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Approved Blogs</h2>
        <BlogTable
          blogs={approvedBlogs}
          onAction={(id) => router.push(`/blogs/${id}`)}
        />
      </div>
    </section>
  );
}
