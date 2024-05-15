import Button from "@/components/atoms/button/Button";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./product.module.scss";

interface ProductRowsProps {
  imgSrc: string;
  title: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  altText?: string;
  status: string;
}
const ProductRows: React.FC<ProductRowsProps> = ({
  imgSrc,
  price,
  discountPrice,
  quantity,
  title,
  altText,
  status,
}) => {
  const subTotal = (discountPrice ? discountPrice : price) * quantity;
  return (
    <TableRow className={styles.product__tableRow}>
      <TableCell className={styles.product__images}>
        <Image
          width={100}
          height={100}
          src={imgSrc}
          alt={altText ? altText : "Product Image"}
          className={styles.product__img}
        />

        <Typography className={styles.product__title} component={"span"}>
          {title}
        </Typography>
      </TableCell>

      <TableCell className={styles.product__tableCell}>
        <Box className={styles.product__priceCell}>
          <Image
            width={40}
            height={40}
            src={"/icons/taka.png"}
            alt="Taka Logo"
            className={styles.product__currencyIcon}
          />

          <Typography className={styles.product__price}>
            {discountPrice ? discountPrice : price}
          </Typography>
        </Box>
      </TableCell>
      <TableCell className={styles.product__tableCell}>
        <Typography className={styles.product__quantity}>
          x{quantity}
        </Typography>
      </TableCell>
      <TableCell className={styles.product__tableCell}>
        <Box className={styles.product__priceCell}>
          <Image
            width={40}
            height={40}
            src={"/icons/taka.png"}
            alt="Taka Logo"
            className={styles.product__currencyIcon}
          />

          <Typography className={styles.product__subTotal}>
            {subTotal}
          </Typography>
        </Box>
      </TableCell>
      <TableCell className={styles.product__tableCell}>
        {status === "Delivered" && <Button text="Review" />}
      </TableCell>
    </TableRow>
  );
};

export default ProductRows;
