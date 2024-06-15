"use client";
import { removeToCart, updateCart } from "@/store/feature/cart/CartSlice";
import timeFormat from "@/utils/timeFormat";
import { ProductData } from "@/utils/typesDefine/cartSliceTypes";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import { useDispatch } from "react-redux";
import ShoppingCartRows from "./ShoppingCartRows";
import styles from "./shoppingCart.module.scss";

interface ShoppingCartTableProps {
  userId: number;
  firstName: string;
  lastName?: string;
  sellerImg?: string;
  status: string;
  averageResponseTime?: number;
  products: ProductData[];
}

const ShoppingCartTable: React.FC<ShoppingCartTableProps> = ({
  products,
  userId,
  firstName,
  lastName,
  sellerImg,
  averageResponseTime,
}) => {
  const dispatch = useDispatch();

  const formatedTime = averageResponseTime && timeFormat(averageResponseTime);

  const handleQuantity = (quantityValue: number, type: any, productId: any) => {
    dispatch(
      updateCart({
        quantity: quantityValue,
        productId: productId,
        sellerId: userId,
        type: type,
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
        sellerId: userId,
      })
    );
  };

  const sellerTotal = products.reduce((acc, cur) => {
    const priceToUse = cur.discountPrice ? cur.discountPrice : cur.price;
    const totalPrice = priceToUse * cur.quantity;
    acc += totalPrice;

    return acc;
  }, 0);

  return (
    <Box className={styles.shoppingCart__tableWrapper}>
      <Box className={styles.shoppingCart__head}>
        <Typography className={styles.shoppingCart__sellerName}>
          Seller Name:{" "}
          <Typography
            className={styles.shoppingCart__sellerNameV}
            component={"span"}
          >
            {`${firstName} `}
            {lastName && lastName}
          </Typography>
        </Typography>
        {averageResponseTime && (
          <Typography className={styles.shoppingCart__sellerResponseTime}>
            Average Response Time:{" "}
            <Typography
              className={styles.shoppingCart__sellerNameV}
              component={"span"}
            >
              {formatedTime}
            </Typography>
          </Typography>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 850,
          }}
          className={styles.shoppingCart__table}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ border: "1px solid #e6e6e6;" }}>
              <TableCell
                sx={{ width: "400px" }}
                className={styles.shoppingCart__tableHead}
              >
                Product
              </TableCell>
              <TableCell
                // sx={{ width: "160px" }}
                className={styles.shoppingCart__tableHead}
              >
                Price
              </TableCell>
              <TableCell
                // sx={{ width: "180px" }}
                className={styles.shoppingCart__tableHead}
              >
                Quantity
              </TableCell>
              <TableCell
                // sx={{ width: "100px" }}
                className={styles.shoppingCart__tableHead}
              >
                Total
              </TableCell>
              <TableCell
                // sx={{ width: "70px" }}
                className={styles.shoppingCart__tableHead}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item) => (
              <ShoppingCartRows
                key={item.productId}
                id={item.productId}
                imgSrc={item.imgSrc}
                price={item.price}
                discountPrice={item.discountPrice}
                title={item.title}
                quantity={item.quantity}
                updateQuantity={handleQuantity}
                calculateTotalPrice={calculateTotalPrice}
                handleDeleteCart={handleDeleteCart}
                isServiceAvailable={item.isServiceAvailable}
                sellerId={userId}
                firstName={firstName}
                lastName={lastName}
                status=""
                altText={item.altText}
                averageResponseTime={averageResponseTime}
                sellerImg={sellerImg}
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
                  {sellerTotal}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ShoppingCartTable;
