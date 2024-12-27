"use client";

import { Category } from "@/app/(admin)/categories/page";
import { useRouter } from "next/navigation";

export default function StatusFilter({
  selectedCategory,
  status,
}: {
  selectedCategory: Category | undefined;
  status?: string;
}) {
  const router = useRouter();

  let category: string | undefined;

  if (selectedCategory) {
    category = encodeURIComponent(selectedCategory.name);
  }

  return (
    <div className="max-sm:w-full">
      <select
        value={status ?? ""}
        id="category"
        name="category"
        className="input max-sm:w-full"
        onChange={(e) =>
          router.push(`/blogs?category=${category}&status=${e.target.value}`)
        }
      >
        <option value="">Status</option>

        <option value="unapproved">Unapproved</option>
        <option value="approved">Approved</option>
        <option value="disapproved">Disapproved</option>
      </select>
    </div>
  );
}
