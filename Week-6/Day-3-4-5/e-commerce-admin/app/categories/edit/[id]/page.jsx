import EditCategoryForm from "@/components/EditCategoryForm";
import Layout from "@/components/Layout";
import axios from "axios";

export default async function EditCategory({ params }) {
  const { id } = await params;

  const response = await axios.get("http://localhost:3000/api/categories");
  const categories = response.data.data;

  const res = await axios.get(`http://localhost:3000/api/categories/${id}`);
  const category = res.data.data;

  return (
    <Layout>
      <EditCategoryForm categories={categories} category={category} />
    </Layout>
  );
}
