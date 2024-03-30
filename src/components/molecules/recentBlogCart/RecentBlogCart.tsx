import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import styles from "./cart.module.scss";

interface RecentBlogCartProps {}

const RecentBlogCart: React.FC<RecentBlogCartProps> = () => {
  return (
    <Box className={styles.cart}>
      <Box className={styles.cart__leftContent}>
        <Image
          className={styles.cart__img}
          width={100}
          height={100}
          src={"/img/6.jpg"}
          alt="Alternative text"
        />
      </Box>
      <Box className={styles.cart__rightContent}>
        <Typography className={styles.cart__title}>
          Curabitur porttitor orci eget nequ accumsan.
        </Typography>
        <Box className={styles.cart__dateDetail}>
          <Image
            className={styles.cart__iconImg}
            width={20}
            height={20}
            src={"/icons/cart.svg"}
            alt="Alternative text"
          />
          <Typography className={styles.cart__date}>Apr 25, 2021</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RecentBlogCart;
