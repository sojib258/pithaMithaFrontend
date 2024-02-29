"use client";
import Button from "@/components/atoms/button/Button";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import { fetchItems } from "@/store/feature/product/ProductSlice";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./products.module.scss";
const Products = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchItems() as any);
  }, [dispatch]);

  return (
    <Box className={styles.products}>
      <Box className={styles.products__head}>
        <Typography className={styles.products__headText}>
          Popular Products
        </Typography>
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
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          products.map((item) => (
            <Grid flexGrow={1} key={item.id} xs={6} sm={4} md={3} lg={2.4} item>
              <ProductCart
                id={item.id}
                ratingValue={item.attributes.ratingValue}
                price={item.attributes.price}
                title={item.attributes.name}
                category={item.attributes.category.name}
                description={item.attributes.description}
                discountPrice={item.attributes.discountPrice}
                images={item.attributes.images}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Products;
