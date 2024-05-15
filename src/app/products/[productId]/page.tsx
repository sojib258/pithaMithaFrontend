import SingleProduct from "@/components/pages/singleProduct/SingleProduct";
const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const productId = params.productId;

  return <SingleProduct productId={parseInt(productId)} />;
};

export default ProductDetails;
