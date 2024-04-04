import Button from "@/components/atoms/button/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./summary.module.scss";

interface SummaryProps {
  title?: string;
  cartItems: number;
  subTotal: number;
  shippingCost: number;
  grandTotal: number;
  btnLink?: string;
  btnText?: string;
  sx?: object;
}
const Summary: React.FC<SummaryProps> = ({
  title,
  cartItems,
  subTotal,
  shippingCost,
  grandTotal,
  btnText,
  btnLink,
  sx,
}) => {
  return (
    <Box sx={sx} className={styles.cartTotal}>
      {title && (
        <Typography className={styles.cartTotal__text}>{title}</Typography>
      )}
      <Box className={styles.cartTotal__info}>
        <Typography className={styles.cartTotal__items}>
          Items {cartItems}:
        </Typography>
        <Typography className={styles.cartTotal__price}>
          <Image
            width={40}
            height={40}
            src={"/icons/taka.png"}
            alt="Taka Logo"
            className={styles.cartTotal__currencyIcon}
          />
          {subTotal}
        </Typography>
      </Box>
      <Box className={styles.cartTotal__info}>
        <Typography className={styles.cartTotal__items}>Shipping:</Typography>
        <Typography className={styles.cartTotal__price}>
          {Number(shippingCost) === 0 ? "free" : shippingCost}
        </Typography>
      </Box>
      <Box className={styles.cartTotal__info}>
        <Typography className={styles.cartTotal__grandTotal}>
          Grand Total:
        </Typography>
        <Typography className={styles.cartTotal__grandTotal}>
          <Image
            width={40}
            height={40}
            src={"/icons/taka.png"}
            alt="Taka Logo"
            className={styles.cartTotal__currencyIcon}
          />
          {grandTotal}
        </Typography>
      </Box>
      {btnText && (
        <Box className={styles.cartTotal__btn}>
          <Link href={btnLink ? btnLink : "/404"}>
            <Button
              disabled={cartItems === 0}
              sx={{ width: "100%" }}
              text={btnText}
            />
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Summary;
