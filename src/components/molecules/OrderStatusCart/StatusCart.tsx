import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./statusCart.module.scss";

interface StatusCart {
  title: string;
  amount: number | null;
  icon: React.ReactNode;
  style?: object;
  currencyIcon?: boolean;
  link: string;
}

const StatusCart: React.FC<StatusCart> = ({
  style,
  icon,
  amount,
  title,
  currencyIcon,
  link,
}) => {
  return (
    <Link href={link}>
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
            <Typography className={styles.cart__count}>{amount}</Typography>
          </Box>
          <BoltOutlinedIcon sx={{ color: "#1a1a1a" }} />
        </Box>
      </Box>
    </Link>
  );
};

export default StatusCart;
