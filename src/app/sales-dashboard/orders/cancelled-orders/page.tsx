"use client";
import TableSkeleton from "@/components/molecules/skeleton/table/TableSkeleton";
import OrdersTableRow from "@/components/organisms/ordersTable/OrdersTableRow";
import styles from "@/components/organisms/ordersTable/ordersTable.module.scss";
import { fetchOrders } from "@/store/feature/order/OrderSlice";
import { fetchSellerProduct } from "@/store/feature/sellerProduct/SellerProductSlice";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const { orders, auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const { items: orderItems, loading } = orders;

  const sellerOrders = orderItems
    .filter((order) =>
      order.sellers.some((seller) => seller.userId === auth.userId)
    )
    .map((order) => {
      const sellerInfo = order.sellers.find(
        (seller) => seller.userId === auth.userId
      );
      return {
        orderId: order.id,
        date: order.createdAt,
        rootStatus: order.rootStatus,
        seller: sellerInfo,
      };
    });

  // Calculate pending orders for the specific seller
  const cancelledOrders = sellerOrders.filter(
    (order) => order.rootStatus === "cancelled"
  );

  console.log("TTTTTTTTT", sellerOrders);
  console.log("CCCCCCCCC", cancelledOrders);

  useEffect(() => {
    dispatch(fetchSellerProduct() as any);
    dispatch(fetchOrders() as any);
  }, [dispatch]);

  return (
    <Box className={styles.order}>
      {loading ? (
        <TableSkeleton />
      ) : cancelledOrders.length > 0 ? (
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
              {cancelledOrders.map((order) => (
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
        <Typography>
          You don&apos;t have any cancelled orders write now.😊😊
        </Typography>
      )}
    </Box>
  );
};

export default Page;
