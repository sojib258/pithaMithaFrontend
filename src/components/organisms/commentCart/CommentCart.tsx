"use client";
import dateFormat from "@/utils/dateFormat";
import { CommentData } from "@/utils/typesDefine/commentSliceTypes";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Image from "next/image";
import styles from "./commentCart.module.scss";

interface CommentCartProps {
  commentData: CommentData;
}
const CommentCart: React.FC<CommentCartProps> = ({ commentData }) => {
  const { comment, createdAt, users_permissions_user } = commentData.attributes;

  const { firstName, lastName, image } = users_permissions_user.data.attributes;
  const { date } = dateFormat(createdAt);
  const url = image.data?.attributes?.url;

  console.log("CommentData", commentData);
  return (
    <Box className={styles.comment}>
      {url ? (
        <Image
          width={40}
          height={40}
          src={image.data.attributes.url}
          alt={image.data.attributes.alternativeText || "Profile Image"}
          className={styles.comment__profileImg}
        />
      ) : (
        <Avatar
          sx={{
            width: 40,
            height: 40,
            marginRight: "8px",
            backgroundColor: "#999999",
          }}
        >
          {firstName.slice(0, 1)}
        </Avatar>
      )}

      <Box className={styles.comment__details}>
        <Box className={styles.comment__nameDate}>
          <Typography className={styles.comment__userName}>
            {`${firstName} ${lastName && lastName}`}
          </Typography>
          <Typography className={styles.comment__createdAt}>{date}</Typography>
        </Box>
        <Typography className={styles.comment__description}>
          {comment}
        </Typography>
      </Box>
    </Box>
  );
};

export default CommentCart;
