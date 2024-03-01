import Product from "@/components/organisms/quickView/ProductDetails";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
interface ProductDetailsProps {
  productId: string | number;
}
const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const { items } = useSelector((item: RootState) => item.products);
  const product = items.find((item) => item.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Extract product details
  const {
    price,
    name,
    description,
    ratingValue,
    category,
    discountPrice,
    images,
  } = product.attributes;

  return (
    <>
      <Product
        price={price}
        productTitle={name}
        description={description}
        ratingValue={ratingValue}
        category={category.name}
        discountPrice={discountPrice}
        images={images}
        customStyle={{ width: "100%", padding: "0px" }}
      />
    </>
  );
};

export default ProductDetails;
