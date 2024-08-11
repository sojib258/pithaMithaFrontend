import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import styles from "./singleProSke.module.scss";
const SingleProSkeleton = () => {
  return (
    <Box className={styles.skeleton}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box className={styles.skeleton__leftSection}>
            <Skeleton
              className={styles.skeleton__productImg}
              variant="rectangular"
            />
            <Box className={styles.skeleton__thumbnailSection}>
              <Skeleton
                className={styles.skeleton__thumbnailImg}
                variant="rectangular"
              />
              <Skeleton
                className={styles.skeleton__thumbnailImg}
                variant="rectangular"
              />

              <Skeleton
                className={styles.skeleton__thumbnailImg}
                variant="rectangular"
              />

              <Skeleton
                className={styles.skeleton__thumbnailImg}
                variant="rectangular"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={styles.skeleton__rightSection}>
            <Skeleton className={styles.skeleton__description1} />
            <Skeleton className={styles.skeleton__description2} />
            <Skeleton className={styles.skeleton__description3} />
            <Skeleton className={styles.skeleton__description4} />
            <Skeleton className={styles.skeleton__description5} />
            <Skeleton className={styles.skeleton__description6} />
            <Skeleton className={styles.skeleton__description7} />
            <Skeleton className={styles.skeleton__description8} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleProSkeleton;
