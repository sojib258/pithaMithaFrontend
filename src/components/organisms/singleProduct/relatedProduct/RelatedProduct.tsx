"use client";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import useResponsive from "@/hooks/useResponsive";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Carousel from "react-multi-carousel";
import { useSelector } from "react-redux";
import styles from "./relatedProduct.module.scss";

interface RelatedProductProps {
  productId: string | number;
}

const RelatedProduct: React.FC<RelatedProductProps> = ({ productId }) => {
  const { items } = useSelector((state: RootState) => state.products);
  const { smScreen } = useResponsive();

  // Get the category of the current product based on its ID
  const currentProduct = items.find((item) => item.id === productId);
  const currentCategory = currentProduct
    ? currentProduct.attributes.category.name
    : null;

  // Filter products to find related products with the same category
  const relatedProducts = items.filter(
    (item) =>
      item.id !== productId && item.attributes.category.name === currentCategory
  );

  const responsive = {
    xl: {
      // the naming can be any, depends on you.
      breakpoint: { max: 6000, min: 3000 },
      items: 6,
    },
    lg: {
      breakpoint: { max: 2999, min: 1200 },
      items: 5,
    },
    md: {
      breakpoint: { max: 1199, min: 900 },
      items: 4,
    },
    sm: {
      breakpoint: { max: 899, min: 600 },
      items: 3,
    },
    xs: {
      breakpoint: { max: 599, min: 0 },
      items: 2,
    },
  };

  const lists = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Box
      className={`relatedProduct ${styles.relatedProduct} ${
        smScreen && "relatedProduct__smScreen"
      }`}
    >
      <Typography className={styles.relatedProduct__headText}>
        Related Products
      </Typography>
      <Carousel responsive={responsive} ssr={true}>
        {relatedProducts.map((item) => (
          <ProductCart
            key={item.id}
            id={item.id}
            ratingValue={item.attributes.ratingValue}
            price={item.attributes.price}
            title={item.attributes.name}
            category={item.attributes.category.name}
            description={item.attributes.description}
            discountPrice={item.attributes.discountPrice}
            images={item.attributes.images}
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default RelatedProduct;
