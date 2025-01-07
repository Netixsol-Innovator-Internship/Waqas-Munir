"use client";

import { showError } from "@/utils/errorHandler";
import axios from "axios";
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

  role: Yup.string()
    .oneOf(["writer", "reader"], "Role must be either writer or reader")
    .required("Role is required"),
});

const SignUpForm = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-darkSecondary p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            role: "reader",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(
                "https://blog-backend-cyan-xi.vercel.app/user/signup",
                values
              );
              toast.success("Signup Successfull");
              localStorage.setItem("user", JSON.stringify(response.data));
              router.push("/auth/verify-email");
            } catch (error: any) {
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
                <label className="inputLabel">Role</label>
                <div className="mt-2">
                  <label className="inline-flex items-center mr-6">
                    <Field
                      type="radio"
                      name="role"
                      value="writer"
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">Writer</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="role"
                      value="reader"
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">Reader</span>
                  </label>
                </div>
                <ErrorMessage
                  name="role"
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
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>
                <p className="mt-2 text-sm text-center">
                  Already have an account?{" "}
                  <Link href="/auth/signin" className="text-primary italic">
                    Sign in
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

export default SignUpForm;
