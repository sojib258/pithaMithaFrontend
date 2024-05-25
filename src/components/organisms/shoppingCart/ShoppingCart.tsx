"use client";
import Button from "@/components/atoms/button/Button";
import CouponCodeDialog from "@/components/molecules/couponCodeDialog/CouponCode";
import Summary from "@/components/organisms/orderSummary/Summary";
import { removeToCart, updateCart } from "@/store/feature/cart/CartSlice";
import { RootState } from "@/store/store";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartRows from "./ShoppingCartRows";
import styles from "./shoppingCart.module.scss";
const ShoppingCart = () => {
  const carts = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
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
  // This is for coupon code dialog end

  const cartItems = carts.length;

  const handleQuantity = (quantityValue: number, type: any, productId: any) => {
    dispatch(
      updateCart({
        quantity: quantityValue,
        type: type,
        productId: productId,
      })
    );
  };

  const calculateTotalPrice = (price: number, quantity: number) => {
    return price * quantity;
  };

  const handleDeleteCart = (id: any) => {
    dispatch(
      removeToCart({
        productId: id,
      })
    );
  };

  const handleProceedBtn = () => {
    router.push("/shopping-cart/checkout");
  };

  const subTotal = carts.reduce((acc, cur) => {
    const priceToUse = cur.discountPrice ? cur.discountPrice : cur.price;
    const totalPrice = priceToUse * cur.quantity;
    acc += totalPrice;

    return acc;
  }, 0);

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
            {cartItems > 0 ? (
              <Box className={styles.shoppingCart__tableWrapper}>
                <TableContainer component={Paper}>
                  <Table
                    sx={{
                      minWidth: 960,
                    }}
                    className={styles.shoppingCart__table}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow sx={{ border: "1px solid #e6e6e6;" }}>
                        <TableCell className={styles.shoppingCart__tableHead}>
                          Product
                        </TableCell>
                        <TableCell
                          sx={{ width: "100px" }}
                          className={styles.shoppingCart__tableHead}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          sx={{ width: "180px" }}
                          className={styles.shoppingCart__tableHead}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          sx={{ width: "100px" }}
                          className={styles.shoppingCart__tableHead}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          sx={{ width: "70px" }}
                          className={styles.shoppingCart__tableHead}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {carts.map((item) => (
                        <ShoppingCartRows
                          key={item.productId}
                          id={item.productId}
                          imgSrc={item.imgSrc}
                          price={item.price}
                          discountPrice={item.discountPrice}
                          productName={item.title}
                          quantity={item.quantity}
                          updateQuantity={handleQuantity}
                          calculateTotalPrice={calculateTotalPrice}
                          handleDeleteCart={handleDeleteCart}
                          isServiceAvailable={item.isServiceAvailable}
                        />
                      ))}
                      <TableRow>
                        <TableCell
                          sx={{ marginLeft: "auto" }}
                          className={styles.shoppingCart__totalPrice}
                          colSpan={3}
                        >
                          <Typography
                            sx={{ justifyContent: "flex-end!important" }}
                            className={styles.shoppingCart__price}
                          >
                            Total:
                          </Typography>
                        </TableCell>
                        <TableCell className={styles.shoppingCart__tableCell}>
                          <Typography className={styles.shoppingCart__subTotal}>
                            <Image
                              width={40}
                              height={40}
                              src={"/icons/taka.png"}
                              alt="Taka Logo"
                              className={styles.shoppingCart__currencyIcon}
                            />
                            {subTotal}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
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
              </Box>
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
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box className={styles.shoppingCart__summarySection}>
            <Summary
              title="Cart Total"
              cartItems={cartItems}
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