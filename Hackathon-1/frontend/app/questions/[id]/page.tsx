"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosConfig";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import { formatDate } from "@/utils/formatDate";
import { useAuth } from "@/context/AuthContext";
import { showError } from "@/utils/errorHandler";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import ReplyModal from "@/components/ReplyModal";

type User = {
  _id: string;
  name: string;
};

type Answer = {
  _id: string;
  authorId: User;
  content: string;
  createdAt: string;
  replyCount: number;
};

type Question = {
  _id: string;
  title: string;
  description: string;
  authorId: User;
  createdAt: string;
  tags: string[];
};

interface QuestionResponse {
  question: Question;
  answers: Answer[];
}

export default function SingleQuestionPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [activeAnswerId, setActiveAnswerId] = useState<string | null>(null);

  const { token } = useAuth();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    const fetchQuestionData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<QuestionResponse>(
          `/questions/${id}`
        );
        setQuestion(response.data.question);
        setAnswers(response.data.answers);
      } catch (err) {
        setError("Failed to load question data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionData();
  }, [id]);

  const handleAnswerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/questions/${id}/answers`, {
        content,
      });
      toast.success("Answer posted!");
      setAnswers((prev) => [response.data, ...prev]);
      setContent("");
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    }
  };

  const addCount = (id: string) => {
    setAnswers((prev) => {
      return prev.map((answer) =>
        answer._id === id
          ? { ...answer, replyCount: Number(answer.replyCount) + 1 }
          : answer
      );
    });
  };

  const handleOpenModal = (id: string) => {
    setActiveAnswerId(id);
  };

  const handleCloseModal = () => {
    setActiveAnswerId(null);
  };

  if (loading)
    return (
      <div className="text-center p-4">
        <Loader loading={loading} />
      </div>
    );
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <>
      <Nav />
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-gray-800">
            {question?.title}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Asked by{" "}
            <span className="font-semibold">{question!.authorId.name}</span>
            &nbsp;on {formatDate(new Date(question!.createdAt))}
          </p>
          <div className="mt-4">
            <p className="text-lg text-gray-700">{question!.description}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Answers</h2>
          {answers.length > 0 ? (
            answers?.map((answer) => (
              <div key={answer._id} className="mt-6">
                {token && activeAnswerId === answer._id && (
                  <ReplyModal
                    isOpen={true}
                    onClose={handleCloseModal}
                    answerId={answer._id}
                    onAdd={addCount}
                  />
                )}
                <div className="border-t pt-4">
                  <p className="text-[12px]">
                    Posted {formatDistanceToNow(new Date(answer.createdAt))} ago
                  </p>
                  <p>
                    <strong>{answer.authorId.name}</strong>: {answer.content}
                  </p>
                  {answer.replyCount === 0 ? (
                    <p
                      className="text-gray-500 cursor-pointer"
                      onClick={() => handleOpenModal(answer._id)}
                    >
                      No Replies
                    </p>
                  ) : answer.replyCount === 1 ? (
                    <p
                      className="text-blue-600 cursor-pointer"
                      onClick={() => handleOpenModal(answer._id)}
                    >
                      1 Reply
                    </p>
                  ) : (
                    <p
                      className="text-blue-600 cursor-pointer"
                      onClick={() => handleOpenModal(answer._id)}
                    >
                      {answer.replyCount} Replies
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4 text-gray-500">
              No answers yet.{" "}
              {token ? "Be the first to answer!" : "Please login to answer!"}
            </p>
          )}
        </div>

        {token && (
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-semibold text-gray-800">
              Post an Answer
            </h3>
            <form onSubmit={handleAnswerSubmit} className="mt-4">
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your answer here..."
              ></textarea>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Post Answer
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
