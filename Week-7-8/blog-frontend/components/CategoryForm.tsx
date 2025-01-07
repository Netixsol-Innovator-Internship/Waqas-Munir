"use client";

import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { showError } from "@/utils/errorHandler";
import { Category } from "@/app/(admin)/categories/page";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .min(3, "Category name must be at least 3 characters long"),
});

type CategoryFormProps = {
  onAdd: (category: Category) => void;
  category: Category | null;
  onUpdate: (category: Category) => void;
};

export default function CategoryForm({
  onAdd,
  category,
  onUpdate,
}: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (values: { name: string }) => {
    setLoading(true);
    try {
      if (category) {
        const response = await axios.patch(
          `https://blog-backend-cyan-xi.vercel.app/category/${category._id}`,
          { name: values.name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onUpdate(response.data);
        toast.success("Category Updated Successfully");
      } else {
        const response = await axios.post(
          "https://blog-backend-cyan-xi.vercel.app/category",
          { name: values.name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onAdd(response.data);
        toast.success("Category added successfully!");
      }
      values.name = "";
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">
          {category ? "Edit" : "Add"} Category
        </h2>
        <Formik
          enableReinitialize
          initialValues={{
            name: category?.name ?? "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <ErrorMessage
                name="name"
                component="div"
                className="inputError sm:hidden block "
              />
              <div className="flex w-full flex-col sm:flex-row items-center">
                <div className="flex-1 sm:mb-0 max-sm:w-full">
                  <Field
                    id="name"
                    name="name"
                    placeholder="Enter Category Name"
                    type="text"
                    className="input w-full max-sm:w-full"
                  />
                </div>

                <div className="sm:ml-4 max-sm:w-full max-sm:mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="w-full sm:w-auto bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all disabled:bg-gray-400"
                  >
                    {isSubmitting || loading
                      ? "Submitting..."
                      : category
                      ? "Edit Category"
                      : "Add Category"}
                  </button>
                </div>
              </div>
              <ErrorMessage
                name="name"
                component="div"
                className="inputError hidden sm:block"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
