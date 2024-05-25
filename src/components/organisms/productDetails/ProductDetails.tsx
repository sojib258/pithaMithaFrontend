"use client";
import Button from "@/components/atoms/button/Button";
import Rating from "@/components/atoms/ratings/Rating";
import Stock from "@/components/atoms/stockStatus/Stock";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import EditProductDialog from "../editProduct/EditProductDialog";
import styles from "./productDetails.module.scss";
interface ProductDetailsProps {
  product: {
    id: number;
    category: {
      name: string;
    };
    averageRating?: number;
    name: string;
    shortDescription: string;
    price: number;
    discountPrice?: number;
    isServiceAvailable: boolean;
    tags: {
      id: number;
      name: string;
    }[];
    weight: string;
  };
  handleReRender: () => void;
  handleLoading: (value: boolean) => void;
  loading: boolean;
  totalRating: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  loading,
  handleReRender,
  handleLoading,
  totalRating,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    id,
    category,
    averageRating,
    name,
    shortDescription,
    isServiceAvailable,
    price,
    discountPrice,
    tags,
    weight,
  } = product;

  const discount = discountPrice
    ? Math.floor(((price - discountPrice) / price) * 100)
    : null;

  return (
    <Box className={styles.details}>
      {loading ? (
        <Skeleton className={styles.details__productNameSkeleton} />
      ) : (
        <Typography className={styles.details__productName}>{name}</Typography>
      )}

      {/* Rating Component */}
      {loading ? (
        <Skeleton className={styles.details__productRatingSkeleton} />
      ) : (
        <Stack
          direction={"row"}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Rating
            customStyle={{ maxWidth: "200px" }}
            value={averageRating}
            reviewText={`${totalRating} Review`}
            readOnly
          />
          <Stock
            customStyle={{ marginLeft: "6px" }}
            isServiceAvailable={isServiceAvailable}
          />
        </Stack>
      )}

      {/* Price Area */}
      {loading ? (
        <Skeleton className={styles.details__productPriceSkeleton} />
      ) : (
        <Typography className={styles.details__prices}>
          {discountPrice ? (
            <>
              <Typography
                className={styles.details__discountPrice}
                component={"span"}
              >
                &#2547; {discountPrice}
              </Typography>
              <Typography
                className={styles.details__priceCondition}
                component={"span"}
              >
                {price}
              </Typography>
            </>
          ) : (
            <Typography className={styles.details__price} component={"span"}>
              &#2547; {price}
            </Typography>
          )}
          <Typography className={styles.details__perWeight} component={"span"}>
            / {weight}
          </Typography>
          {discountPrice && (
            <Typography className={styles.details__discount} component={"span"}>
              {discount}% Off
            </Typography>
          )}
        </Typography>
      )}

      {/* Product Description Area */}
      {loading ? (
        <Box>
          <Skeleton
            className={styles.details__productShortDescriptionSkeleton1}
          />
          <Skeleton
            className={styles.details__productShortDescriptionSkeleton2}
          />
        </Box>
      ) : (
        <Typography className={styles.details__shortDescription}>
          {shortDescription}
        </Typography>
      )}

      <Box className={styles.details__actionArea}>
        <Button
          onClick={handleOpen}
          disabled={loading}
          sx={{
            width: "100%!important",
            borderRadius: "8px!important",
          }}
          text="Edit Product"
        />
      </Box>
      <Typography className={styles.details__categoryTitle}>
        Category:{" "}
        {loading ? (
          <Skeleton className={styles.details__productCategorySkeleton} />
        ) : (
          <Typography
            component={"span"}
            className={styles.details__categoryValue}
          >
            {category.name}
          </Typography>
        )}
      </Typography>
      <Typography className={styles.details__tagsTitle}>
        Tags:{" "}
        {loading ? (
          <Skeleton className={styles.details__productTagsSkeleton} />
        ) : (
          tags.map((tag) => (
            <Typography
              key={tag.id}
              component={"span"}
              className={styles.details__tagsValue}
            >
              {tag.name},
            </Typography>
          ))
        )}
      </Typography>
      <EditProductDialog
        handleReRender={handleReRender}
        productId={id}
        open={open}
        handleClose={handleClose}
        loading={loading}
        handleLoading={handleLoading}
      />
    </Box>
  );
};

export default ProductDetails;
