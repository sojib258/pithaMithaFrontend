"use client";
import Button from "@/components/atoms/button/Button";
import InputText from "@/components/atoms/inputText/InputText";
import ProductCart from "@/components/molecules/productCart/ProductCart";
import { fetchSellerProduct } from "@/store/feature/sellerProduct/SellerProductSlice";
import { RootState } from "@/store/store";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./sellerProducts.module.scss";

const SellerProducts = () => {
  const { items: sellerProducts } = useSelector(
    (state: RootState) => state.sellerProduct
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearchValue = (value: string) => {};

  const handlAddButton = () => {
    router.push("/sales-dashboard/product/add-product");
  };

  console.log("SlrPr", sellerProducts);

  useEffect(() => {
    dispatch(fetchSellerProduct() as any);
  }, [dispatch]);

  return (
    <Box className={styles.product}>
      <Box className={styles.product__headArea}>
        <Box className={styles.product__searchBar}>
          <InputText onChange={handleSearchValue} icon label="Search product" />
        </Box>
        <Box className={styles.product__addNewButton}>
          <Button
            sx={{ borderRadius: "8px!important" }}
            text="Add New"
            plusIcon
            onClick={handlAddButton}
          />
        </Box>
      </Box>
      <Box className={styles.product__content}>
        {sellerProducts.length > 0 ? (
          <Grid container>
            {sellerProducts.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <Box className={styles.product__cart}>
                  <ProductCart
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    shortDescription={item.shortDescription}
                    price={item.price}
                    discountPrice={item.discountPrice}
                    isServiceAvailable={item.isServiceAvailable}
                    images={item.images}
                    category={item.category.name}
                    href={`/sales-dashboard/product/product-details/${item.id}`}
                    weight={item.weight}
                    averageRating={item.averageRating}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Typography className={styles.product__notFound}>
              Currently you don&apos;t have any products to sell.😊😊
            </Typography>
            <Typography className={styles.product__notFoundLink}>
              Start selling by click{" "}
              <Link
                style={{ color: "#00b207", textDecoration: "underline" }}
                href={"/sales-dashboard/product/add-product"}
              >
                here
              </Link>
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SellerProducts;
