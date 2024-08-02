import dateFormat from "@/utils/dateFormat";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import styles from "./cart.module.scss";

interface RecentBlogCartProps {
  id: number;
  src: string;
  title: string;
  date: string;
}

const RecentBlogCart: React.FC<RecentBlogCartProps> = ({
  id,
  src,
  title,
  date,
}) => {
  const { date: convertedDate } = dateFormat(date);
  return (
    <Link href={`/blogs/${id}`}>
      <Box className={styles.cart}>
        <Box className={styles.cart__leftContent}>
          <Image
            className={styles.cart__img}
            width={100}
            height={100}
            src={src}
            alt="Alternative text"
          />
        </Box>
        <Box className={styles.cart__rightContent}>
          <Typography className={styles.cart__title}>{title}</Typography>
          <Box className={styles.cart__dateDetail}>
            <Image
              className={styles.cart__iconImg}
              width={20}
              height={20}
              src={"/icons/cart.svg"}
              alt="Alternative text"
            />
            <Typography className={styles.cart__date}>
              {convertedDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default RecentBlogCart;
