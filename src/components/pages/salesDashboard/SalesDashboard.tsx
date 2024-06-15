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
  const { sellerProduct, orders, auth } = useSelector(
    (state: RootState) => state
  );

  const { items: sellerProductItems, loading } = sellerProduct;
  const totalSellerProduct = sellerProductItems.length;

  // Filter orders for the specific seller
  const sellerOrders = orders.items.filter((order) =>
    order.sellers.some((seller) => seller.userId === auth.userId)
  );

  // Calculate completed orders for the specific seller
  const completedOrders = sellerOrders.filter((order) =>
    order.sellers.some(
      (seller) => seller.userId === auth.userId && seller.status === "delivered"
    )
  ).length;

  // Calculate pending orders for the specific seller
  const pendingOrders = sellerOrders.filter((order) =>
    order.sellers.some(
      (seller) => seller.userId === auth.userId && seller.status !== "delivered"
    )
  ).length;

  const totalRevenue = sellerOrders.reduce((acc, order) => {
    const seller = order.sellers.find(
      (seller) => seller.userId === auth.userId && seller.status === "delivered"
    );
    if (seller) {
      const sellerRevenue = seller.products.reduce((sum, product) => {
        const priceToUse = product.discountPrice
          ? product.discountPrice
          : product.price;
        return sum + priceToUse * product.quantity;
      }, 0);
      return acc + sellerRevenue;
    }
    return acc;
  }, 0);

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
      link: "/sales-dashboard/orders/completed-orders",
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
      link: "/sales-dashboard/orders/pending-orders",
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
            <Grid item xs={12} md={6} lg={3} key={item.id}>
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
                  loading={loading}
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
