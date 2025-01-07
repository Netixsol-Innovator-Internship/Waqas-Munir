import BlogForm from "@/components/BlogForm";
import { Blog } from "@/components/BlogItem";
import axios from "axios";

export default async function AddBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { blogId } = await searchParams;
  let blog: undefined;
  if (blogId) {
    const res = await axios.get(
      `https://blog-backend-cyan-xi.vercel.app/blogs/${blogId}`
    );
    blog = res.data;
  }

  const response = await axios.get(
    "https://blog-backend-cyan-xi.vercel.app/category"
  );
  const categories = response.data;
  return (
    <div>
      <BlogForm categories={categories} blog={blog} />
    </div>
  );
}
