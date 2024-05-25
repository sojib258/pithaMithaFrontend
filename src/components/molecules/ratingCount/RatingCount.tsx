"use client";

import Rating from "@/components/atoms/ratings/Rating";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import React from "react";
import styles from "./ratingCount.module.scss";

type Data = {
  ratingId: string | number;
  ratingValue: number;
  comment: string;
};

interface RatingCountProps {
  averageRating?: number;
  ratings: Data[];
}

const RatingCount: React.FC<RatingCountProps> = ({
  averageRating,
  ratings,
}) => {
  // Count the number of ratings for each star value
  const ratingCounts = [0, 0, 0, 0, 0]; // Indices 0 to 4 represent 1 to 5 stars

  console.log("Rat", ratings);

  ratings.forEach((rating) => {
    if (rating.ratingValue >= 1 && rating.ratingValue <= 5) {
      ratingCounts[rating.ratingValue - 1]++;
    }
  });

  const totalRatings = ratings.length;

  return (
    <Box className={styles.rating}>
      <Typography className={styles.rating__text} variant="h6">
        Average rating
      </Typography>
      <Typography className={styles.rating__averageText} variant="h4">
        {averageRating?.toFixed(1)}/5
      </Typography>
      <Rating
        readOnly
        customStyle={{ justifyContent: "center" }}
        value={averageRating}
      />
      <Box className={`${styles.rating__details} rating`}>
        {[5, 4, 3, 2, 1].map((star) => (
          <Box key={star} className={styles.rating__row}>
            <Typography className={styles.rating__countText} variant="body2">
              {star} star
            </Typography>
            <LinearProgress
              className={styles.rating__progress}
              variant="determinate"
              value={
                totalRatings > 0
                  ? (ratingCounts[star - 1] / totalRatings) * 100
                  : 0
              }
            />
            <Typography className={styles.rating__countValue} variant="body2">
              {`(${ratingCounts[star - 1]})`}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RatingCount;
