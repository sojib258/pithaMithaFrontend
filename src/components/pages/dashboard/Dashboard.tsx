import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import styles from "./dashboard.module.scss";
const Dashboard = () => {
  return (
    <Box className={styles.content}>
      <Grid container>
        <Grid className={styles.content__gridItem} xs={12} md={7} item>
          <Box className={styles.content__profile}>
            <Image
              className={styles.content__userImage}
              width={100}
              height={100}
              alt={"profile image"}
              src={"/img/bg.png"}
            />
            <Typography className={styles.content__userName} variant="h2">
              Sojib Hasan
            </Typography>
            <Typography className={styles.content__userPosition}>
              Customer
            </Typography>
            <Button className={styles.content__userEditBtn}>
              Edit Profile
            </Button>
          </Box>
        </Grid>
        <Grid className={styles.content__gridItem} xs={12} md={5} item>
          <Box className={styles.content__address}>
            <Typography className={styles.content__billingText}>
              Billing Address
            </Typography>
            <Typography className={styles.content__addressUserName}>
              Sojib Hasan
            </Typography>
            <Typography className={styles.content__addressDescription}>
              4140 Parker Rd. Allentown, New Mexico 31134
            </Typography>
            <Typography className={styles.content__addressEmail}>
              sajib123@gmail.com
            </Typography>
            <Typography className={styles.content__addressNumber}>
              (671) 555-0110
            </Typography>
            <Button className={styles.content__addressEditBtn}>
              Edit Address
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
