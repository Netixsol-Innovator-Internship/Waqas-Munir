"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

export default function CategoryForm({ categories }) {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addCategory = async (e) => {
    e.preventDefault();
    const data = {
      name,
      parentCategory: parentCategory ? parentCategory : undefined,
    };
    try {
      setIsLoading(true);
      await axios.post("/api/categories", data);
      toast.success("Category Added");
      router.push("/categories");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>New Category</h1>
      <form onSubmit={addCategory} className="space-y-4">
        <input
          type="text"
          className="mb-0"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Category"
        />
        <select
          className="py-2"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="">No parent Category</option>
          {categories?.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button className="btn-primary">
          {isLoading ? <Spinner /> : "Save"}
        </button>
      </form>
    </>
  );
}
