import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import styles from "./styles.module.scss";
const CategoriesSkeleton = () => {
  return (
    <Box className={styles.skeleton}>
      <Skeleton className={styles.skeleton__img} variant="rectangular" />
      <Skeleton className={styles.skeleton__text} />
    </Box>
  );
};

export default CategoriesSkeleton;
