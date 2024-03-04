"use client";
import Button from "@/components/atoms/button/Button";
import QuickViewDialog from "@/components/organisms/quickView/QuickViewDialog";
import useResponsive from "@/hooks/useResponsive";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Rating from "../../atoms/ratings/Rating";
import ProductIcon from "../productCartIcons/ProductIcons";
import styles from "./productCart.module.scss";

interface Image {
  id: string | number;
  width: number;
  height: number;
  url: string;
  alternativeText?: string | undefined;
}

interface productProps {
  id: string | number;
  images: Image[];
  title: string;
  price: number;
  discountPrice?: number;
  ratingValue?: number;
  description?: string;
  category?: string;
}

const ProductCart: React.FC<productProps> = ({
  id,
  images,
  price,
  discountPrice,
  title,
  ratingValue,
  description,
  category,
}) => {
  const { downMdScreen, downSmScreen } = useResponsive();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        className={`${styles.productCart} ${
          downMdScreen && styles.productCart__mdScreen
        }`}
      >
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
              <ProductIcon handleOpen={handleOpen} />
            </Box>
          </Box>
        </Box>

        <Link className={styles.productCart__link} href={`/products/${id}`}>
          <Box className={styles.productCart__content}>
            <Typography className={styles.productCart__title}>
              {title}
            </Typography>
            <Box mb={1}>
              <Rating
                fontSize={downSmScreen ? "15px!important" : "18px!important"}
                value={ratingValue}
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
          />
        </Box>
      </Box>
      {open && (
        <QuickViewDialog
          description={description}
          price={price}
          discountPrice={discountPrice}
          productTitle={title}
          ratingValue={ratingValue}
          category={category}
          handleClose={handleClose}
          open={open}
          images={images}
        />
      )}
    </>
  );
};

export default ProductCart;
