import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { AiOutlineLike } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "react-toastify";

const Post = ({ post }) => {
  const { isAuthenticated, user } = useAuth();
  const { content, author, createdAt, likes } = post;
  const [isLiked, setIsLiked] = useState(
    likes.includes(user?._id) ? true : false
  );
  const [likeCount, setLikeCount] = useState(likes?.length || 0);
  const location = useLocation();

  const avatarLetter = author?.name?.charAt(0).toUpperCase();
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const handleLike = async () => {
    try {
      const response = await axiosInstance.patch(`/posts/${post?._id}`);
      toast.success(response.data.message);
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      toast.info(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 transition-all ">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
          {avatarLetter}
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-100">{author?.name}</p>
          <p className="text-sm text-gray-400">{formattedDate}</p>
        </div>
      </div>

      <p className="text-gray-200 text-lg mb-4">{content}</p>

      {isAuthenticated && location.pathname !== "/profile" && (
        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ease-in-out ${
              isLiked ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-300"
            } hover:bg-indigo-700 focus:outline-none`}
          >
            <AiOutlineLike size={20} />
            <span>{likeCount}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Post;
