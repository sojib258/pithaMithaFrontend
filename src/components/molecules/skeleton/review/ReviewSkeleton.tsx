import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import styles from "./style.module.scss";
const ReviewSkeleton = () => {
  return (
    <Box className={styles.skeleton}>
      <Box className={styles.skeleton__header}>
        <Box className={styles.skeleton__userDetails}>
          <Skeleton
            className={styles.skeleton__userImg}
            variant="rectangular"
          />
          <Skeleton className={styles.skeleton__userName} />
        </Box>
        <Skeleton className={styles.skeleton__time} />
      </Box>
      <Box className={styles.skeleton__body}>
        <Skeleton className={styles.skeleton__description1} />
        <Skeleton className={styles.skeleton__description2} />
        <Skeleton className={styles.skeleton__description3} />
      </Box>
    </Box>
  );
};

export default ReviewSkeleton;
