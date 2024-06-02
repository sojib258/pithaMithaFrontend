"use client";
import Button from "@/components/atoms/button/Button";
import AddressInfo from "@/components/molecules/addressInfo/AddressInfo";
import Profile from "@/components/molecules/profile/Profile";
import RecentOrder from "@/components/organisms/recentOrder/RecentOrder";
import { fetchUserData } from "@/store/feature/user/UserSlice";
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
    dispatch(fetchUserData() as any);
  }, [dispatch, userId]);

  if (!isAuthenticated) {
    router.push("/login");
  }

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
            status: item.attributes.status,
            paid: item.attributes.paid,
            totalPrice: item.attributes.totalPrice,
            date: item.attributes.createdAt,
            totalProduct: item.attributes.products.length,
            imgSrc: item.attributes.products[0].imgSrc,
            altText: item.attributes.products[0].altText,
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
        <RecentOrder loading={loading} orderDetails={orderDetails} />
      </Box>
    </Box>
  );
};

export default Dashboard;
