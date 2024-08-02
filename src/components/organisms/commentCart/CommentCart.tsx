import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import styles from "./commentCart.module.scss";

const CommentCart = () => {
  return (
    <Box className={styles.comment}>
      <Image
        width={40}
        height={40}
        src={"/img/bg.png"}
        alt={"Profile Image"}
        className={styles.comment__profileImg}
      />
      <Box className={styles.comment__details}>
        <Box className={styles.comment__nameDate}>
          <Typography className={styles.comment__userName}>
            Annette Black
          </Typography>
          <Typography className={styles.comment__createdAt}>
            5 april 2024
          </Typography>
        </Box>
        <Typography className={styles.comment__description}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto,
          exercitationem?
        </Typography>
      </Box>
    </Box>
  );
};

export default CommentCart;
