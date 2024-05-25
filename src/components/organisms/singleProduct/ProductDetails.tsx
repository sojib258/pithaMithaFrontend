import Product from "@/components/organisms/quickView/ProductDetails";
import { ProductData } from "@/utils/typesDefine/productSliceTypes";

interface ProductDetailsProps {
  productDetails: ProductData;
}
const ProductDetails: React.FC<ProductDetailsProps> = ({ productDetails }) => {
  const {
    price,
    name,
    description,
    category,
    discountPrice,
    images,
    isServiceAvailable,
  } = productDetails.attributes;
  console.log("PrDetails", productDetails);

  return (
    <>
      <Product
        id={productDetails.id}
        price={price}
        productTitle={name}
        description={description}
        category={category.name}
        discountPrice={discountPrice}
        images={images}
        customStyle={{ width: "100%", padding: "0px" }}
        isServiceAvailable={isServiceAvailable}
      />
    </>
  );
};

export default ProductDetails;
