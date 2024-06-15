"use client";
import Button from "@/components/atoms/button/Button";
import AddressInfo from "@/components/molecules/addressInfo/AddressInfo";
import Profile from "@/components/molecules/profile/Profile";
import TableSkeleton from "@/components/molecules/skeleton/table/TableSkeleton";
import RecentOrder from "@/components/organisms/recentOrder/RecentOrder";
import { RootState } from "@/store/store";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user: userData, auth } = useSelector((state: RootState) => state);
  const [orderDetails, setOrderDetails] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const { userId, isAuthenticated, token } = auth;

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

  return (
    <Box className={styles.content}>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <Box className={styles.content__address}>
            <AddressInfo />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box className={styles.content__profile}>
            <Profile userData={userData} />
          </Box>
        </Grid>
      </Grid>

      <Box className={styles.content__order}>
        <Box className={styles.content__orderHead}>
          <Typography className={styles.content__orderText}>
            Recent Order History
          </Typography>
          <Link href={"/order-history"}>
            <Button
              sx={{
                backgroundColor: "transparent!important",
                boxShadow: "none",
                color: "#00b207!important",
                padding: "0px!important",
                fontSize: "1rem!important",
                "&:hover": {
                  textDecoration: "underline",
                  boxShadow: "none!important",
                },
              }}
              text="View All"
            />
          </Link>
        </Box>
        {loading ? (
          <TableSkeleton />
        ) : orderDetails.length > 0 ? (
          <RecentOrder loading={loading} orderDetails={orderDetails} />
        ) : (
          <Typography className={styles.content__nothing}>
            You don&apos;t have any recent orders right now.😊😊
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
