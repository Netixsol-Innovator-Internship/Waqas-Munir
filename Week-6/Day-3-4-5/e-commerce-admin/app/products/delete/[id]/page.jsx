import DeleteProductActions from "@/components/DeleteProductActions";
import Layout from "@/components/Layout";
import axios from "axios";

export default async function DeleteProduct({ params }) {
  const { id } = await params;

  const product = await axios.get(`http://localhost:3000/api/products/${id}`);

  return (
    <Layout>
      <h2 className="text-blue-900 text-lg">
        Do you really want to delete{" "}
        <span className="font-semibold">{product.data.data.title}</span> ?
      </h2>
      <div className="mt-4">
        <DeleteProductActions product={product.data.data} />
      </div>
    </Layout>
  );
}
