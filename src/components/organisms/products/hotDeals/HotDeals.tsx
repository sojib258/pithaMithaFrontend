"use client";
import Button from "@/components/atoms/button/Button";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import ProductSkeleton from "@/components/molecules/skeleton/product/ProductSkeleton";
import useResponsive from "@/hooks/useResponsive";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import styles from "./hotDeals.module.scss";

const HotDeals = () => {
  const { downSmScreen } = useResponsive();
  const { loading, items } = useSelector((state: RootState) => state.products);

  const hotDealsProducts = items.filter((item) => item.attributes.isHotDeals);

  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <Box className={styles.hotDeals}>
      <Box className={styles.hotDeals__head}>
        <Typography className={styles.hotDeals__headText}>Hot Deals</Typography>

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
      </Box>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {loading
          ? skeletonArray.map((item) => (
              <Grid
                flexGrow={1}
                key={item}
                xs={12}
                sm={6}
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
          : hotDealsProducts.map((item, index) => (
              <Grid
                flexGrow={1}
                key={item.id}
                xs={12}
                sm={6}
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
                  price={item.attributes.price}
                  title={item.attributes.name}
                  category={item.attributes.category.name}
                  description={item.attributes.description}
                  discountPrice={item.attributes.discountPrice}
                  images={item.attributes.images}
                  isServiceAvailable={item.attributes.isServiceAvailable}
                  ratingValue={item.attributes.ratingValue}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default HotDeals;
