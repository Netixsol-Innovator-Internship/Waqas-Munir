import CategoryForm from "@/components/CategoryForm";
import Layout from "@/components/Layout";
import axios from "axios";

export default async function AddNewCategory() {
  const response = await axios.get("http://localhost:3000/api/categories");
  const categories = response.data.data;

  return (
    <Layout>
      <CategoryForm categories={categories} />
    </Layout>
  );
}
