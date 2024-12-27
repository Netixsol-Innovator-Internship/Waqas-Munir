import { Category } from "@/app/(admin)/categories/page";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import { FaComment } from "react-icons/fa";
import BlogActions from "./BlogActions";

export type Blog = {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  category: Category;
  author: {
    _id: string;
    name: string;
  };
  createdAt: string;
  status: string;
};

export default function BlogItem({
  blog,
  onFetch,
}: {
  blog: Blog;
  onFetch?: () => void;
}) {
  return (
    <div className="border-2 border-gray-500 dark:border-slate-100 rounded-md py-4 px-6 max-sm:px-2 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02]">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-3 w-full max-sm:flex-col-reverse max-sm:items-start ">
            <p className="dark:text-gray-400 text-gray-800 text-sm">
              Written by <span className="italic">{blog.author.name}</span>
            </p>
            <div className=" flex-1 max-sm:w-full relative group">
              <p className="rounded-full capitalize dark:bg-darkSecondary dark:text-gray-400 text-gray-800 text-sm inline px-4 py-1 cursor-default">
                {blog.status}
                <span className="absolute normal-case inline invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded py-1 px-2 transition-all duration-300 bottom-8 transform left-0">
                  {blog.status === "unapproved"
                    ? "This blog hasn't approved yet"
                    : `This blog has been ${blog.status} by MetaBlog`}
                </span>
              </p>
            </div>
          </div>
          <BlogActions blog={blog} onFetch={onFetch} />
        </div>
        <Link href={`/blogs/${blog._id}`}>
          <div className="flex justify-between items-start sm:items-center gap-4 mt-4">
            <div className="flex-1">
              <h2 className="text-xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 transition-colors duration-300 line-clamp-3 max-xs:line-clamp-2">
                {blog.title}
              </h2>
              <p className=" dark:text-gray-300 text-gray-700 text-sm sm:text-base mt-2 line-clamp-2">
                {blog.description}
              </p>
            </div>

            <div className="mt-4 sm:mt-0 max-xs:hidden">
              <img
                src={blog.thumbnail}
                alt="Thumbnail"
                className="w-[150px] sm:w-[175px] h-[100px] sm:h-[125px] object-cover rounded-md shadow-md transition-all duration-300 ease-in-out hover:scale-105"
              />
            </div>
          </div>
        </Link>

        <div className="flex gap-4 w-full items-center text-gray-700 dark:text-gray-300 mt-2 text-sm">
          <p>{formatDate(new Date(blog.createdAt))}</p>
        </div>
      </div>
    </div>
  );
}
