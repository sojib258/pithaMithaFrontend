"use client";
import StatusCart from "@/components/molecules/OrderStatusCart/StatusCart";
import { RootState } from "@/store/store";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import styles from "./style.module.scss";
const SalesDashboard = () => {
  const { sellerProduct } = useSelector((state: RootState) => state);
  let statusArr = [
    {
      id: 1,
      icon: <ShoppingCartOutlinedIcon sx={{ marginRight: "5px" }} />,
      title: "Total Products",
      amount: null,
      style: {
        backgroundColor: "#fff4d0",
      },
      currencyIcon: false,
    },
    {
      id: 2,
      icon: <WorkOutlineIcon sx={{ marginRight: "5px" }} />,
      title: "Completed Orders",
      amount: null,
      style: {
        backgroundColor: "#d0fffe",
      },
      currencyIcon: false,
    },
    {
      id: 3,
      icon: <WorkOutlineIcon sx={{ marginRight: "5px" }} />,
      title: "Pending Orders",
      amount: null,
      style: {
        backgroundColor: "#ffd9d1",
      },
      currencyIcon: false,
    },
    {
      id: 4,
      icon: <MonetizationOnOutlinedIcon sx={{ marginRight: "5px" }} />,
      title: "Total Revenue",
      amount: null,
      style: {
        backgroundColor: "#d1ffd1",
      },
      currencyIcon: true,
    },
  ];

  console.log("SellerProducts", sellerProduct);

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
