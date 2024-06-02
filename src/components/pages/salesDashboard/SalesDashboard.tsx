"use client";
import StatusCart from "@/components/molecules/OrderStatusCart/StatusCart";
import { fetchOrders } from "@/store/feature/order/OrderSlice";
import { fetchSellerProduct } from "@/store/feature/sellerProduct/SellerProductSlice";
import { RootState } from "@/store/store";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
const SalesDashboard = () => {
  const dispatch = useDispatch();
  const { sellerProduct, orders } = useSelector((state: RootState) => state);

  const sellerProductIds = sellerProduct.items.map((product) => product.id);
  const totalSellerProduct = sellerProduct.items.length;

  const filteredOrders = orders.items.filter((order) =>
    order.products.some((product) =>
      sellerProductIds.includes(product.productId)
    )
  );

  const completedOrders = filteredOrders.filter(
    (order) => order.status.toLowerCase() === "delivered"
  ).length;
  const pendingOrders = filteredOrders.filter(
    (order) => order.status.toLowerCase() !== "delivered"
  ).length;
  const totalRevenue = filteredOrders
    .filter((order) => order.status.toLowerCase() === "delivered")
    .reduce((acc, order) => acc + order.totalPrice, 0);

  let statusArr = [
    {
      id: 1,
      icon: <ShoppingCartOutlinedIcon sx={{ marginRight: "5px" }} />,
      title: "Total Products",
      amount: totalSellerProduct,
      style: {
        backgroundColor: "#fff4d0",
      },
      currencyIcon: false,
      link: "/sales-dashboard/product",
    },
    {
      id: 2,
      icon: <WorkOutlineIcon sx={{ marginRight: "5px" }} />,
      title: "Completed Orders",
      amount: completedOrders,
      style: {
        backgroundColor: "#d0fffe",
      },
      currencyIcon: false,
      link: "/sales-dashboard/completed-orders",
    },
    {
      id: 3,
      icon: <WorkOutlineIcon sx={{ marginRight: "5px" }} />,
      title: "Pending Orders",
      amount: pendingOrders,
      style: {
        backgroundColor: "#ffd9d1",
      },
      currencyIcon: false,
      link: "/sales-dashboard/pending-orders",
    },
    {
      id: 4,
      icon: <MonetizationOnOutlinedIcon sx={{ marginRight: "5px" }} />,
      title: "Total Revenue",
      amount: totalRevenue,
      style: {
        backgroundColor: "#d1ffd1",
      },
      currencyIcon: true,
      link: "/sales-dashboard/revenue",
    },
  ];

  useEffect(() => {
    dispatch(fetchSellerProduct() as any);
    dispatch(fetchOrders() as any);
  }, [dispatch]);

  return (
    <Box className={styles.dashboard}>
      <Box className={styles.dashboard__statusArea}>
        <Grid container>
          {statusArr.map((item, index) => (
            <Grid item xs={12} sm={3} key={item.id}>
              <Box
                className={`${styles.dashboard__statusCart} ${
                  index === statusArr.length - 1 ? styles.last : ""
                }`}
              >
                <StatusCart
                  icon={item.icon}
                  title={item.title}
                  amount={item.amount}
                  style={item.style}
                  currencyIcon={item.currencyIcon}
                  link={item.link}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SalesDashboard;
