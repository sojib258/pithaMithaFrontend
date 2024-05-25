"use client";
import Button from "@/components/atoms/button/Button";
import Rating from "@/components/atoms/ratings/Rating";
import Stock from "@/components/atoms/stockStatus/Stock";
import ToasterMsg from "@/components/atoms/toastMsg/Toaster";
import Quantity from "@/components/molecules/addQuantity/Quantity";
import SocialIcon from "@/components/molecules/socialIcons/SocialIcon";
import useResponsive from "@/hooks/useResponsive";
import {
  addToCart,
  handleAlreadyExistInCart,
} from "@/store/feature/cart/CartSlice";
import {
  addToWishList,
  removeWishlist,
} from "@/store/feature/wishlist/WishlistSlice";
import { RootState } from "@/store/store";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import QuickViewSlider from "./QuickViewSlider";
import styles from "./quickView.module.scss";
interface Image {
  id: number;
  width: number;
  height: number;
  url: string;
  alternativeText?: string | undefined;
}

interface quickViewProps {
  id: number;
  discountPrice?: number;
  price: number;
  productTitle: string;
  description?: string;
  ratingValue?: number;
  category?: string;
  images: Image[];
  customStyle?: object;
  isServiceAvailable: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const QuickView: React.FC<quickViewProps> = ({
  id: productId,
  price,
  productTitle,
  description,
  ratingValue,
  category,
  discountPrice,
  images,
  customStyle,
  isServiceAvailable,
}) => {
  const { auth, cart, wishlist } = useSelector((state: RootState) => state);
  const [imgSrc, setImgSrc] = useState(images[0].url);
  const { downSmScreen, downMdScreen, mediumToLarge } = useResponsive();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated, userId, token } = auth;
  const { items: cartItems } = cart;
  const { items: wishlistItems } = wishlist;
  const { alternativeText } = images[0];

  const discount = discountPrice
    ? Math.floor(((price - discountPrice) / price) * 100)
    : null;

  const handleImgSrc = (url: string) => {
    setImgSrc(url);
  };

  const handleQuantity = (value: number) => {
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const toastId = toast.loading("Adding to Cart...");
      setLoading(true);
      const checkProductAlreadyExist = cartItems.findIndex(
        (item: any) => item.productId === productId
      );

      if (checkProductAlreadyExist === -1) {
        dispatch(
          addToCart({
            productId: productId,
            title: productTitle,
            imgSrc: imgSrc,
            altText: alternativeText,
            quantity: quantity,
            price: price,
            isServiceAvailable: isServiceAvailable,
            discountPrice: discountPrice,
          })
        );
        toast.success("Added to Cart", {
          id: toastId,
        });
        setLoading(false);
      } else {
        dispatch(
          handleAlreadyExistInCart({
            productId: productId,
            quantity: quantity,
          })
        );
        toast.success("Added to Cart", {
          id: toastId,
        });

        setLoading(false);
      }
    } else {
      toast.error("You have to login first for adding to cart");
      router.push("/login");
      return;
    }
  };

  const existInWishlist = wishlistItems.findIndex(
    (item: any) => item.productId === productId
  );

  const handleAddToWishlist = () => {
    if (isAuthenticated) {
      const toastId = toast.loading("Adding to Wishlist...");
      setLoading(true);

      if (existInWishlist === -1) {
        dispatch(
          addToWishList({
            productId: productId,
            imgSrc: imgSrc,
            price: price,
            discountPrice: discountPrice,
            altText: alternativeText,
            isServiceAvailable: isServiceAvailable,
            title: productTitle,
          })
        );
        toast.success("Added to Wishlist", {
          id: toastId,
        });
        setLoading(false);
      } else {
        dispatch(
          removeWishlist({
            productId: productId,
          })
        );
        toast.success("Remove from Wishlist", {
          id: toastId,
        });
        setLoading(false);
      }
    } else {
      toast.error("You have to login first for adding to cart");
      router.push("/login");
      return;
    }
  };

  return (
    <>
      <Grid
        spacing={2}
        container
        className={`${styles.quickView} ${
          mediumToLarge && styles.quickView__mdToLg_screen
        } ${downSmScreen && styles.quickView__downSmallScreen}
            ${downMdScreen && styles.quickView__downMediumScreen} quickView`}
        style={customStyle}
      >
        {/* Left Slider Section */}
        <Grid item xs={12} md={6} className={styles.quickView__leftContent}>
          <QuickViewSlider loading={loading} imageSrc={imgSrc} />
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
            <Stock
              customStyle={{ marginLeft: "6px" }}
              isServiceAvailable={isServiceAvailable}
            />
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
            <Quantity
              sx={{ padding: "8px!important" }}
              quantityValue={quantity}
              updateQuantity={handleQuantity}
            />

            {/* Product Add Cart Button Action */}
            <Button
              disabled={loading}
              sx={{
                padding: "8px 12px!important",
                width: "100%",
                margin: "0px 10px",
              }}
              text="Add to Cart"
              cartIcon={!downSmScreen ? true : false}
              onClick={handleAddToCart}
            />

            {/* Product Add Wishlist Button Action */}

            {existInWishlist === -1 ? (
              <IconButton
                onClick={handleAddToWishlist}
                className={styles.quickView__wishListIcon}
              >
                <Tooltip title="Add Wishlist" arrow>
                  <FavoriteBorderOutlinedIcon />
                </Tooltip>
              </IconButton>
            ) : (
              <IconButton
                onClick={handleAddToWishlist}
                className={styles.quickView__wishListIcon}
              >
                <Tooltip title="Remove Wishlist" arrow>
                  <FavoriteOutlinedIcon />
                </Tooltip>
              </IconButton>
            )}
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
      <ToasterMsg />
    </>
  );
};

export default QuickView;
