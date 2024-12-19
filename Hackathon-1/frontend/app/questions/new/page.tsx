"use client";

import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/utils/axiosConfig";
import { showError } from "@/utils/errorHandler";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface FormValues {
  title: string;
  description: string;
  tags: string[];
}

const initialValues: FormValues = {
  title: "",
  description: "",
  tags: [],
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(10, "Title must be at least 10 characters long")
    .required("Title is required"),

  description: Yup.string()
    .min(20, "Description must be at least 20 characters long")
    .required("Description is required"),
});

const PostQuestionForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const trimmedTag = tagInput.trim();
      if (trimmedTag && !tags.includes(trimmedTag)) {
        setTags([...tags, trimmedTag]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <Loader loading={loading} />;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-darkSecondary p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Post a New Question
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            values.tags = tags;

            if (tags.length < 3) {
              toast.error("Please add at least 3 tags.");
              return;
            }

            try {
              const response = await axiosInstance.post("/questions", values);
              toast.success("Question Posted!!!");
              router.push("/");
            } catch (error: any) {
              if (error.response.status === 401) {
                toast.error("Please login again to continue");
                router.push("/auth/login");
                return;
              }
              const err = showError(error);
              toast.error(err);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="inputLabel">
                  Title
                </label>
                <Field id="title" name="title" className="input" />
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
                  as="textarea"
                  className="input"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="inputError"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tags" className="inputLabel">
                  Tags
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add a tag and press Enter"
                    className="input flex-1"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-black py-1 px-3 rounded-md flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-sm text-white bg-red-500 rounded-full w-4 h-4 flex justify-center items-center"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                {tags.length < 3 && (
                  <div className="inputError">Please add at least 3 tags.</div>
                )}
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all disabled:bg-gray-400"
                >
                  {isSubmitting ? "Submitting..." : "Post Question"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostQuestionForm;
