"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="font-bold text-2xl min-h-screen dark:bg-darkBg bg-gray-100 dark:text-white text-black">
      <div className="px-8 py-4">
        <p className="mb-3">Something Went Wrong</p>
        <Link
          href="/"
          className="bg-primary px-4 py-2 rounded-md text-base text-white"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
