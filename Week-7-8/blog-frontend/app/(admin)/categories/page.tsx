"use client";

import CategoryForm from "@/components/CategoryForm";
import CategoryTable from "@/components/CategoryTable";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import { showError } from "@/utils/errorHandler";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type Category = {
  name: string;
  _id: string;
};

export default function CategoriesPage() {
  const router = useRouter();
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    if (!user || user.role !== "admin") {
      router.push("/");
    } else {
      getCategories();
      setLoading(false);
    }
  }, [token]);

  if (loading)
    return (
      <div className="min-h-[85vh]">
        <Spinner />;
      </div>
    );

  async function getCategories() {
    try {
      const response = await axios.get("http://localhost:8000/category");
      setCategories(response.data);
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    }
  }

  function addCategory(category: Category) {
    setCategories((prev) => [...prev, category]);
  }

  function updateCategory(category: Category) {
    setCategory(category);
  }

  function updateCategories(category: Category) {
    setCategories((prev) =>
      prev.map((d) =>
        d._id === category._id ? { ...d, name: category.name } : d
      )
    );
  }

  async function deleteCategory(id: string) {
    try {
      const response = await axios.delete(
        `http://localhost:8000/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories((prev) => prev.filter((d) => d._id !== response.data._id));
      toast.success("Category Deleted!!!");
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    }
  }

  return (
    <section className="py-8 space-y-8 min-h-[85vh]">
      <CategoryForm
        onAdd={addCategory}
        onUpdate={updateCategories}
        category={category}
      />
      <CategoryTable
        categories={categories}
        onDelete={deleteCategory}
        onUpdate={updateCategory}
      />
    </section>
  );
}
