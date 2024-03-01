import ProductCart from "@/components/molecules/productCart/ProductCart";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import styles from "./relatedProduct.module.scss";

interface RelatedProductProps {
  productId: string | number;
}

const RelatedProduct: React.FC<RelatedProductProps> = ({ productId }) => {
  const { items } = useSelector((state: RootState) => state.products);

  // Get the category of the current product based on its ID
  const currentProduct = items.find((item) => item.id === productId);
  const currentCategory = currentProduct
    ? currentProduct.attributes.category.name
    : null;

  // Filter products to find related products with the same category
  const relatedProducts = items
    .filter(
      (item) =>
        item.id !== productId &&
        item.attributes.category.name === currentCategory
    )
    .slice(0, 5); // Limit the number of related products to display

  console.log("RelatedProduct", relatedProducts);

  return (
    <Box className={styles.product}>
      <Typography className={styles.product__headText}>
        Related Products
      </Typography>
      <Box className={styles.product__content}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {relatedProducts.map((item) => (
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
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default RelatedProduct;
