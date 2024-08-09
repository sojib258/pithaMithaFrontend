import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import styles from "./blogSkeleton.module.scss";
const BlogCartSkeleton = () => {
  return (
    <Box className={styles.blog}>
      <Skeleton
        sx={{ borderRadius: "8px" }}
        className={styles.blog__img}
        variant="rectangular"
      />
      <Box className={styles.blog__author}>
        <Skeleton className={styles.blog__text1} />
        <Skeleton className={styles.blog__text2} />
        <Skeleton className={styles.blog__text3} />
      </Box>
      <Skeleton className={styles.blog__text4} />
      <Skeleton className={styles.blog__text5} />
    </Box>
  );
};

export default BlogCartSkeleton;
