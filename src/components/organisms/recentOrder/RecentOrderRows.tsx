import Button from "@/components/atoms/button/Button";
import OrderStatus from "@/components/atoms/orderStatus/OrderStatus";
import OrderTableSkeleton from "@/components/molecules/skeleton/table/TableSkeleton";
import dateFormat from "@/utils/dateFormat";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./recentOrder.module.scss";
interface OrderItemsProps {
  orderId: string | number;
  date: string;
  totalPrice: number | string;
  totalProduct: number | string;
  status: string;
  loading: boolean;
  paid: boolean;
  imgSrc: string;
  altText?: string;
  head?: boolean;
}
const OrderItems: React.FC<OrderItemsProps> = ({
  orderId,
  date,
  totalPrice,
  totalProduct,
  status,
  imgSrc,
  altText,
  loading,
  paid,
  head = false,
}) => {
  const { date: tarikh } = dateFormat(date);
  return (
    <>
      {loading ? (
        <OrderTableSkeleton />
      ) : (
        <TableRow className={styles.recent__tableRow}>
          <TableCell
            className={styles.recent__tableCell}
            component="td"
            scope="row"
          >
            <Typography className={styles.recent__orderId}>
              {orderId}
            </Typography>
          </TableCell>
          <TableCell
            className={styles.recent__tableCell}
            component="td"
            scope="row"
          >
            <Image
              width={200}
              height={200}
              src={imgSrc}
              className={styles.recent__productImg}
              alt={altText ? altText : "Product Image"}
            />
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
      )}
    </>
  );
};

export default OrderItems;
