"use client";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import ProductSkeleton from "@/components/molecules/skeleton/product/ProductSkeleton";
import useResponsive from "@/hooks/useResponsive";
import { ProductData } from "@/utils/typesDefine/productSliceTypes";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";
import styles from "./relatedProduct.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;
interface RelatedProductProps {
  category: string;
}

const RelatedProduct: React.FC<RelatedProductProps> = ({ category }) => {
  const [relatedProducts, setRelatedProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const { smScreen } = useResponsive();
  const dispatch = useDispatch();

  // Filter products to find related products with the same category

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/products?populate[tags]=true&populate[category]=true&populate[images]=treu&populate[users_permissions_user][populate]=image`
        );

        setLoading(false);
        setRelatedProducts(response.data.data);
      } catch (error) {
        setLoading(false);
        console.error("Error from fetching related products");
      }
    };

    fetchProducts();
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
            key={item.id}
            id={item.id}
            isServiceAvailable={item.attributes.serviceAvailable}
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
        {loading &&
          [1, 2, 3, 4, 5].map((item) => <ProductSkeleton key={item} />)}
      </Carousel>
    </Box>
  );
};

export default RelatedProduct;
