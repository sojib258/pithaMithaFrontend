"use client";
import Label from "@/components/atoms/label/Label";
import OrderStatus from "@/components/atoms/orderStatus/OrderStatus";
import OrderTableSkeleton from "@/components/molecules/skeleton/table/TableSkeleton";
import dateFormat from "@/utils/dateFormat";
import { Order } from "@/utils/typesDefine/orderSliceTypes";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import ActionButton from "./ActionButton";
import styles from "./orderDetailsTable.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;
interface OrderDetailsTableProps {
  orderData: Order;
  sellerProductIds: number[];
  token: string | null;
  loading: boolean;
  handleLoading: (value: boolean) => void;
  handleRender: () => void;
}

const OrderDetailsTable: React.FC<OrderDetailsTableProps> = ({
  orderData,
  sellerProductIds,
  token,
  loading,
  handleLoading,
  handleRender,
}) => {
  const { id, createdAt, paid, status, products } = orderData;
  const { date: tarikh } = dateFormat(createdAt);

  const onlySellerProductInOrder = products.filter((product) => {
    return sellerProductIds.includes(product.productId);
  });

  const subTotal = onlySellerProductInOrder.reduce((acc, cur) => {
    let price = cur.discountPrice ? cur.discountPrice : cur.price;
    let totalPrice = price * cur.quantity;
    return acc + totalPrice;
  }, 0);

  const handleUpdateOrderStatus = async (newStatus: string) => {
    try {
      handleLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const orderUpdatePromise = axios.put(
        `${API_URL}/orders/${id}`,
        {
          data: {
            status: newStatus,
          },
        },
        { headers }
      );
      toast.promise(
        orderUpdatePromise,
        {
          loading: "Updating Order Status...",
          success: "Order Status Update Completed",
          error: (error: any) => {
            return `${error?.response?.data?.error?.message}`;
          },
        },
        {
          error: {
            duration: 5000,
          },
        }
      );
      await orderUpdatePromise;
      handleLoading(false);
      handleRender();
    } catch (error) {
      console.error("Failed to update order status", error);
      handleLoading(false);
    }
  };

  return (
    <Box className={styles.order}>
      {loading ? (
        <OrderTableSkeleton />
      ) : (
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
                  Items
                </TableCell>

                <TableCell className={styles.order__tableCellTH}>
                  Subtotal
                </TableCell>
                <TableCell className={styles.order__tableCellTH}>
                  Order Status
                </TableCell>
                <TableCell className={styles.order__tableCellTH}>
                  Payment
                </TableCell>
                <TableCell className={styles.order__tableCellTH}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={styles.order__tableRow}>
                <TableCell
                  className={styles.order__tableCell}
                  component="td"
                  scope="row"
                >
                  <Typography className={styles.order__orderId}>
                    #{id}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Table>
                    <TableHead>
                      <TableCell className={styles.order__secondTableCellTH}>
                        Product
                      </TableCell>
                      <TableCell className={styles.order__secondTableCellTH}>
                        Price
                      </TableCell>
                      <TableCell className={styles.order__secondTableCellTH}>
                        Quantity
                      </TableCell>
                      <TableCell className={styles.order__secondTableCellTH}>
                        Total
                      </TableCell>
                    </TableHead>
                    <TableBody>
                      {onlySellerProductInOrder.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell
                            component="td"
                            scope="row"
                            className={styles.order__tableCell}
                          >
                            <Box className={styles.order__productImages}>
                              <Image
                                className={styles.order__productImage}
                                width={60}
                                height={60}
                                src={item.imgSrc}
                                alt={
                                  item.altText ? item.altText : "product image"
                                }
                              />
                              <Typography
                                className={styles.order__productTitle}
                              >
                                {item.title}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell
                            component="td"
                            scope="row"
                            className={styles.order__tableCell}
                          >
                            <Box className={styles.order__priceCell}>
                              <Image
                                width={40}
                                height={40}
                                src={"/icons/taka.png"}
                                alt="Taka Logo"
                                className={styles.order__currencyIcon}
                              />
                              <Typography
                                className={styles.order__totalPrice}
                                component={"span"}
                              >
                                {item.discountPrice
                                  ? item.discountPrice
                                  : item.price}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography className={styles.order__text}>
                              {item.quantity}
                            </Typography>
                          </TableCell>
                          <TableCell
                            component="td"
                            scope="row"
                            className={styles.order__tableCell}
                          >
                            <Box className={styles.order__priceCell}>
                              <Image
                                width={40}
                                height={40}
                                src={"/icons/taka.png"}
                                alt="Taka Logo"
                                className={styles.order__currencyIcon}
                              />
                              <Typography
                                className={styles.order__totalPrice}
                                component={"span"}
                              >
                                {(item.discountPrice
                                  ? item.discountPrice
                                  : item.price) * item.quantity}
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableCell>
                <TableCell
                  component="td"
                  scope="row"
                  className={styles.order__tableCell}
                >
                  <Box className={styles.order__priceCell}>
                    <Image
                      width={40}
                      height={40}
                      src={"/icons/taka.png"}
                      alt="Taka Logo"
                      className={styles.order__currencyIcon}
                    />
                    <Typography
                      className={styles.order__subTotal}
                      component={"span"}
                    >
                      {subTotal}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell
                  component="td"
                  scope="row"
                  className={styles.order__tableCell}
                >
                  {loading ? <Skeleton /> : <OrderStatus status={status} />}
                </TableCell>
                <TableCell
                  component="td"
                  scope="row"
                  className={styles.order__tableCell}
                >
                  <Typography className={styles.order__text}>
                    <Label
                      sx={{
                        backgroundColor: paid
                          ? "#d1ffd1;!important"
                          : "#fff8e6!important",
                        color: paid
                          ? "#006703;!important"
                          : "#ff8a00!important",
                      }}
                      text={paid ? "Paid" : "Not Paid"}
                    />
                  </Typography>
                </TableCell>
                <TableCell
                  component="td"
                  scope="row"
                  className={styles.order__tableCell}
                >
                  <ActionButton
                    handleOrderStatus={handleUpdateOrderStatus}
                    loading={loading}
                    status={status}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default OrderDetailsTable;
