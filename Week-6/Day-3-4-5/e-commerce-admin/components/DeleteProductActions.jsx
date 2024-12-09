"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

export default function DeleteProductActions({ product }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3000/api/products/${product._id}`);
      toast.success("Product Deleted");
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
      <button onClick={deleteProduct} className="btn-primary">
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
