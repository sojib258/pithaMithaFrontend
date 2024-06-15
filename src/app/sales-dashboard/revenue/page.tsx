"use client";
import StatusCart from "@/components/molecules/OrderStatusCart/StatusCart";
import { RootState } from "@/store/store";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";

const Page = () => {
  const dispatch = useDispatch();
  const { orders, auth } = useSelector((state: RootState) => state);

  const { items: orderItems, loading } = orders;

  // Filter orders for the specific seller
  const sellerOrders = orderItems.filter((order) =>
    order.sellers.some((seller) => seller.userId === auth.userId)
  );

  // Calculate completed orders for the specific seller
  const completedOrders = sellerOrders.filter((order) =>
    order.sellers.some(
      (seller) => seller.userId === auth.userId && seller.status === "delivered"
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

  const commision = (totalRevenue / 100) * 10;
  const actualEarned = totalRevenue - commision;

  let statusArr = [
    {
      id: 1,
      icon: <ShoppingCartOutlinedIcon sx={{ marginRight: "5px" }} />,
      title: "Total Sales",
      amount: completedOrders,
      style: {
        backgroundColor: "#fff4d0",
      },
      currencyIcon: false,
      link: "/sales-dashboard/orders/completed-orders",
    },
    {
      id: 2,
      icon: <MonetizationOnOutlinedIcon sx={{ marginRight: "5px" }} />,
      title: "Total Earnings",
      amount: totalRevenue.toFixed(2),
      style: {
        backgroundColor: "#d0fffe",
      },
      currencyIcon: true,
      link: "/sales-dashboard/revenue",
    },

    {
      id: 3,
      icon: <MoneyOffIcon sx={{ marginRight: "5px" }} />,
      title: "Commission",
      amount: commision.toFixed(2),
      style: {
        backgroundColor: "#ffd9d1",
      },
      currencyIcon: true,
      link: "/sales-dashboard/revenue",
    },
    {
      id: 4,
      icon: <MonetizationOnOutlinedIcon sx={{ marginRight: "5px" }} />,
      title: "Actual Earned",
      amount: actualEarned.toFixed(2),
      style: {
        backgroundColor: "#d1ffd1",
      },
      currencyIcon: true,
      link: "/sales-dashboard/revenue",
    },
  ];
  return (
    <Box className={styles.revenue}>
      <Box className={styles.revenue__statusArea}>
        <Grid container>
          {statusArr.map((item, index) => (
            <Grid item xs={12} md={6} lg={3} key={item.id}>
              <Box
                className={`${styles.revenue__statusCart} ${
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

export default Page;
