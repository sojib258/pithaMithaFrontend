import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Rating from "../ratings/Rating";
import styles from "./testimonialCart.module.scss";
interface testimonialProps {
  msg: string;
  name: string;
  jobTitle: string;
  rating: number;
  imgSrc: string;
}
const TestimonialCart: React.FC<testimonialProps> = ({
  imgSrc,
  msg,
  name,
  jobTitle,
  rating,
}) => {
  const { downMdScreen, downSmScreen } = useResponsive();
  return (
    <Stack
      direction={"column"}
      alignItems={"flex-start"}
      className={`${styles.testimonialCart} ${
        downMdScreen && styles.testimonialCart__downMdScreen
      }
        `}
    >
      <Box className={styles.testimonialCart__icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="26"
          viewBox="0 0 32 26"
          fill="none"
        >
          <path
            opacity="0.3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.8222 0C20.4357 0 17.6851 2.65696 17.6851 5.9336C17.6851 9.20821 20.4357 11.8672 23.8222 11.8672C29.6404 11.8672 26.2689 22.171 18.931 23.2443C18.5848 23.2936 18.2688 23.4578 18.0403 23.7071C17.8117 23.9563 17.6857 24.2742 17.6851 24.6032C17.6851 25.4456 18.487 26.1119 19.3751 25.9843C32.7122 24.0847 37.4546 0.00202497 23.8222 0.00202497V0ZM6.13933 0C2.74847 0 0 2.65493 0 5.9336C0 9.20619 2.74847 11.8631 6.13933 11.8631C11.9553 11.8631 8.58385 22.171 1.24597 23.2443C0.900119 23.2936 0.58443 23.4575 0.355931 23.7063C0.127431 23.9551 0.00118682 24.2725 0 24.6011C0 25.4436 0.801907 26.1098 1.68788 25.9823C15.0293 24.0827 19.7717 0 6.13933 0Z"
            fill="#00B307"
          />
        </svg>
      </Box>
      <Typography className={styles.testimonialCart__text}>{msg}</Typography>
      <Stack
        direction={{ xs: "row", md: "column", lg: "row" }}
        justifyContent={"space-between"}
        alignItems={{
          xs: "center",
          md: "flex-start",
          lg: "center",
        }}
        className={styles.testimonialCart__footer}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{ mb: { xs: 0, md: 2, lg: 0 } }}
        >
          <Image
            className={styles.testimonialCart__avatar}
            width={55}
            height={55}
            src={imgSrc}
            alt="Client Image"
          />
          <Box>
            <Typography className={styles.testimonialCart__name}>
              {name}
            </Typography>
            <Typography className={styles.testimonialCart__jobTitle}>
              {jobTitle}
            </Typography>
          </Box>
        </Stack>
        <Box>
          <Rating
            fontSize={downSmScreen ? "15px!important" : "20px!important"}
            value={rating}
            readOnly
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default TestimonialCart;
