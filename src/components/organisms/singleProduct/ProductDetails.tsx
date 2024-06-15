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
    shortDescription,
    weight,
    seller,
    averageRating,
    tags,
  } = productDetails.attributes;

  console.log("Av", averageRating);

  return (
    <>
      <Product
        id={productDetails.id}
        price={price}
        productTitle={name}
        shortDescription={shortDescription}
        category={category.name}
        discountPrice={discountPrice}
        images={images}
        customStyle={{ width: "100%", padding: "0px" }}
        isServiceAvailable={isServiceAvailable}
        weight={weight}
        seller={seller}
        ratingValue={averageRating}
        tags={tags}
      />
    </>
  );
};

export default ProductDetails;
