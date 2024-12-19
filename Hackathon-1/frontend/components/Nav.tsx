"use client";

import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface NavProps {
  tags?: string[];
  setTags?: React.Dispatch<React.SetStateAction<string[]>>;
  fetchPosts?: (tags: string[]) => void;
}

export default function Nav({ tags, setTags, fetchPosts }: NavProps) {
  const [tagInput, setTagInput] = useState<string>("");
  const { token, setUserAndToken } = useAuth();

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      if (!tags?.includes(tagInput.trim())) {
        const newTags = [...tags!, tagInput.trim()];
        setTags!(newTags);
        fetchPosts!(newTags);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    const updatedTags = tags!.filter((t) => t !== tag);
    setTags!(updatedTags);
    fetchPosts!(updatedTags);
  };

  useEffect(() => {
    const newToken = localStorage.getItem("token");
    if (newToken) setUserAndToken(newToken);
  }, []);

  return (
    <header className="bg-white w-full items-center py-4 px-16 flex justify-between">
      <div>
        <Link href="/" className="font-logo text-3xl">
          QnA
        </Link>
      </div>

      <div className="bg-gray-200 flex w-1/2 py-2 justify-start rounded-md items-center px-4">
        <CiSearch size={20} />
        <input
          type="text"
          className="bg-transparent w-full px-4 focus:outline-none"
          placeholder="Search by tags..."
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInput}
        />
      </div>

      <div className="flex items-center space-x-2 ml-4">
        {tags?.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-200 rounded-full py-1 px-3"
          >
            <span className="mr-2">{tag}</span>
            <button
              className="text-xs text-red-600"
              onClick={() => removeTag(tag)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div>
        {token ? (
          <Link
            href="/questions/new"
            className="py-1 px-4 text-white text-xl rounded-md bg-primary"
          >
            +
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="bg-primary px-4 py-2 rounded-md text-white"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
