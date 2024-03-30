"use client";
import Button from "@/components/atoms/button/Button";
import Rating from "@/components/atoms/ratings/Rating";
import Stock from "@/components/atoms/stockStatus/Stock";
import SocialIcon from "@/components/molecules/socialIcons/SocialIcon";
import useResponsive from "@/hooks/useResponsive";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import { useState } from "react";
import QuickViewSlider from "./QuickViewSlider";
import styles from "./quickView.module.scss";
interface Image {
  id: string | number;
  width: number;
  height: number;
  url: string;
  alternativeText?: string | undefined;
}

interface quickViewProps {
  discountPrice?: number;
  price: number;
  productTitle: string;
  description?: string;
  ratingValue?: number;
  category?: string;
  images: Image[];
  customStyle?: object;
}

const QuickView: React.FC<quickViewProps> = ({
  price,
  productTitle,
  description,
  ratingValue,
  category,
  discountPrice,
  images,
  customStyle,
}) => {
  const [imgSrc, setImgSrc] = useState(images[0].url);
  const theme = useTheme();
  const mdToLg = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const { downSmScreen, downMdScreen } = useResponsive();

  const discount = discountPrice
    ? Math.floor(((price - discountPrice) / price) * 100)
    : null;

  const handleImgSrc = (url: string) => {
    setImgSrc(url);
  };

  return (
    <>
      <Grid
        spacing={2}
        container
        className={`${styles.quickView} ${
          mdToLg && styles.quickView__mdToLg_screen
        } ${downSmScreen && styles.quickView__downSmallScreen}
            ${downMdScreen && styles.quickView__downMediumScreen} quickView`}
        style={customStyle}
      >
        {/* Left Slider Section */}
        <Grid item xs={12} md={6} className={styles.quickView__leftContent}>
          <QuickViewSlider imageSrc={imgSrc} />
          <Box className={styles.quickView__imagesWrapper}>
            {images.map((item) => (
              <Image
                key={item.id}
                width={100}
                height={100}
                src={item.url}
                alt={
                  item.alternativeText ? item.alternativeText : "product image"
                }
                onClick={() => handleImgSrc(item.url)}
                className={styles.quickView__images}
              />
            ))}
          </Box>
        </Grid>

        {/* Right Content Section */}
        <Grid xs={12} md={6} item className={styles.quickView__rightContent}>
          {/* Product Title */}
          <Typography className={styles.quickView__productTitle}>
            {productTitle}
          </Typography>

          {/* Rating Component */}
          <Stack
            direction={"row"}
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <Rating
              customStyle={{ maxWidth: "200px" }}
              value={ratingValue}
              reviewText={"Hello"}
              readOnly
            />
            <Stock customStyle={{ marginLeft: "6px" }} inStock />
          </Stack>

          {/* Price Area */}
          <Typography className={styles.quickView__prices}>
            {discountPrice ? (
              <>
                <Typography
                  className={styles.quickView__discountPrice}
                  component={"span"}
                >
                  &#2547; {discountPrice}
                </Typography>
                <Typography
                  className={styles.quickView__priceCondition}
                  component={"span"}
                >
                  {price}
                </Typography>
              </>
            ) : (
              <Typography
                className={styles.quickView__price}
                component={"span"}
              >
                &#2547; {price}
              </Typography>
            )}
            {discountPrice && (
              <Typography
                className={styles.quickView__discount}
                component={"span"}
              >
                {discount}% Off
              </Typography>
            )}
          </Typography>

          {/* Product Description Area */}
          <Typography className={styles.quickView__description}>
            {description}
          </Typography>

          {/* Product Actions Area */}
          <Box className={styles.quickView__cartButtonBox}>

            {/* Product Add Cart Button Action */}
            <Button
              customStyle={{
                width: "100%",
                margin: downSmScreen ? "18px 4px" : "18px 12px",
                padding: downSmScreen ? "4px 4px!important" : "10px",
                fontSize: downSmScreen ? "8px!important" : "14px",
                borderRadius: "25px",
              }}
              mediumScreen={mdToLg ? true : false}
              smallScreen={downSmScreen ? true : false}
              text="Add to Cart"
              cartIcon={!downSmScreen ? true : false}
            />

            {/* Product Add Wishlist Button Action */}
            <IconButton className={styles.quickView__wishListIcon}>
              <Tooltip title="Add Wishlist" arrow>
                <FavoriteBorderOutlinedIcon />
              </Tooltip>
            </IconButton>
          </Box>

          {/* Product Category Area */}
          <Typography className={styles.quickView__categoryTitle}>
            Category:{" "}
            <Typography
              component={"span"}
              className={styles.quickView__categoryValue}
            >
              {category}
            </Typography>
          </Typography>

          {/* Product Share Icons */}
          <Box className={styles.quickView__shareItems}>
            <Typography className={styles.quickView__shareText}>
              Share item:{" "}
            </Typography>
            <SocialIcon />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default QuickView;
