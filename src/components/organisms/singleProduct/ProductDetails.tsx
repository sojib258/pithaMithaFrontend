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
    serviceAvailable,
    shortDescription,
    weight,
    users_permissions_user,
    averageRating,
    tags,
  } = productDetails.attributes;

  return (
    <>
      <Product
        id={productDetails.id}
        price={price}
        productTitle={name}
        shortDescription={shortDescription}
        category={category.data.attributes.name}
        discountPrice={discountPrice}
        images={images.data}
        customStyle={{ width: "100%", padding: "0px" }}
        isServiceAvailable={serviceAvailable}
        weight={weight}
        seller={users_permissions_user.data}
        ratingValue={averageRating}
        tags={tags.data}
      />
    </>
  );
};

export default ProductDetails;
