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
    const res = await axios.get(`http://localhost:8000/blogs/${blogId}`);
    blog = res.data;
  }

  const response = await axios.get("http://localhost:8000/category");
  const categories = response.data;
  return (
    <div>
      <BlogForm categories={categories} blog={blog} />
    </div>
  );
}
