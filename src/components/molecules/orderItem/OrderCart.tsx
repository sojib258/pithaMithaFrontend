import timeFormat from "@/utils/timeFormat";
import { ProductData } from "@/utils/typesDefine/cartSliceTypes";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OrderCartItem from "./OrderCartItem";
import styles from "./cartItems.module.scss";

interface OrderCartProps {
  userId: number;
  firstName: string;
  lastName?: string;
  sellerImg?: string;
  status: string;
  averageResponseTime?: number;
  products: ProductData[];
}

const OrderCart: React.FC<OrderCartProps> = ({
  products,
  userId,
  firstName,
  lastName,
  sellerImg,
  averageResponseTime,
}) => {
  const formatedTime = averageResponseTime && timeFormat(averageResponseTime);

  return (
    <Box className={styles.order}>
      <Box className={styles.order__head}>
        <Typography className={styles.order__sellerName}>
          Seller Name:{" "}
          <Typography className={styles.order__sellerNameV} component={"span"}>
            {`${firstName} `}
            {lastName && lastName}
          </Typography>
        </Typography>
        {averageResponseTime && (
          <Typography className={styles.order__sellerResponseTime}>
            Average Response Time:{" "}
            <Typography
              className={styles.order__sellerNameV}
              component={"span"}
            >
              {formatedTime}
            </Typography>
          </Typography>
        )}
      </Box>
      <Box className={styles.order__body}>
        {products.map((item) => (
          <OrderCartItem
            key={item.productId}
            imgSrc={item.imgSrc}
            price={item.price}
            discountPrice={item.discountPrice}
            quantity={item.quantity}
            title={item.title}
            sx={{ borderBottom: "1px solid #e6e6e6;" }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OrderCart;
