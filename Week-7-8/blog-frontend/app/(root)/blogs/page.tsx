import { Category } from "@/app/(admin)/categories/page";
import BlogItem, { Blog } from "@/components/BlogItem";
import CategoryFilter from "@/components/CategoryFilter";
import StatusFilter from "@/components/StatusFilter";
import axios from "axios";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let { category, status } = await searchParams;
  const decodedCategory = category
    ? decodeURIComponent(category as string)
    : "";

  status = status ? decodeURIComponent(status as string) : "";

  const res = await axios.get("http://localhost:8000/category");
  const categories: Category[] = res.data;

  const selectedCategory = categories.find((d) => d.name === decodedCategory);

  const response = await axios.get(
    `http://localhost:8000/blogs?category=${selectedCategory?._id}&status=${status}`
  );

  console.log(response.data);

  const blogs: Blog[] = response.data;

  return (
    <div className="min-h-[85vh] py-8 space-y-8">
      <div className="flex justify-between items-center max-sm:flex-col">
        <h2 className="text-3xl font-semibold">
          {selectedCategory ? selectedCategory.name : "All"} Blogs
        </h2>
        <div className="flex items-center gap-2 max-xs:flex-col max-xs:w-full">
          <p className="text-2xl font-semibold max-sm:hidden">Filter By</p>
          <CategoryFilter
            status={status as string}
            categories={categories}
            selectedCategory={selectedCategory}
          />
          <StatusFilter
            status={status as string}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>

      {blogs.length > 0 ? (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <BlogItem blog={blog} key={blog._id} />
          ))}
        </div>
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
}
