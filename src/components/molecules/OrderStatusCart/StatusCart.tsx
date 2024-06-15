import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./statusCart.module.scss";

interface StatusCart {
  title: string;
  amount: number | string;
  icon: React.ReactNode;
  style?: object;
  currencyIcon?: boolean;
  link: string;
  loading?: boolean;
}

const StatusCart: React.FC<StatusCart> = ({
  style,
  icon,
  amount,
  title,
  currencyIcon,
  link,
  loading,
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
            {loading ? (
              <Skeleton sx={{ width: "50px" }} />
            ) : (
              <Typography className={styles.cart__count}>{amount}</Typography>
            )}
          </Box>
          <BoltOutlinedIcon sx={{ color: "#1a1a1a" }} />
        </Box>
      </Box>
    </Link>
  );
};

export default StatusCart;
