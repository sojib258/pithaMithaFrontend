"use client";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import useResponsive from "@/hooks/useResponsive";
import { fetchProducts } from "@/store/feature/product/ProductSlice";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import styles from "./relatedProduct.module.scss";

interface RelatedProductProps {
  productId: string | number;
}

const RelatedProduct: React.FC<RelatedProductProps> = ({ productId }) => {
  const { items } = useSelector((state: RootState) => state.products);
  const { smScreen } = useResponsive();
  const dispatch = useDispatch();

  // Get the category of the current product based on its ID
  const currentProduct = items.find((item) => item.id === productId);
  const currentCategory = currentProduct
    ? currentProduct.attributes.category.data.attributes.name
    : null;

  // Filter products to find related products with the same category
  const relatedProducts = items.filter(
    (item) =>
      item.id !== productId &&
      item.attributes.category.data.attributes.name === currentCategory
  );

  useEffect(() => {
    dispatch(fetchProducts(1) as any);
  }, [dispatch]);

  const responsive = {
    xxl: {
      // the naming can be any, depends on you.
      breakpoint: { max: 6000, min: 3000 },
      items: 6,
    },
    xl: {
      // the naming can be any, depends on you.
      breakpoint: { max: 2999, min: 1200 },
      items: 5,
    },
    lg: {
      breakpoint: { max: 1199, min: 900 },
      items: 4,
    },
    md: {
      breakpoint: { max: 899, min: 600 },
      items: 3,
    },
    sm: {
      breakpoint: { max: 599, min: 400 },
      items: 2,
    },
    xs: {
      breakpoint: { max: 399, min: 0 },
      items: 1,
    },
  };
  return (
    <Box
      className={`relatedProduct ${styles.relatedProduct} ${
        smScreen && "relatedProduct__smScreen"
      }`}
    >
      <Typography className={styles.relatedProduct__headText}>
        Related Product
      </Typography>
      <Carousel responsive={responsive} ssr={true}>
        {relatedProducts.map((item) => (
          <ProductCart
            id={item.id}
            isServiceAvailable={item.attributes.isServiceAvailable}
            price={item.attributes.price}
            name={item.attributes.name}
            category={item.attributes.category.data.attributes.name}
            description={item.attributes.description}
            discountPrice={item.attributes.discountPrice}
            images={item.attributes.images.data}
            averageRating={item.attributes.averageRating}
            href={`/products/${item.id}`}
            shortDescription={item.attributes.shortDescription}
            weight={item.attributes.weight}
            seller={item.attributes.users_permissions_user.data}
            tags={item.attributes.tags.data}
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default RelatedProduct;
