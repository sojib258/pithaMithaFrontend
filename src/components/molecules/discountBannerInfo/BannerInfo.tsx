import Button from "@/components/atoms/button/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./bannerInfo.module.scss";
const BannerInfo = () => {
  return (
    <Box className={styles.info}>
      <Typography variant="h3" className={styles.info__offerName}>
        SUMMER SALE
      </Typography>
      <Typography variant="h2" className={styles.info__discount}>
        <Typography component={"span"} className={styles.info__percent}>
          38%
        </Typography>
        OFF
      </Typography>
      <Typography className={styles.info__description}>
        Free on all your order, Free Shipping and 30 days money-back guarantee
      </Typography>
      <Button
        customStyle={{ borderRadius: "30px!important" }}
        text="Shop Now"
        arrowIcon
      />
    </Box>
  );
};

export default BannerInfo;
