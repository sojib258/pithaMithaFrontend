"use client";
import Button from "@/components/atoms/button/Button";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import ProductSkeleton from "@/components/molecules/skeleton/product/ProductSkeleton";
import useResponsive from "@/hooks/useResponsive";
import { fetchProducts } from "@/utils/fetchProduct";
import { ProductData } from "@/utils/typesDefine/productSliceTypes";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./products.module.scss";
const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { downSmScreen } = useResponsive();
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts(
          `filters[isPopular]=true&populate[category]=true&populate[tags]=true&populate[images]=true&populate[users_permissions_user][populate]=image`
        );
        setProducts(products);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <Box className={styles.products}>
      <Box className={styles.products__head}>
        <Typography className={styles.products__headText}>
          Popular Products
        </Typography>
        <Link href={"/products"}>
          <Button
            customStyle={{
              fontSize: "14px",
              padding: "5px 10px",
              backgroundColor: "transparent",
              boxShadow: "none",
              color: "#00B207",
              paddingRight: "0px",
            }}
            arrowIcon
            text="View All"
          />
        </Link>
      </Box>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {loading
          ? skeletonArray.map((item) => (
              <Grid
                flexGrow={1}
                key={item}
                xs={6}
                md={4}
                lg={3}
                xl={2.4}
                item
                sx={
                  downSmScreen
                    ? { display: "flex", justifyContent: "center" }
                    : undefined
                }
              >
                <ProductSkeleton />
              </Grid>
            ))
          : products.map((item) => (
              <Grid
                flexGrow={1}
                key={item.id}
                xs={6}
                md={4}
                lg={3}
                xl={2.4}
                item
                sx={
                  downSmScreen
                    ? { display: "flex", justifyContent: "center" }
                    : undefined
                }
              >
                <ProductCart
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
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Products;
