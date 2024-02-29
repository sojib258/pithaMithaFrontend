"use client";
import SocialIcon from "@/components/molecules/socialIcons/SocialIcon";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.scss";
const Footer = () => {
  const { smScreen, mdScreen, lgScreen } = useResponsive();
  const knowUs = ["Company", "About", "Blog", "Help Center", "Our Value"];
  const consumers = [
    "Payments",
    "Shipping",
    "Prduct Returns",
    "FAQ",
    "Shop Checkout",
  ];
  const seller = [
    "Seller Opportunities",
    "Become a Seller",
    "Earnings",
    "Ideas & Guides",
  ];
  const categories = [
    "Traditional Favorites",
    "Sweet Delicacies",
    "Steamed Goodness",
    "Fried Temptations",
    "Stuffed Varieties",
    "Regional Specialties",
    "Modern Twists",
  ];

  return (
    <Box component={"footer"} className={styles.footer}>
      <Grid spacing={0} container>
        <Grid item sm={8} md={6} lg={4}>
          <Box
            className={`${styles.footer__itemWrapper} ${styles.footer__itemOne}`}
          >
            <Image
              className={styles.footer__logoImg}
              width={250}
              height={40}
              src={"/icons/footerLogo.png"}
              alt="Logo Image"
            />
            <Typography className={styles.footer__description}>
              Discover a Pitha paradise - buy or sell these sweet delicacies.
              Join us at PithaMitha.com for delightful experiences in every
              bite.
            </Typography>
            <Box className={styles.footer__contact}>
              <Typography className={styles.footer__phone}>
                +8801720046642
              </Typography>
              <Typography component={"span"} className={styles.footer__or}>
                or
              </Typography>
              <Typography className={styles.footer__gmail}>
                sojibsrd85@gmail.com
              </Typography>
            </Box>
            <SocialIcon
              customStyle={{
                justifyContent: !smScreen ? "center" : "flex-start",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Box
            className={`${styles.footer__itemWrapper} ${styles.footer__itemTwo}`}
          >
            <Typography className={styles.footer__head}>
              Get to know us
            </Typography>
            <Box className={styles.footer__links} component={"ul"}>
              {knowUs.map((item, index) => (
                <Link
                  className={styles.footer__link}
                  key={index}
                  href={`/${item}`}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Box
            className={`${styles.footer__itemWrapper} ${styles.footer__itemThree}`}
          >
            <Typography className={styles.footer__head}>
              For Consumers
            </Typography>
            <Box className={styles.footer__links} component={"ul"}>
              {consumers.map((item, index) => (
                <Link
                  className={styles.footer__link}
                  key={index}
                  href={`/${item}`}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={6} lg={2}>
          <Box
            className={`${styles.footer__itemWrapper} ${styles.footer__itemFour}`}
          >
            <Typography className={styles.footer__head}>
              Become a Seller
            </Typography>
            <Box className={styles.footer__links} component={"ul"}>
              {seller.map((item, index) => (
                <Link
                  className={styles.footer__link}
                  key={index}
                  href={`/${item}`}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={6} lg={2}>
          <Box
            className={`${styles.footer__itemWrapper} ${styles.footer__itemFive}`}
          >
            <Typography className={styles.footer__head}>Categories</Typography>
            <Box className={styles.footer__links} component={"ul"}>
              {categories.map((item, index) => (
                <Link
                  className={styles.footer__link}
                  key={index}
                  href={`/${item}`}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
