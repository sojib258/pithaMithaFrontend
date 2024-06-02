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
import styles from "./ordersTable.module.scss";

interface OrderProduct {
  productId: number;
  title: string;
  imgSrc: string;
  altText?: string;
  quantity: number;
  price: number;
  isServiceAvailable: boolean;
  discountPrice?: number;
}

interface OrdersTableRowProps {
  orderId: string | number;
  date: string;
  status: string;
  items: OrderProduct[];
  loading?: boolean;
  sellerProductIds: number[];
}
const OrdersTableRow: React.FC<OrdersTableRowProps> = ({
  orderId,
  date,
  status,
  items,
  loading,
  sellerProductIds,
}) => {
  const onlySellerProductInOrder = items.filter((product) => {
    return sellerProductIds.includes(product.productId);
  });
  const { date: tarikh } = dateFormat(date);

  return (
    <>
      {loading ? (
        <OrderTableSkeleton />
      ) : (
        <TableRow className={styles.order__tableRow}>
          <TableCell
            className={styles.order__tableCell}
            component="td"
            scope="row"
          >
            <Typography className={styles.order__orderId}>
              #{orderId}
            </Typography>
          </TableCell>

          <TableCell
            component="td"
            scope="row"
            className={styles.order__tableCell}
          >
            <Typography className={styles.order__date}>{tarikh}</Typography>
          </TableCell>

          <TableCell
            component="td"
            scope="row"
            className={styles.order__tableCell}
          >
            <Box className={styles.order__images}>
              {onlySellerProductInOrder.map((item, index) => (
                <Image
                  key={index}
                  className={styles.order__productImage}
                  width={60}
                  height={60}
                  src={item.imgSrc}
                  alt={item.altText ? item.altText : "product image"}
                />
              ))}
            </Box>
          </TableCell>

          <TableCell
            component="td"
            scope="row"
            className={styles.order__tableCell}
          >
            <OrderStatus status={status} />
          </TableCell>

          <TableCell
            component="td"
            scope="row"
            className={styles.order__tableCell}
          >
            <Link href={`/sales-dashboard/orders/order-details/${orderId}`}>
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
                text="Manage"
              />
            </Link>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default OrdersTableRow;
