import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosConfig";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreatePost = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/posts", values);
        toast.success(response.data.message);
        navigate("/");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col  items-center text-white">
      <Navbar />
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg mt-16">
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
          Create a Post
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Post Content
            </label>
            <textarea
              id="content"
              name="content"
              rows="4"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
              placeholder="Write something..."
            />
            {formik.touched.content && formik.errors.content ? (
              <div className="text-sm text-red-500">
                {formik.errors.content}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105 flex justify-center items-center"
          >
            {formik.isSubmitting ? <Spinner /> : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
