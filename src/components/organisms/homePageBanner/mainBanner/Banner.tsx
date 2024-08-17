import Button from "@/components/atoms/button/Button";
import { bannerData } from "@/utils/typesDefine/bannerDataTypes";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import styles from "./banner.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const Banner = async () => {
  const bannerData = await axios.get(`${API_URL}/banners/1?populate=image`);

  const mainData: bannerData = bannerData.data.data;
  const { heading, image, para, sellText, sellDiscount, welcome } =
    mainData.attributes;

  return (
    <>
      <Box className={styles.banner}>
        <Grid container>
          <Grid className={styles.banner__leftContentGrid} item xs={12} sm={7}>
            <Box className={styles.banner__leftContent}>
              <Typography className={styles.banner__welcome}>
                {welcome}
              </Typography>
              <Typography variant="h2" className={styles.banner__title}>
                {heading}
              </Typography>
              <Typography className={styles.banner__sale}>
                {`${sellText} `}
                <Typography
                  component={"span"}
                  className={styles.banner__saleDiscount}
                >
                  {sellDiscount}
                </Typography>
              </Typography>

              <Typography className={styles.banner__description}>
                {para}
              </Typography>
              <Box>
                <Link href={"/products"}>
                  <Button arrowIcon text="Shop Now" />
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box className={styles.banner__rightContent}>
              <Image
                className={styles.banner__Img}
                width={800}
                height={800}
                src={image.data.attributes.url}
                alt="Banner Image"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Banner;
