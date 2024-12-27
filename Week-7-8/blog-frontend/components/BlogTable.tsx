import { Blog } from "./BlogItem";

type BlogTableProps = {
  blogs: Blog[];
  onAction: (id: string) => void;
};

export default function BlogTable({ blogs, onAction }: BlogTableProps) {
  if (blogs.length === 0) {
    return <p className="text-center text-gray-500">No blogs available</p>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-darkSecondary p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Blogs List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left border-b border-gray-300 dark:border-gray-600">
                <th className="max-sm:hidden block px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  #
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Title
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Author
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr
                  key={blog._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <td className="max-sm:hidden block px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                    {index + 1}
                  </td>
                  <td
                    className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 cursor-pointer "
                    onClick={() => onAction(blog._id)}
                  >
                    <p className="line-clamp-2 overflow-hidden text-ellipsis break-words">
                      {blog.title}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                    {blog.author.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 capitalize">
                    {blog.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
