"use client";
// import { ImageData, Seller, Tag } from "@/utils/typesDefine/productSliceTypes";
import Button from "@/components/atoms/button/Button";
import QuickViewDialog from "@/components/organisms/quickView/QuickViewDialog";
import useResponsive from "@/hooks/useResponsive";
import { addToCart } from "@/store/feature/cart/CartSlice";
import { RootState } from "@/store/store";
import { ImageData, Seller, Tag } from "@/utils/typesDefine/productSliceTypes";
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

interface productProps {
  id: number;
  images: ImageData[];
  name: string;
  price: number;
  discountPrice?: number;
  averageRating?: number;
  description: string;
  shortDescription: string;
  category?: string;
  tags: Tag[];
  isServiceAvailable: boolean;
  href: string;
  weight: string;
  seller: Seller;
}

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const ProductCart: React.FC<productProps> = ({
  id,
  images,
  price,
  discountPrice,
  name,
  averageRating,
  shortDescription,
  category,
  isServiceAvailable,
  href,
  weight,
  seller,
  tags,
}) => {
  const { downSmScreen } = useResponsive();
  const { auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { firstName, lastName, averageResponseTime, responseTime, image } =
    seller.attributes;
  const { url, alternativeText } = images[0].attributes;

  const isAuthenticated = auth.isAuthenticated;

  const handleAddToCart = () => {
    if (isAuthenticated) {
      const toastId = toast.loading("Adding to Cart...");

      dispatch(
        addToCart({
          sellerId: seller.id,
          sellerImg: image?.attributes?.url,
          firstName: firstName,
          lastName: lastName,
          responseTime: responseTime,
          averageResponseTime: averageResponseTime,
          product: {
            productId: id,
            imgSrc: url,
            isServiceAvailable: isServiceAvailable,
            price: price,
            discountPrice: discountPrice,
            quantity: 1,
            title: name,
            altText: alternativeText,
          },
        })
      );
      toast.success("Added to Cart", {
        id: toastId,
      });
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
            src={url}
            alt={alternativeText ? alternativeText : "Product Image"}
            className={styles.productCart__image}
            // placeholder="blur"
          />
          {/* For Hover Overlay */}
          <Box className={styles.productCart__overlay}>
            <Box className={styles.productCart__hoverIcon}>
              <ProductIcon
                id={id}
                name={name}
                imgSrc={url}
                price={price}
                discountPrice={discountPrice}
                isServiceAvailable={isServiceAvailable}
                altText={alternativeText}
                handleOpen={handleOpen}
                seller={seller}
              />
            </Box>
          </Box>
        </Box>

        <Link className={styles.productCart__link} href={href}>
          <Box className={styles.productCart__content}>
            <Typography title={name} className={styles.productCart__title}>
              {name.length > 20 ? name.slice(0, 20) + `...` : name}
            </Typography>
            {averageRating && (
              <Box mb={1}>
                <Rating
                  fontSize={downSmScreen ? "15px!important" : "18px!important"}
                  value={averageRating}
                  readOnly
                />
              </Box>
            )}
            <Typography className={styles.productCart__amount}>
              {`(1 ${weight})`}
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
          shortDescription={shortDescription}
          price={price}
          discountPrice={discountPrice}
          productTitle={name}
          ratingValue={averageRating}
          category={category}
          tags={tags}
          handleClose={handleClose}
          open={open}
          images={images}
          isServiceAvailable={isServiceAvailable}
          weight={weight}
          seller={seller}
        />
      )}
    </>
  );
};

export default ProductCart;
