"use client";
import Pagination from "@/components/molecules/pagination/Pagination";
import TableSkeleton from "@/components/molecules/skeleton/table/TableSkeleton";
import RecentOrder from "@/components/organisms/recentOrder/RecentOrder";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./orderHistory.module.scss";
const OrderHistory = () => {
  const { auth } = useSelector((state: RootState) => state);
  const [orderDetails, setOrderDetails] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const { userId, token } = auth;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/orders?filters[users_permissions_user]=${userId}`,
          { headers }
        );

        setOrderDetails(
          response.data.data.map((item: any) => ({
            id: item.id,
            status: item.attributes.rootStatus,
            paid: item.attributes.paid,
            totalPrice: item.attributes.totalPrice,
            date: item.attributes.createdAt,
            images: item.attributes.sellers.reduce((acc: any, seller: any) => {
              const imgSrc = seller.products.map((product: any) => ({
                imgSrc: product.imgSrc,
                altText: product?.altText,
              }));
              return acc.concat(imgSrc);
            }, []),
          }))
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, [token, userId]);

  console.log("OrderDet", orderDetails);
  return (
    <Box className={styles.history}>
      <Box className={styles.history__orderTable}>
        <Typography className={styles.history__text}>Order History</Typography>
        {loading ? (
          <TableSkeleton />
        ) : orderDetails.length > 0 ? (
          <RecentOrder loading={loading} orderDetails={orderDetails} />
        ) : (
          <Typography className={styles.content__nothing}>
            You don&apos;t have any orders right now.😊😊
          </Typography>
        )}
      </Box>

      <Box className={styles.history__orderPagination}>
        <Pagination count={3} />
      </Box>
    </Box>
  );
};

export default OrderHistory;
