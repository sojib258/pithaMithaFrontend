import Button from "@/components/atoms/button/Button";
import OrderStatus from "@/components/atoms/orderStatus/OrderStatus";
import dateFormat from "@/utils/dateFormat";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./recentOrder.module.scss";
interface OrderItemsProps {
  orderId: number;
  date: string;
  totalPrice: number;
  status: string;
  paid: boolean;
  images: [{ imgSrc: string; altText?: string }];
  altText?: string;
  head?: boolean;
}
const OrderItems: React.FC<OrderItemsProps> = ({
  orderId,
  date,
  totalPrice,
  status,
  images,
  paid,
  head = false,
}) => {
  const { date: tarikh } = dateFormat(date);

  const totalProduct = images.length;
  return (
    <>
      <TableRow className={styles.recent__tableRow}>
        <TableCell
          className={styles.recent__tableCell}
          component="td"
          scope="row"
        >
          <Typography className={styles.recent__orderId}>{orderId}</Typography>
        </TableCell>
        <TableCell
          className={styles.recent__tableCell}
          component="td"
          scope="row"
        >
          <Box className={styles.recent__imageWrapper}>
            {images.map((item, index) => (
              <Image
                key={index}
                width={100}
                height={100}
                src={item.imgSrc}
                className={styles.recent__productImg}
                alt={item.altText ? item.altText : "Product Image"}
              />
            ))}
          </Box>
        </TableCell>

        <TableCell
          component="td"
          scope="row"
          className={styles.recent__tableCell}
        >
          <Typography className={styles.recent__date}>{tarikh}</Typography>
        </TableCell>
        <TableCell
          component="td"
          scope="row"
          className={styles.recent__tableCell}
        >
          <Box className={styles.recent__priceCell}>
            <Image
              width={40}
              height={40}
              src={"/icons/taka.png"}
              alt="Taka Logo"
              className={styles.recent__currencyIcon}
            />

            <Typography
              className={styles.recent__totalPrice}
              component={"span"}
            >
              {totalPrice}
            </Typography>
            <Typography
              className={styles.recent__productItems}
              component={"span"}
            >
              {`(${totalProduct} Products)`}
            </Typography>
          </Box>
        </TableCell>
        <TableCell
          component="td"
          scope="row"
          className={styles.recent__tableCell}
        >
          <OrderStatus status={status} />
        </TableCell>
        <TableCell
          component="td"
          scope="row"
          className={styles.recent__tableCell}
        >
          <Typography className={styles.recent__paidStatus}>
            {paid ? "Paid" : "Not Paid"}
          </Typography>
        </TableCell>
        <TableCell
          component="td"
          scope="row"
          className={styles.recent__tableCell}
        >
          <Link href={`/order-history/order-details/${orderId}`}>
            <Button
              sx={{
                backgroundColor: "transparent!important",
                boxShadow: "none",
                color: "#00b207!important",
                padding: "2px 8px!important",
                "&:hover": {
                  textDecoration: "underline",
                  boxShadow: "none!important",
                },
              }}
              text="View Details"
            />
          </Link>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderItems;
