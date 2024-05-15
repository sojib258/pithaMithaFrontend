import Button from "@/components/atoms/button/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import styles from "./orderFailed.module.scss";
const OrderFailed = () => {
  return (
    <Box className={styles.cart}>
      <Box className={styles.cart__wrapper}>
        <Box className={styles.cart__icon}>
          <CancelIcon />
        </Box>
        <Typography component={"h2"} className={styles.cart__title}>
          Unable to Process Payment
        </Typography>
        <Typography className={styles.cart__description}>
          We&apos;re sorry, we were unable to process you payment. Please try
          again later.
        </Typography>
        <Typography className={styles.cart__help}>
          If you need help, please contact our support team
        </Typography>
        <Box className={styles.cart__action}>
          <Link href={"/shopping-cart"}>
            <Button sx={{ width: "100%" }} text="Go To Cart" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderFailed;
