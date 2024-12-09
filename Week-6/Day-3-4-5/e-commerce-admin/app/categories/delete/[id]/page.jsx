import DeleteCategoryActions from "@/components/DeleteCategoryActions";
import Layout from "@/components/Layout";
import axios from "axios";

export default async function DeleteCategory({ params }) {
  const { id } = await params;

  const response = await axios.get(
    `http://localhost:3000/api/categories/${id}`
  );

  const category = response.data.data;

  return (
    <Layout>
      <h2 className="text-blue-900 text-lg">
        Do you really want to delete{" "}
        <span className="font-semibold">{category.name}</span> ?
      </h2>
      <div className="mt-4">
        <DeleteCategoryActions category={category} />
      </div>
    </Layout>
  );
}
