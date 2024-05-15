import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import styles from "./style.module.scss";
const CommonSkeleton = () => {
  return (
    <Box className={styles.skeleton}>
      <Skeleton className={styles.skeleton__img} variant="rectangular" />
      <Skeleton className={styles.skeleton__text} />
      <Skeleton className={styles.skeleton__weight} />
      <Box className={styles.skeleton__wrapper}>
        <Skeleton className={styles.skeleton__price} />
        <Skeleton className={styles.skeleton__addCart} />
      </Box>
    </Box>
  );
};

export default CommonSkeleton;
