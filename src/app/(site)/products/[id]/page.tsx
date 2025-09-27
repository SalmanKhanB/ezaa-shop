import Container from "@/components/container";
import PopularProducts from "@/components/popular-products";
import ProductDetails from "@/components/product-details";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = (await params) || {};
  const productId = parseInt(id);
  
  if (isNaN(productId)) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Invalid Product ID</h2>
        <p className="text-gray-600">The product ID in the URL is not valid.</p>
      </div>
    );
  }
  
  return (
    <>
      <ProductDetails id={productId} />
      <Container><PopularProducts total={6} /></Container>
    </>
  );
};
export default ProductPage;
