import EditProductForm from "@/components/EditProductForm";
import Layout from "@/components/Layout";
import axios from "axios";

export default async function EditProduct({ params }) {
  const { id } = await params;

  const product = await axios.get(`http://localhost:3000/api/products/${id}`);

  return (
    <Layout>
      <EditProductForm product={product.data.data} />
    </Layout>
  );
}
