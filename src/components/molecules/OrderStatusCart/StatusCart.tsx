import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./statusCart.module.scss";

interface StatusCart {
  title: string;
  amount: number | null;
  icon: React.ReactNode;
  style?: object;
  currencyIcon?: boolean;
}

const StatusCart: React.FC<StatusCart> = ({
  style,
  icon,
  amount,
  title,
  currencyIcon,
}) => {
  return (
    <Box sx={style} className={styles.cart}>
      <Box className={styles.cart__header}>
        {icon}
        <Typography className={styles.cart__title}>{title}</Typography>
      </Box>
      <Box className={styles.cart__body}>
        <Box className={styles.cart__countBox}>
          {currencyIcon && (
            <Image
              width={40}
              height={40}
              src={"/icons/taka.png"}
              alt="Taka Logo"
              className={styles.cart__currencyIcon}
            />
          )}
          <Typography className={styles.cart__count}>{34343}</Typography>
        </Box>
        <BoltOutlinedIcon />
      </Box>
    </Box>
  );
};

export default StatusCart;
