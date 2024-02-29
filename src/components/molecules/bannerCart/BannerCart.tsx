import Button from "@/components/atoms/button/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./bannerCart.module.scss";
interface BannerCartProps {
  subhead: string;
  head: string;
  text: string;
  price: string | number;
  imgSrc: string;
}

const BannerCart: React.FC<BannerCartProps> = ({
  subhead,
  head,
  text,
  price,
  imgSrc,
}) => {
  return (
    <>
      <Box
        className={styles.bannerCart}
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3)), url(${imgSrc})`,
        }}
      >
        <Box className={styles.bannerCart__contents}>
          <Typography className={styles.bannerCart__subhead} variant="h6">
            {subhead}
          </Typography>
          <Typography className={styles.bannerCart__headText} variant="h2">
            {head}
          </Typography>
          <Typography className={styles.bannerCart__text} variant="body1">
            {`${text} `}
            <Typography className={styles.bannerCart__price} component={"span"}>
              &#2547;{price}
            </Typography>
          </Typography>
          <Button
            customStyle={{ borderRadius: "25px!important" }}
            text="Shop Now"
            arrowIcon
          />
        </Box>
      </Box>
    </>
  );
};

export default BannerCart;
