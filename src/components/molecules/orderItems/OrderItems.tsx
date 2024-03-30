import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./orderItems.module.scss";

interface OrderItemsProps {
  imgSrc: string;
  altText?: string;
  title: string;
  quantity: number;
  price: number;
  discountPrice?: number;
  sx?: object;
}
const OrderItems: React.FC<OrderItemsProps> = ({
  imgSrc,
  title,
  quantity,
  price,
  discountPrice,
  altText,
  sx,
}) => {
  return (
    <Box sx={sx} className={styles.cart}>
      <Image
        className={styles.cart__image}
        width={100}
        height={100}
        src={imgSrc}
        alt={altText ? altText : "product image"}
      />
      <Typography component={"span"} className={styles.cart__title}>
        {title}
      </Typography>
      <Typography component={"span"} className={styles.cart__quantity}>
        QTY: {quantity}
      </Typography>
      <Typography component={"span"} className={styles.cart__price}>
        <Image
          width={40}
          height={40}
          src={"/icons/taka.png"}
          alt="Taka Logo"
          className={styles.cart__currencyIcon}
        />
        {discountPrice ? discountPrice : price}
      </Typography>
    </Box>
  );
};

export default OrderItems;
