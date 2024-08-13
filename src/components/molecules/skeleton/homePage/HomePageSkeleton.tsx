import { Box, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import styles from "./homePageSkeleton.module.scss";
const HomePageSkeleton = () => {
  return (
    <Box className={styles.skeleton}>
      <Box className={styles.skeleton__wrapper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box className={styles.skeleton__leftPart}>
              <Skeleton className={styles.skeleton__textOne}>
                Please Wait...
              </Skeleton>
              <Skeleton className={styles.skeleton__textTwo} />
              <Skeleton className={styles.skeleton__textThree} />
              <Skeleton className={styles.skeleton__textFour} />
              <Skeleton className={styles.skeleton__textFive} />
              <Skeleton className={styles.skeleton__textSix} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={styles.skeleton__rightPart}>
              <Skeleton
                className={styles.skeleton__img}
                variant="rectangular"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePageSkeleton;
