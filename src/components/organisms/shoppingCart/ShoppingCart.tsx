"use client";
import Button from "@/components/atoms/button/Button";
import CouponCodeDialog from "@/components/molecules/couponCodeDialog/CouponCode";
import { RootState } from "@/store/store";
import { CartSliceData } from "@/utils/typesDefine/cartSliceTypes";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import Summary from "../orderSummary/Summary";
import ShoppingCartTable from "./ShoppingCartTable";
import styles from "./shoppingCart.module.scss";
const ShoppingCart = () => {
  const carts = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  // This is for coupon code dialog start
  const [couponCode, setCouponCode] = useState("");
  const [couponOpen, setCouponOpen] = useState(false);
  const handleCouponOpen = () => {
    setCouponOpen(!couponOpen);
  };
  const handleCouponCode = (value: string) => {
    setCouponCode(value);
  };

  const handleProceedBtn = () => {
    router.push("/shopping-cart/checkout");
  };

  const cartsTotal = carts.reduce((acc, seller) => {
    acc += seller.products.length;
    return acc;
  }, 0);

  const calculateSubTotal = () => {
    return carts.reduce((acc, seller) => {
      const sellerTotal = seller.products.reduce((sellerAcc, product) => {
        const price = product.discountPrice ?? product.price;
        return sellerAcc + price * product.quantity;
      }, 0);
      return acc + sellerTotal;
    }, 0);
  };

  const subTotal = calculateSubTotal();
  const shippingCost = 60;
  const grandTotal = subTotal + shippingCost;

  return (
    <Box className={styles.shoppingCart}>
      <Typography className={styles.shoppingCart__title}>
        My Shopping Cart
      </Typography>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <Box className={styles.shoppingCart__productsTable}>
            {cartsTotal > 0 ? (
              carts.map((item: CartSliceData) => (
                <ShoppingCartTable
                  key={item.userId}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  userId={item.userId}
                  status={item.status}
                  averageResponseTime={item.averageResponseTime}
                  sellerImg={item.sellerImg}
                  products={item.products}
                />
              ))
            ) : (
              <Box mb={5}>
                <Typography className={styles.shoppingCart__nothing}>
                  You don&apos;t have any cart items right now.😊😊
                </Typography>
                <Link href={"/products"}>
                  <Button text="Continue shopping" arrowIcon />
                </Link>
              </Box>
            )}
          </Box>
          {cartsTotal > 0 && (
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ margin: "32px 0px" }}
            >
              <Link href={"/products"}>
                <Button text="Continue shopping" arrowIcon />
              </Link>
              <Button
                onClick={handleCouponOpen}
                sx={{
                  backgroundColor: "transparent!important",
                  color: "#00b207!important",
                  boxShadow: "none",
                  padding: "5px!important",
                  fontSize: ".8rem!important",

                  "&:hover": {
                    boxShadow: "none",
                    textDecoration: "underline",
                  },
                }}
                text="Coupon Code +"
              />
            </Stack>
          )}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box className={styles.shoppingCart__summarySection}>
            <Summary
              title="Cart Total"
              cartItems={cartsTotal}
              grandTotal={grandTotal}
              shippingCost={shippingCost}
              subTotal={subTotal}
              btnText="Proceed to Checkout"
              handleBtn={handleProceedBtn}
            />
          </Box>
        </Grid>
      </Grid>
      {couponOpen && (
        <CouponCodeDialog
          open={couponOpen}
          handleCouponOpen={handleCouponOpen}
          couponCode={couponCode}
          handleCouponCode={handleCouponCode}
        />
      )}
    </Box>
  );
};
export default ShoppingCart;
