"use client";
import Button from "@/components/atoms/button/Button";
import { RootState } from "@/store/store";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ReviewForm from "../reviewForm/ReviewForm";
import styles from "./product.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

interface ProductRowsProps {
  imgSrc: string;
  title: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  altText?: string;
  status: string;
  productId: number;
  userId: number | null;
}
type FormFields = {
  review: number;
  comment: string;
  images: FileList;
};
const ProductRows: React.FC<ProductRowsProps> = ({
  userId,
  imgSrc,
  price,
  discountPrice,
  quantity,
  title,
  altText,
  status,
  productId,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const [reviewId, setReviewId] = useState<number | null>(null);
  const [existingImageIds, setExistingImageIds] = useState<number[]>([]);
  const { token } = useSelector((state: RootState) => state.auth);

  console.log(
    `hasReview= ${hasReview}; reviewId=${reviewId}; existingImageIds=${existingImageIds}; productId=${productId}; UserId=${userId} `
  );

  const subTotal = (discountPrice ? discountPrice : price) * quantity;

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const checkReview = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/ratings?populate=images&filters[users_permissions_user][$eq]=${userId}&filters[product][$eq]=${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.data.length > 0) {
          setHasReview(true);
          setReviewId(response.data.data[0].id); // Store the review ID
          setExistingImageIds(
            response.data.data[0].attributes.images.data.map(
              (img: any) => img.id
            )
          ); // Store existing image IDs
        }
        setLoading(false);
      } catch (error) {
        console.error("Error checking review", error);
        setLoading(false);
      }
    };

    checkReview();
  }, [productId, userId, token]);

  const handleReview = async (reviewData: FormFields) => {
    try {
      setLoading(true);
      handleClose();
      const formData = new FormData();
      Array.from(reviewData.images).forEach((item) => {
        formData.append("files", item);
      });

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const imageUploadPromise = axios.post(`${API_URL}/upload`, formData, {
        headers,
      });

      toast.promise(imageUploadPromise, {
        loading: "Review Images Uploading...",
        success: "Upload Completed!",
        error: (error: any) => {
          return `${
            error.response.data.error.message
              ? error?.response?.data?.error?.message
              : error.message
          }`;
        },
      });

      const imageUploadResponse = await imageUploadPromise;
      const imagesId = imageUploadResponse.data.map((img: any) => img.id);

      if (hasReview && reviewId) {
        // Delete existing images
        const deleteImagePromises = existingImageIds.map((id) =>
          axios.delete(`${API_URL}/upload/files/${id}`, {
            headers,
          })
        );
        await Promise.all(deleteImagePromises);
      }

      let reviewDetailsPromise;

      if (hasReview && reviewId) {
        // Update existing review
        reviewDetailsPromise = axios.put(
          `${API_URL}/ratings/${reviewId}`,
          {
            data: {
              comment: reviewData.comment,
              ratingValue: reviewData.review,
              images: imagesId,
            },
          },
          {
            headers,
          }
        );
      } else {
        // Create new review
        reviewDetailsPromise = axios.post(
          `${API_URL}/ratings`,
          {
            data: {
              product: productId,
              users_permissions_user: userId,
              comment: reviewData.comment,
              ratingValue: reviewData.review,
              images: imagesId,
            },
          },
          {
            headers,
          }
        );
      }

      toast.promise(reviewDetailsPromise, {
        loading: "Review Details Uploading...",
        success: "Upload Completed!",
        error: (error: any) => {
          return `${
            error.response.data.error.message
              ? error?.response?.data?.error?.message
              : error.message
          }`;
        },
      });

      // update the averageRating in product
      await reviewDetailsPromise;
      await updateAverageRating(productId, headers);

      setLoading(false);
      setHasReview(true); // Update review status
    } catch (error) {
      console.error("Error from post review", error);
      setLoading(false);
      handleClose();
    }
  };

  // handle Average rating of an product
  const updateAverageRating = async (productId: number, headers: any) => {
    try {
      // Fetch all ratings for the product
      const response = await axios.get(
        `${API_URL}/ratings?filters[product][$eq]=${productId}`,
        {
          headers,
        }
      );

      const ratings = response.data.data;
      const totalRatings = ratings.length;
      const sumRatings = ratings.reduce(
        (sum: number, rating: any) => sum + rating.attributes.ratingValue,
        0
      );
      const averageRating = totalRatings ? sumRatings / totalRatings : 0;

      // Update the product with the new average rating
      await axios.put(
        `${API_URL}/products/${productId}`,
        {
          data: {
            averageRating,
          },
        },
        {
          headers,
        }
      );
    } catch (error) {
      console.error("Error updating average rating", error);
    }
  };

  return (
    <TableRow className={styles.product__tableRow}>
      <TableCell className={styles.product__images}>
        <Image
          width={100}
          height={100}
          src={imgSrc}
          alt={altText ? altText : "Product Image"}
          className={styles.product__img}
        />

        <Typography className={styles.product__title} component={"span"}>
          {title}
        </Typography>
      </TableCell>

      <TableCell className={styles.product__tableCell}>
        <Box className={styles.product__priceCell}>
          <Image
            width={40}
            height={40}
            src={"/icons/taka.png"}
            alt="Taka Logo"
            className={styles.product__currencyIcon}
          />

          <Typography className={styles.product__price}>
            {discountPrice ? discountPrice : price}
          </Typography>
        </Box>
      </TableCell>
      <TableCell className={styles.product__tableCell}>
        <Typography className={styles.product__quantity}>
          x{quantity}
        </Typography>
      </TableCell>
      <TableCell className={styles.product__tableCell}>
        <Box className={styles.product__priceCell}>
          <Image
            width={40}
            height={40}
            src={"/icons/taka.png"}
            alt="Taka Logo"
            className={styles.product__currencyIcon}
          />

          <Typography className={styles.product__subTotal}>
            {subTotal}
          </Typography>
        </Box>
      </TableCell>
      <TableCell className={styles.product__tableCell}>
        {status === "delivered" &&
          (loading ? (
            <Skeleton sx={{ width: "60px" }} />
          ) : (
            <Button
              onClick={handleOpen}
              sx={{ padding: "4px 16px!important" }}
              text={hasReview ? "Edit" : "Review"}
            />
          ))}
      </TableCell>
      <ReviewForm
        handleAction={handleReview}
        handleClose={handleClose}
        open={open}
      />
    </TableRow>
  );
};

export default ProductRows;
