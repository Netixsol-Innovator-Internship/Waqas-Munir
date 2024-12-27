"use client";

import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { showError } from "@/utils/errorHandler";
import TextEditor from "./TextEditor";
import Spinner from "./Spinner";
import { useAuth } from "@/context/AuthContext";
import { Category } from "@/app/(admin)/categories/page";
import { Blog } from "./BlogItem";

const validationSchema = Yup.object({
  title: Yup.string().min(5).max(100).required("Title is required"),
  description: Yup.string()
    .min(10)
    .max(250)
    .required("Description is required"),
  category: Yup.string().required("Category is required"),
});

export default function BlogForm({
  categories,
  blog,
}: {
  categories: Category[];
  blog?: Blog;
}) {
  const [content, setContent] = useState(blog?.content || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(blog?.thumbnail || "");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(blog);

  const router = useRouter();
  const { user, token } = useAuth();

  useEffect(() => {
    const newToken = localStorage.getItem("token") as string;
    if (!newToken) router.push("/auth/signin");
    else if (user?.role === "reader") {
      router.back();
    } else {
      setPageLoading(false);
    }
  }, [user]);

  if (pageLoading)
    return (
      <div className="h-[85vh]">
        <Spinner />
      </div>
    );

  const handleContentChange = (html: string) => {
    setContent(html);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setImageLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/upload/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setThumbnailUrl(response.data.url);
    } catch (error) {
      const myError = showError(error);
      toast.error(myError);
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      if (blog) {
        await axios.patch(
          `http://localhost:8000/blogs/${blog._id}`,
          {
            ...values,
            thumbnail: thumbnailUrl,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Blog Updated!!!");
        router.push(`/user/${user?._id}`);
      } else {
        await axios.post(
          "http://localhost:8000/blogs",
          {
            ...values,
            thumbnail: thumbnailUrl,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Blog Uploaded!!!");
        router.push("/blogs");
      }
    } catch (error) {
      const myError = showError(error);
      toast.error(myError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-darkSecondary p-8 rounded-lg shadow-lg w-full ">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {blog ? "Update" : "Upload"} Blog
        </h2>

        <Formik
          enableReinitialize
          initialValues={{
            title: blog?.title ?? "",
            description: blog?.description ?? "",
            category: blog?.category._id ?? "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="inputLabel">
                  Title
                </label>
                <Field
                  disabled={blog?.title}
                  id="title"
                  name="title"
                  type="text"
                  className="input"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="inputError"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="inputLabel">
                  Description
                </label>
                <Field
                  id="description"
                  name="description"
                  type="text"
                  className="input"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="inputError"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="inputLabel">
                  Category
                </label>
                <Field
                  id="category"
                  name="category"
                  as="select"
                  className="input"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="inputError"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="thumbnail" className="inputLabel">
                  Thumbnail Image
                </label>
                {thumbnailUrl && (
                  <div className="mt-2">
                    <img
                      src={thumbnailUrl}
                      alt="Thumbnail"
                      className="w-32 h-32 object-fit"
                    />
                  </div>
                )}
                {imageLoading ? (
                  <Spinner />
                ) : (
                  <input
                    key={thumbnailUrl}
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    onChange={handleImageUpload}
                    className="input"
                  />
                )}

                <ErrorMessage
                  name="thumbnail"
                  component="div"
                  className="inputError"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="content" className="inputLabel">
                  Content
                </label>
                <TextEditor content={content} onChange={handleContentChange} />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="inputError"
                />
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all disabled:bg-gray-400"
                >
                  {isSubmitting || loading
                    ? "Uploading..."
                    : blog
                    ? "Update Blog"
                    : "Upload Blog"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
