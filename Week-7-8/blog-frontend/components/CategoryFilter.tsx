"use client";

import { Category } from "@/app/(admin)/categories/page";
import { useRouter } from "next/navigation";

export default function CategoryFilter({
  categories,
  selectedCategory,
  status,
}: {
  categories: Category[];
  selectedCategory: Category | undefined;
  status?: string;
}) {
  const router = useRouter();

  return (
    <div className="max-sm:w-full">
      <select
        value={selectedCategory?.name ?? ""}
        id="category"
        name="category"
        className="input max-sm:w-full"
        onChange={(e) =>
          router.push(
            `/blogs?category=${encodeURIComponent(
              e.target.value
            )}&status=${status}`
          )
        }
      >
        <option value="">Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
