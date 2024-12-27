import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel for managing blogs, categories and users",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="px-16 max-sm:px-4 max-xs:px-2 py-4 bg-gray-200 dark:bg-darkBg dark:text-white">
        {children}
      </main>
    </>
  );
}
