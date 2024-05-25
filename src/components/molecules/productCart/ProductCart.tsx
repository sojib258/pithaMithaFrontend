"use client";
import Button from "@/components/atoms/button/Button";
import ToasterMsg from "@/components/atoms/toastMsg/Toaster";
import QuickViewDialog from "@/components/organisms/quickView/QuickViewDialog";
import useResponsive from "@/hooks/useResponsive";
import {
  addToCart,
  handleAlreadyExistInCart,
} from "@/store/feature/cart/CartSlice";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../atoms/ratings/Rating";
import ProductIcon from "../productCartIcons/ProductIcons";
import styles from "./productCart.module.scss";

interface Image {
  id: number;
  width: number;
  height: number;
  url: string;
  alternativeText?: string | undefined;
}

interface productProps {
  id: number;
  images: Image[];
  name: string;
  price: number;
  discountPrice?: number;
  averageRating?: number;
  description: string;
  shortDescription: string;
  category?: string;
  isServiceAvailable: boolean;
  href: string;
  weight: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const ProductCart: React.FC<productProps> = ({
  id,
  images,
  price,
  discountPrice,
  name,
  averageRating,
  description,
  shortDescription,
  category,
  isServiceAvailable,
  href,
  weight,
}) => {
  const { downMdScreen, downSmScreen } = useResponsive();
  const { cart, auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const isAuthenticated = auth.isAuthenticated;
  const carts = cart.items;

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const toastId = toast.loading("Adding to Cart...");
      setLoading(true);
      const checkProductAlreadyExist = carts.findIndex(
        (item: any) => item.productId === id
      );

      if (checkProductAlreadyExist === -1) {
        dispatch(
          addToCart({
            productId: id,
            title: name,
            imgSrc: images[0].url,
            altText: images[0].alternativeText,
            quantity: 1,
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
            productId: id,
            quantity: 1,
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

  return (
    <>
      <Box className={styles.productCart}>
        <Box className={styles.productCart__header}>
          <Image
            width={210}
            height={210}
            src={images[0].url}
            alt={
              images[0].alternativeText
                ? images[0].alternativeText
                : "Product Image"
            }
            className={styles.productCart__image}
          />

          {/* For Hover Overlay */}
          <Box className={styles.productCart__overlay}>
            <Box className={styles.productCart__hoverIcon}>
              <ProductIcon
                id={id}
                title={name}
                imgSrc={images[0].url}
                price={price}
                discountPrice={discountPrice}
                isServiceAvailable={isServiceAvailable}
                altText={images[0].alternativeText}
                handleOpen={handleOpen}
              />
            </Box>
          </Box>
        </Box>

        <Link className={styles.productCart__link} href={href}>
          <Box className={styles.productCart__content}>
            <Typography className={styles.productCart__title}>
              {name}
            </Typography>
            <Box mb={1}>
              <Rating
                fontSize={downSmScreen ? "15px!important" : "18px!important"}
                value={averageRating}
                readOnly
              />
            </Box>
            <Typography className={styles.productCart__amount}>
              (2 kg)
            </Typography>
          </Box>
        </Link>

        <Box className={styles.productCart__footer} sx={{ marginTop: "auto" }}>
          <Box sx={{ display: "flex" }}>
            {discountPrice ? (
              <>
                <Typography className={styles.productCart__discountPrice}>
                  <Typography
                    component={"span"}
                    className={styles.productCart__currencyIcon}
                  >
                    &#2547;
                  </Typography>
                  {discountPrice}
                </Typography>
                <Typography
                  component={"span"}
                  className={styles.productCart__priceCondition}
                >
                  {price}
                </Typography>
              </>
            ) : (
              <Typography className={styles.productCart__price}>
                <Typography
                  component={"span"}
                  className={styles.productCart__currencyIcon}
                >
                  &#2547;
                </Typography>
                {price}
              </Typography>
            )}
          </Box>
          <Button
            customStyle={{
              fontSize: "12px",
              padding: "5px 10px",
            }}
            plusIcon
            text="Add"
            onClick={handleAddToCart}
          />
        </Box>
      </Box>
      {open && (
        <QuickViewDialog
          id={id}
          description={shortDescription}
          price={price}
          discountPrice={discountPrice}
          productTitle={name}
          ratingValue={averageRating}
          category={category}
          handleClose={handleClose}
          open={open}
          images={images}
          isServiceAvailable={isServiceAvailable}
        />
      )}
      <ToasterMsg />
    </>
  );
};

export default ProductCart;
