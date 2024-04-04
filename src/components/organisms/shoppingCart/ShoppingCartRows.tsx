import Quantity from "@/components/molecules/addQuantity/Quantity";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./shoppingCart.module.scss";
interface ShoppingCartRowsProps {
  id: number | string;
  imgSrc: string;
  productName: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  updateQuantity: (id: number | string, quantity: number) => void;
  calculateTotalPrice: (price: number, quantity: number) => number;
  handleDeleteCart: (id: number | string) => void;
}
const ShoppingCartRows: React.FC<ShoppingCartRowsProps> = ({
  imgSrc,
  productName,
  price,
  discountPrice,
  id,
  quantity,
  updateQuantity,
  calculateTotalPrice,
  handleDeleteCart,
}) => {
  const totalPrice = calculateTotalPrice(
    discountPrice ? discountPrice : price,
    quantity
  );

  return (
    <TableRow className={styles.shoppingCart__tableRow}>
      <Link href={`/products/${id}`}>
        <TableCell
          className={styles.shoppingCart__productImages}
          component="th"
          scope="row"
          sx={{ paddingRight: "0px", borderBottom: "none" }}
        >
          <Image
            width={100}
            height={100}
            src={imgSrc}
            alt="cart image"
            className={styles.shoppingCart__productImage}
          />
          <Typography className={styles.shoppingCart__productName}>
            {productName}
          </Typography>
        </TableCell>
      </Link>

      <TableCell className={styles.shoppingCart__tableCell}>
        {discountPrice ? (
          <Typography className={styles.shoppingCart__price}>
            <Image
              width={40}
              height={40}
              src={"/icons/taka.png"}
              alt="Taka Logo"
              className={styles.shoppingCart__currencyIcon}
            />
            {discountPrice}
          </Typography>
        ) : (
          <Typography className={styles.shoppingCart__price}>
            <Image
              width={40}
              height={40}
              src={"/icons/taka.png"}
              alt="Taka Logo"
              className={styles.shoppingCart__currencyIcon}
            />
            {price}
          </Typography>
        )}
      </TableCell>
      <TableCell className={styles.shoppingCart__tableCell}>
        <Box>
          <Quantity
            id={id}
            updateQuantity={updateQuantity}
            quantityValue={quantity}
            mediumScreen
            sx={{ width: "114px!important" }}
          />
        </Box>
      </TableCell>
      <TableCell className={styles.shoppingCart__tableCell}>
        <Typography className={styles.shoppingCart__price}>
          <Image
            width={40}
            height={40}
            src={"/icons/taka.png"}
            alt="Taka Logo"
            className={styles.shoppingCart__currencyIcon}
          />
          {totalPrice}
        </Typography>
      </TableCell>
      <TableCell className={styles.shoppingCart__tableCell}>
        <IconButton onClick={() => handleDeleteCart(id)}>
          <DeleteForeverSharpIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ShoppingCartRows;
