import BannerInfo from "@/components/molecules/discountBannerInfo/BannerInfo";
import Box from "@mui/material/Box";
import styles from "./discountBanner.module.scss";
const DiscountBanner = () => {
  const src = "/img/13.png";
  return (
    <Box
      sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(${src})`,
      }}
      className={styles.discountBanner}
    >
      <Box className={styles.discountBanner__content}>
        {" "}
        <BannerInfo />
      </Box>
    </Box>
  );
};

export default DiscountBanner;
