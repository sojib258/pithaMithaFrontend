import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Rating from "../ratings/Rating";
import styles from "./feedback.module.scss";
const Feedback = () => {
  return (
    <>
      <Box className={styles.feedback}>
        <Box className={styles.feedback__topSection}>
          <Box className={styles.feedback__userSection}>
            <Image
              className={styles.feedback__userImg}
              width={100}
              height={100}
              src={"/img/2.png"}
              alt={"User Image"}
            />
            <Box className={styles.feedback__userContent}>
              <Typography>Sajib Hasan</Typography>
              <Rating readOnly value={5} />
            </Box>
          </Box>
          <Box className={styles.feedback__timeSection}>
            <Typography className={styles.feedback__timeText}>
              2 mins ago
            </Typography>
          </Box>
        </Box>
        <Box className={styles.feedback__contectSection}>
          <Typography className={styles.feedback__description}>
            {" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
            optio vel laboriosam quo libero hic quod possimus molestiae quasi
            quia.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Feedback;
