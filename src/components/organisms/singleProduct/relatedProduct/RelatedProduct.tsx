import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "./relatedProduct.module.scss";

const Product = () => {
  const item = [1, 2, 3, 4];
  return (
    <Box className={styles.product}>
      <Typography className={styles.product__headText}>
        Related Products
      </Typography>
      <Box className={styles.product__content}>
        <Grid container>
          {/* {hotDealsProducts.map((item, index) => (
          <Grid flexGrow={1} key={index} xs={6} sm={4} md={3} lg={2.4} item>
            <ProductCart
              ratingValue={item.attributes.ratingValue}
              price={item.attributes.price}
              title={item.attributes.name}
              category={item.attributes.category.name}
              description={item.attributes.description}
              discountPrice={item.attributes.discountPrice}
              images={item.attributes.images}
            />
          </Grid>
        ))} */}
          {item.map((item, index) => (
            <Grid flexGrow={1} key={index} xs={6} sm={4} md={3} item>
              <p>Lorem ipsum dolor sit amet consectetur adipis.</p>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Product;
