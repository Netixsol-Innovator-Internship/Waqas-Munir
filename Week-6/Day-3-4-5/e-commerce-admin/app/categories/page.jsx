import CategoryForm from "@/components/CategoryForm";
import CategoryTable from "@/components/CategoryTable";
import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";

export default async function Categories() {
  const response = await axios.get("http://localhost:3000/api/categories");

  const categories = response.data.data;
  return (
    <Layout>
      <Link
        href="/categories/new"
        className="bg-blue-900 text-white py-2 px-4 rounded-md"
      >
        Add New Category
      </Link>
      <h1 className="mt-4">Categories</h1>
      <CategoryTable categories={categories} />
    </Layout>
  );
}
