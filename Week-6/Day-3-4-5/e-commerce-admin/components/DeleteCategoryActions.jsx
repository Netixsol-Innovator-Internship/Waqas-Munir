"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export default function DeleteCategoryActions({ category }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => {
    router.push("/categories");
  };

  const deleteCategory = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `http://localhost:3000/api/categories/${category._id}`
      );
      toast.success("Category Deleted");
      goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {" "}
      <button onClick={deleteCategory} className="btn-primary">
        {isLoading ? <Spinner /> : "Confirm"}
      </button>
      <button
        className="ml-2 bg-gray-200 px-4 rounded-lg py-1"
        onClick={goBack}
      >
        Cancel
      </button>
    </>
  );
}
