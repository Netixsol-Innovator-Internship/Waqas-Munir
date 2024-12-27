import AdminBlogActions from "@/components/AdminBlogActions";
import { Blog } from "@/components/BlogItem";
import { formatDate } from "@/utils/formatDate";
import axios from "axios";

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await axios.get(`http://localhost:8000/blogs/${id}`);
  const blog: Blog = response.data;

  return (
    <section className="min-h-[84vh] flex justify-center ">
      <div className="max-w-3xl w-full py-12 px-3 xs:px-6 md:px-12">
        <AdminBlogActions blog={blog} />
        <div>
          <div className="relative group mb-2 max-xs:text-center">
            <p className="rounded-full capitalize dark:bg-darkSecondary dark:text-gray-400 text-gray-800 text-sm inline px-4 py-1 cursor-default">
              {blog.status}
              <span className="absolute normal-case inline none group-hover:block opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded py-1 px-2 transition-all duration-300 bottom-8 transform left-0">
                {blog.status === "unapproved"
                  ? "This blog hasn't approved yet"
                  : `This blog has been ${blog.status} by MetaBlog`}
              </span>
            </p>
          </div>
          <p className="dark:text-gray-400 text-gray-600 text-sm md:text-base mb-4 max-xs:text-center">
            Posted by{" "}
            <span className="font-semibold italic dark:text-gray-200 text-gray-800">
              {blog.author.name}
            </span>{" "}
            on{" "}
            <span className="font-semibold italic dark:text-gray-200 text-gray-800">
              {formatDate(new Date(blog.createdAt))}
            </span>
          </p>
        </div>

        <h1 className="font-bold text-4xl md:text-5xl my-4 max-xs:text-xl max-xs:text-center">
          {blog.title}
        </h1>

        <p className="dark:text-gray-300 text-gray-700 text-sm md:text-base mb-4 max-xs:text-center">
          {blog.description}
        </p>

        <div className="overflow-hidden rounded-lg shadow-lg mb-6">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-[350px] object-cover object-top transition-transform duration-300 transform hover:scale-105"
          />
        </div>

        <div
          className="prose prose-invert dark:text-gray-300 text-gray-700 mb-8 "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </section>
  );
}
