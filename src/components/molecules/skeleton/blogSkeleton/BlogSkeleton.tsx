import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import ReviewSkeleton from "../review/ReviewSkeleton";
import styles from "./blogSkeleton.module.scss";
const BlogSkeleton = () => {
  return (
    <Box className={styles.blog}>
      <Grid container>
        <Grid item md={8}>
          <Box className={styles.blog__leftContent}>
            <Skeleton
              sx={{ borderRadius: "8px" }}
              className={styles.blog__img}
              variant="rectangular"
            />
            <Skeleton className={styles.blog__text1} />
            <Skeleton className={styles.blog__text2} />
            <ReviewSkeleton />
            <Skeleton className={styles.blog__text1} />
            <Skeleton className={styles.blog__text2} />
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box className={styles.blog__rightContent}>
            <Skeleton className={styles.blog__sidebar} />
            <Skeleton className={styles.blog__text1} />
            <Skeleton className={styles.blog__text2} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogSkeleton;
