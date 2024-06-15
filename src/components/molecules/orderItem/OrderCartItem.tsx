import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./cartItems.module.scss";

interface CartItemsProps {
  imgSrc: string;
  altText?: string;
  title: string;
  quantity: number;
  price: number;
  discountPrice?: number;
  sx?: object;
}
const OrderCartItem: React.FC<CartItemsProps> = ({
  imgSrc,
  title,
  quantity,
  price,
  discountPrice,
  altText,
  sx,
}) => {
  return (
    <Box sx={sx} className={styles.order__cart}>
      <Image
        className={styles.order__image}
        width={100}
        height={100}
        src={imgSrc}
        alt={altText ? altText : "product image"}
      />
      <Typography component={"span"} className={styles.order__title}>
        {title}
      </Typography>
      <Typography component={"span"} className={styles.order__quantity}>
        QTY: {quantity}
      </Typography>
      <Typography component={"span"} className={styles.order__price}>
        <Image
          width={40}
          height={40}
          src={"/icons/taka.png"}
          alt="Taka Logo"
          className={styles.order__currencyIcon}
        />
        {discountPrice ? discountPrice : price}
      </Typography>
    </Box>
  );
};

export default OrderCartItem;
