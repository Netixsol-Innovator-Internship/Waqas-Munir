"use client";

import { useAuth } from "@/context/AuthContext";
import { showError } from "@/utils/errorHandler";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const validationSchema = Yup.object({
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

const SignInForm = () => {
  const router = useRouter();
  const { setUserAndToken } = useAuth();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white dark:bg-darkSecondary p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axios.post(
                "http://localhost:8000/user/signin",
                values
              );
              toast.success("Signin Successfull");
              localStorage.setItem("user", JSON.stringify(response.data.user));
              localStorage.setItem(
                "token",
                JSON.stringify(response.data.token)
              );
              setUserAndToken(response.data.user, response.data.token);
              router.push("/");
            } catch (error: any) {
              const err = showError(error);
              toast.error(err);
              if (error.response.status === 401) {
                localStorage.setItem(
                  "user",
                  JSON.stringify(error.response.data.user)
                );
                router.push("/auth/verify-email");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
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
                  {isSubmitting ? "Submitting..." : "Sign In"}
                </button>
                <p className="mt-2 text-sm text-center">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-primary italic">
                    Sign up
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

export default SignInForm;
