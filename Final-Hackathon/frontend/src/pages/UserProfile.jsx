import { useState, useEffect } from "react";
import Post from "../components/Post";
import axiosInstance from "../utils/axiosConfig";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userResponse = await axiosInstance.get("/user/profile");
        setUser(userResponse.data.data);

        const postsResponse = await axiosInstance.get(
          `/posts?user=${userResponse.data.data?._id}`
        );
        setPosts(postsResponse.data.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center mb-4 max-sm:flex-col max-sm:text-center max-sm:gap-2">
            <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-3xl sm:mr-4">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-100">
                {user?.name}
              </p>
              <p className="text-sm text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-4">My Posts</h3>
          {posts?.length === 0 ? (
            <p className="text-gray-400">No posts available.</p>
          ) : (
            posts.map((post) => <Post key={post?._id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
