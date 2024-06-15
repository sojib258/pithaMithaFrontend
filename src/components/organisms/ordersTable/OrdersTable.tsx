"use client";
import TableSkeleton from "@/components/molecules/skeleton/table/TableSkeleton";
import { Seller } from "@/utils/typesDefine/orderSliceTypes";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OrdersTableRow from "./OrdersTableRow";
import styles from "./ordersTable.module.scss";

interface OrdersTableProps {
  sellerOrders: {
    orderId: number;
    date: string;
    seller?: Seller;
  }[];
  loading?: boolean;
}
const OrdersTable: React.FC<OrdersTableProps> = ({ sellerOrders, loading }) => {
  return (
    <Box className={styles.order}>
      {loading ? (
        <TableSkeleton />
      ) : sellerOrders.length > 0 ? (
        <TableContainer
          className={styles.order__tableContainer}
          component={Paper}
        >
          <Table className={styles.order__table} aria-label="simple table">
            <TableHead className={styles.order__tableHead}>
              <TableRow
                className={styles.order__tableRow}
                sx={{ border: "1px solid #e6e6e6;" }}
              >
                <TableCell className={styles.order__tableCellTH}>
                  Order Id
                </TableCell>

                <TableCell className={styles.order__tableCellTH}>
                  Placed On
                </TableCell>
                <TableCell className={styles.order__tableCellTH}>
                  Items
                </TableCell>
                <TableCell className={styles.order__tableCellTH}>
                  Order Status
                </TableCell>
                <TableCell className={styles.order__tableCellTH}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellerOrders.map((order) => (
                <OrdersTableRow
                  key={order.orderId}
                  orderId={order.orderId}
                  date={order.date}
                  status={order.seller?.status || ""}
                  products={order.seller?.products || []}
                  loading={loading}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>You don&apos;t have any orders write now.😊😊</Typography>
      )}
    </Box>
  );
};

export default OrdersTable;
