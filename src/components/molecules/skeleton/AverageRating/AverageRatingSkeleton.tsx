import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import styles from "./style.module.scss";
const AverageRatingSkeleton = () => {
  return (
    <Box className={styles.skeleton}>
      <Box className={styles.skeleton__header}>
        <Skeleton className={styles.skeleton__title} />
        <Skeleton className={styles.skeleton__ratingValue} />
        <Skeleton className={styles.skeleton__ratingIcons} />
      </Box>
      <Box className={styles.skeleton__body}>
        <Skeleton className={styles.skeleton__des} />
        <Skeleton className={styles.skeleton__des} />
        <Skeleton className={styles.skeleton__des} />
        <Skeleton className={styles.skeleton__des} />
        <Skeleton className={styles.skeleton__des} />
      </Box>
    </Box>
  );
};

export default AverageRatingSkeleton;
