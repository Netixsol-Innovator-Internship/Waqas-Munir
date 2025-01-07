import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosConfig";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/user/register", values);
        toast.success(response.data.message);
        navigate("/login");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
          Create Account
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-sm text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-red-500">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105 flex justify-center items-center"
          >
            {formik.isSubmitting ? <Spinner /> : "Register"}
          </button>

          <div className="w-full text-sm text-center mt-2">
            <Link to="/login">
              Already have an account?{" "}
              <span className="italic text-indigo-600">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
