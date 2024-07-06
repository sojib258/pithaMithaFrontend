import ProductRows from "@/components/organisms/orderDetailProduct/ProductRows";
import { OrderProduct } from "@/utils/typesDefine/orderSliceTypes";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./product.module.scss";

interface ProductProps {
  productData: OrderProduct[];
  status: string;
  userId: number | null;
}
const Product: React.FC<ProductProps> = ({ productData, status, userId }) => {
  const sellerTotalPrice = productData.reduce((acc: any, cur: OrderProduct) => {
    const priceToUse = cur.discountPrice ? cur.discountPrice : cur.price;
    const itemTotal = priceToUse * cur.quantity;
    return (acc += itemTotal);
  }, 0);

  return (
    <TableContainer
      className={styles.product__tableContainer}
      component={Paper}
    >
      <Table className={styles.product__table} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ border: "1px solid #e6e6e6;" }}>
            <TableCell component="th" className={styles.product__tableHead}>
              Product
            </TableCell>
            <TableCell
              component="th"
              className={styles.product__tableHead}
              sx={{ width: "100px" }}
            >
              Price
            </TableCell>
            <TableCell
              component="th"
              className={styles.product__tableHead}
              sx={{ width: "100px" }}
            >
              Quantity
            </TableCell>
            <TableCell
              component="th"
              className={styles.product__tableHead}
              sx={{ width: "100px" }}
            >
              Subtotal
            </TableCell>

            <TableCell
              component="th"
              className={styles.product__tableHead}
              sx={{ width: "100px" }}
            >
              Review
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData.map((item) => (
            <ProductRows
              imgSrc={item.imgSrc}
              price={item.price}
              discountPrice={item.discountPrice}
              quantity={item.quantity}
              title={item.title}
              altText={item.altText}
              key={item.productId}
              status={status}
              productId={item.productId}
              userId={userId}
            />
          ))}
          <TableRow>
            <TableCell colSpan={3}>
              <Typography className={styles.product__sellerTotalText}>
                Total Price:
              </Typography>
            </TableCell>
            <TableCell>
              <Box className={styles.product__priceCell}>
                <Image
                  width={40}
                  height={40}
                  src={"/icons/taka.png"}
                  alt="Taka Logo"
                  className={styles.product__currencyIcon}
                />

                <Typography className={styles.product__sellerTotalPrice}>
                  {sellerTotalPrice}
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Product;
