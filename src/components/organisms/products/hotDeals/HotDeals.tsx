"use client";
import Button from "@/components/atoms/button/Button";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import styles from "./hotDeals.module.scss";

const HotDeals = () => {
  const dispatch = useDispatch();
  const { loading, items } = useSelector((state: RootState) => state.products);

  const hotDealsProducts = items.filter((item) => item.attributes.isHotDeals);

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
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          hotDealsProducts.map((item, index) => (
            <Grid flexGrow={1} key={index} xs={6} sm={4} md={3} lg={2.4} item>
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

export default HotDeals;
