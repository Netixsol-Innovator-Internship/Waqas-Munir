"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import Image from "next/image";

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    if (price <= 0) {
      toast.error("Please enter valid price");
      return;
    }
    try {
      setFormLoading(true);
      const data = { title, description, price: +price, images };
      await axios.post("/api/products", data);
      toast.success("Product Created");
      router.push("/products");
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred");
    } finally {
      setFormLoading(false);
    }
  };

  async function uploadImage(e) {
    try {
      setIsLoading(true);
      const files = e.target?.files;
      if (files?.length > 0) {
        const data = new FormData();
        for (const file of files) {
          data.append("file", file);
        }
        const response = await axios.post("/api/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setImages((prev) => [...prev, response.data.data]);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>New Product</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product Name"
        />
        <textarea
          name=""
          id=""
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="mb-2 flex flex-wrap gap-3">
          {!!images.length &&
            images.map((image) => (
              <div key={image}>
                <Image
                  src={image}
                  alt="Image"
                  width={96}
                  height={96}
                  className="rounded-md w-24 h-24"
                />
              </div>
            ))}
          <label className="w-24 h-24  flex justify-center items-center flex-col rounded-md bg-gray-200 cursor-pointer">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p className="text-sm">Upload</p>
                <input
                  type="file"
                  onChange={uploadImage}
                  className="hidden"
                  id=""
                />
              </>
            )}
          </label>
        </div>
        <button type="submit" className="btn-primary">
          {formLoading ? <Spinner /> : "Save"}
        </button>
      </form>
    </>
  );
}
