import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosConfig";
import PostList from "../components/PostList";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/posts");
      setPosts(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-900 w-full min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="w-full mt-4 md:max-w-3xl px-4">
        {isLoading ? (
          <Spinner />
        ) : posts?.length === 0 ? (
          <p className="text-gray-400">No posts available.</p>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </div>
  );
}
