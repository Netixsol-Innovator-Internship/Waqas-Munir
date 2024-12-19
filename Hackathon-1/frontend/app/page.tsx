"use client";

import { useSearchParams } from "next/navigation";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosConfig";
import { showError } from "@/utils/errorHandler";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import Loader from "@/components/Loader";
import Link from "next/link";

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      {currentPage !== 1 && (
        <button
          className="px-4 py-2 border rounded"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      <span className="mx-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage !== totalPages && (
        <button
          className="px-4 py-2 border rounded"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default function Home() {
  const [searchParams, setSearchParams] = useState<any>(null);
  const [question, setQuestions] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);

  const fetchPosts = async (tags: string[] = []) => {
    try {
      setLoading(true);
      const req = tags.join(",").trim()
        ? `/questions?page=${searchParams.page}&limit=${
            searchParams.limit
          }&tags=${tags.join(",")}`
        : `/questions?page=${searchParams.page}&limit=${searchParams.limit}`;
      const response = await axiosInstance.get(req);
      setQuestions(response.data.questions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      const err = showError(error);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only use search params on the client-side
    const params = new URLSearchParams(window.location.search);
    setSearchParams({
      page: parseInt(params.get("page") || "1", 10),
      limit: parseInt(params.get("limit") || "2", 10),
    });
  }, []); // Empty dependency array ensures this runs only once after the first render

  useEffect(() => {
    if (searchParams) {
      fetchPosts(tags);
    }
  }, [searchParams, tags]);

  const handlePageChange = (newPage: number) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("page", newPage.toString());
    window.history.pushState({}, "", newUrl.toString());
    setSearchParams((prev: any) => ({ ...prev, page: newPage }));
  };

  return (
    <>
      <Nav tags={tags} setTags={setTags} fetchPosts={fetchPosts} />
      <section className="py-8 px-16">
        <h2 className="text-3xl font-semibold ">Recent Questions</h2>

        {loading ? (
          <div className="py-32 w-full flex justify-center items-center">
            <Loader loading={loading} />
          </div>
        ) : (
          <div className="space-y-4 mt-8">
            {question.length > 0 ? (
              question.map((q) => (
                <div key={q._id} className="py-6 px-8 rounded-md bg-white">
                  <p className="text-sm italic">
                    Posted{" "}
                    {formatDistanceToNow(q.createdAt, { addSuffix: true })}
                  </p>
                  <Link
                    href={`/questions/${q._id}`}
                    className="text-xl cursor-pointer font-semibold"
                  >
                    {q.title}
                  </Link>
                  <p className="text-gray-800">{q.description}</p>
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        )}

        <Pagination
          currentPage={searchParams?.page || 1}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}
