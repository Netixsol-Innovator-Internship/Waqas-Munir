"use client";

import axiosInstance from "@/utils/axiosConfig";
import { showError } from "@/utils/errorHandler";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must not exceed 20 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/.*[A-Za-z].*/, "Password must contain at least one alphabet")
    .matches(/.*[0-9].*/, "Password must contain at least one number")
    .matches(
      /.*[!@#$%^&*(),.?":{}|<>].*/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

const RegisterPage = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-darkSecondary p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axiosInstance.post(
                "/auth/register",
                values
              );
              toast.success("Signup Successfull");
              router.push("/auth/login");
            } catch (error: any) {
              console.log(error);
              const myError = showError(error);
              toast.error(myError);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="inputLabel">
                  Name
                </label>
                <Field id="name" name="name" type="text" className="input" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="inputError"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="inputLabel">
                  Email
                </label>
                <Field id="email" name="email" type="email" className="input" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="inputError"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="inputLabel">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="input"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="inputError"
                />
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all disabled:bg-gray-400"
                >
                  {isSubmitting ? "Submitting..." : "Register"}
                </button>
                <p className="mt-2 text-sm text-center">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-primary italic">
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
