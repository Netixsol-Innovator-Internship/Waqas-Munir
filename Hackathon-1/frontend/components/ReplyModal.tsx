"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosConfig";
import { formatDistanceToNow } from "date-fns";

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  answerId: string;
  onAdd: (id: string) => void; // Callback to update reply count
}

type Reply = {
  _id: string;
  content: string;
  authorId: { name: string };
  createdAt: string;
};

const ReplyModal: React.FC<ReplyModalProps> = ({
  isOpen,
  onClose,
  answerId,
  onAdd,
}) => {
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchReplies();
    }
  }, [isOpen]);

  const fetchReplies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get(`/answers/${answerId}/replies`);
      setReplies(response.data);
    } catch (err) {
      setError("Failed to fetch replies");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReply = async () => {
    if (newReply.trim() === "") return;

    try {
      const response = await axiosInstance.post(
        `/answers/${answerId}/replies`,
        { content: newReply }
      );
      setReplies((prev) => [...prev, response.data]);
      setNewReply("");
      onAdd(answerId); // Increment reply count in the parent component
    } catch (err) {
      setError("Failed to add reply");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <DialogBackdrop className="fixed inset-0 bg-black opacity-30" />
      <DialogPanel className="fixed inset-0 flex justify-center items-center p-4">
        <div className="bg-white p-6 w-full max-w-2xl rounded-lg shadow-xl overflow-y-auto max-h-[80vh]">
          <DialogTitle className="text-2xl font-bold mb-4">Replies</DialogTitle>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              {replies.length === 0 ? (
                <p className="text-gray-500">No replies yet</p>
              ) : (
                replies.map((reply) => (
                  <div key={reply._id} className="border-b pb-4">
                    <div className="text-sm text-gray-500">
                      <strong>{reply.authorId?.name}</strong>{" "}
                      <span>
                        • {formatDistanceToNow(new Date(reply.createdAt))} ago
                      </span>
                    </div>
                    <p className="mt-2 text-gray-800">{reply.content}</p>
                  </div>
                ))
              )}
            </div>
          )}

          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a new reply..."
            />
            <button
              onClick={handleAddReply}
              className="ml-2 py-2 px-4 text-white bg-primary rounded-md hover:bg-blue-700"
            >
              Post
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default ReplyModal;
