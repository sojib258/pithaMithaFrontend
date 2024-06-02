"use client";
import TableSkeleton from "@/components/molecules/skeleton/table/TableSkeleton";
import { fetchOrders } from "@/store/feature/order/OrderSlice";
import { fetchSellerProduct } from "@/store/feature/sellerProduct/SellerProductSlice";
import { RootState } from "@/store/store";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersTableRow from "./OrdersTableRow";
import styles from "./ordersTable.module.scss";

const OrdersTable = () => {
  const { sellerProduct, orders } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const { items: sellterProductItems, loading } = sellerProduct;
  const sellerProductIds = sellterProductItems.map((product) => product.id);

  const filteredOrders = orders.items.filter((order) =>
    order.products.some((product) =>
      sellerProductIds.includes(product.productId)
    )
  );

  useEffect(() => {
    dispatch(fetchSellerProduct() as any);
    dispatch(fetchOrders() as any);
  }, [dispatch]);

  return (
    <Box className={styles.order}>
      {loading ? (
        <TableSkeleton />
      ) : filteredOrders.length > 0 ? (
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
              {filteredOrders.map((item) => (
                <OrdersTableRow
                  key={item.id}
                  orderId={item.id}
                  date={item.createdAt}
                  status={item.status}
                  items={item.products}
                  sellerProductIds={sellerProductIds}
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
