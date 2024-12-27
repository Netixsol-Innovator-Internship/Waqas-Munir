import BlogItem, { Blog } from "@/components/BlogItem";
import axios from "axios";
import Link from "next/link";

export default async function Home() {
  const response = await axios.get("http://localhost:8000/blogs");

  const blogs: Blog[] = response.data.splice(0, 3);

  return (
    <div className="min-h-[84vh] py-8 space-y-8">
      <h2 className="text-3xl font-semibold">Recent Blogs</h2>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <BlogItem blog={blog} key={blog._id} />
        ))}
      </div>
      <div className="flex w-full justify-center items-center">
        <Link
          href="/blogs"
          className="text-center bg-primary px-4 py-2 rounded-md text-white"
        >
          View More
        </Link>
      </div>
    </div>
  );
}
