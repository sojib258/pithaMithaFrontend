import timeAgo from "@/utils/timeAgo";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Rating from "../../atoms/ratings/Rating";
import styles from "./feedback.module.scss";
type ImageData = {
  imageId: number;
  width: number;
  height: number;
  url: string;
  altText?: string;
};

type User = {
  firstName: string;
  lastName?: string;
  userId: string | number;
  width?: number;
  height?: number;
  imgSrc?: string;
  altText?: string;
};

interface FeedbackProps {
  ratingValue: number;
  comment: string;
  publishedAt: string;
  user: User;
  images?: ImageData[];
  loading?: boolean;
}
const Feedback: React.FC<FeedbackProps> = ({
  user,
  ratingValue,
  comment,
  publishedAt,
  images,
  loading,
}) => {
  const timesAgo = timeAgo(publishedAt);

  console.log("Images", images);

  return (
    <>
      <Box className={styles.feedback}>
        <Box className={styles.feedback__topSection}>
          <Box className={styles.feedback__userSection}>
            {user.imgSrc ? (
              <Image
                className={styles.feedback__userImg}
                width={100}
                height={100}
                src={user.imgSrc}
                alt={user.altText ? user.altText : "User Image"}
              />
            ) : (
              <Avatar
                sx={{ backgroundColor: "#5a5a5a" }}
                className={styles.feedback__userImg}
              >
                {user.firstName.slice(0, 1)}
              </Avatar>
            )}
            <Box className={styles.feedback__userContent}>
              <Typography>{`${user.firstName} ${
                user.lastName ? user.lastName : ""
              }`}</Typography>
              <Rating readOnly value={ratingValue} />
            </Box>
          </Box>
          <Box className={styles.feedback__timeSection}>
            <Typography className={styles.feedback__timeText}>
              {timesAgo}
            </Typography>
          </Box>
        </Box>
        <Box className={styles.feedback__contectSection}>
          <Typography className={styles.feedback__comment}>
            {comment}
          </Typography>
        </Box>
        <Box className={styles.feedback__imagesArea}>
          {images?.map((item, index) => (
            <Image
              key={index}
              width={400}
              height={400}
              src={item.url}
              alt={item.altText ? item.altText : "Review Image"}
              className={styles.feedback__reviewImg}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Feedback;
