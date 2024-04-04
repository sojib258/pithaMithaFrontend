import Pagination from "@/components/molecules/pagination/Pagination";
import RecentOrder from "@/components/organisms/recentOrder/RecentOrder";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./orderHistory.module.scss";
const OrderHistory = () => {
  const orders = [
    {
      id: 1,
      orderId: "443",
      date: "11 November, 2023",
      total: 343.34,
      status: "Processing",
    },
    {
      id: 2,
      orderId: "990",
      date: "8 Sep, 2023",
      total: 343.34,
      status: "On the Way",
    },
    {
      id: 3,
      orderId: "990",
      date: "8 Sep, 2023",
      total: 343.34,
      status: "Completed",
    },
    {
      id: 4,
      orderId: "443",
      date: "11 November, 2023",
      total: 343.34,
      status: "Processing",
    },
    {
      id: 5,
      orderId: "990",
      date: "8 Sep, 2023",
      total: 343.34,
      status: "On the Way",
    },
    {
      id: 6,
      orderId: "990",
      date: "8 Sep, 2023",
      total: 343.34,
      status: "Completed",
    },
  ];
  return (
    <Box className={styles.history}>
      <Box className={styles.history__orderTable}>
        <Typography className={styles.history__text}>Order History</Typography>
        <RecentOrder orderData={orders} />
      </Box>

      <Box className={styles.history__orderPagination}>
        <Pagination count={3} />
      </Box>
    </Box>
  );
};

export default OrderHistory;
