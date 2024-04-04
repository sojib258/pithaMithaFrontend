import Button from "@/components/atoms/button/Button";
import AddressInfo from "@/components/molecules/addressInfo/AddressInfo";
import Profile from "@/components/molecules/profile/Profile";
import RecentOrder from "@/components/organisms/recentOrder/RecentOrder";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import styles from "./dashboard.module.scss";
const Dashboard = () => {
  const dataFromBackend = [
    {
      id: 1,
      name: "Sajib Hasan",
      number: "01720046642",
      address:
        "House 83/3, Madartek Road, Madartek Kachabazar, Madartek Chowrasta",
      area: "Barguna Amtoli",
      city: "Barguna",
      division: "Barishal",
      deliveryOption: "home",
      landmark: "Beside big jame masjid",
    },
    {
      id: 2,
      name: "Sajib Hasan",
      number: "01720046642",
      address:
        "House 83/3, Madartek Road, Madartek Kachabazar, Madartek Chowrasta",
      area: "Barguna Amtoli",
      city: "Barguna",
      division: "Barishal",
      deliveryOption: "office",
      landmark: "Beside big jame masjid",
    },
  ];

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
  ];

  const profileInfo = {
    name: "Sojib Hasan",
    imgSrc: "/img/6.jpg",
    position: "customer",
  };
  const { name, imgSrc, position } = profileInfo;
  return (
    <Box className={styles.content}>
      <Box className={styles.content__profile}>
        <Profile name={name} imgSrc={imgSrc} position={position} />
      </Box>
      <Box className={styles.content__address}>
        <AddressInfo addressData={dataFromBackend} />
      </Box>
      <Box className={styles.content__order}>
        <Box className={styles.content__orderHead}>
          <Typography className={styles.content__orderText}>
            Recent Order History
          </Typography>
          <Link href={"/dashboard/order-history"}>
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
        <RecentOrder orderData={orders} />
      </Box>
    </Box>
  );
};

export default Dashboard;
