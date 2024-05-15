import ProductRows from "@/components/organisms/orderDetailProduct/ProductRows";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "./product.module.scss";

type Data = {
  productId: number | string;
  title: string;
  price: number;
  discountPrice: number;
  imgSrc: string;
  altText?: string;
  quantity: number;
};

interface ProductProps {
  productData: Data[];
  status: string;
}
const Product: React.FC<ProductProps> = ({ productData, status }) => {
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
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Product;
