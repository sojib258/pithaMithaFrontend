import Button from "@/components/atoms/button/Button";
import dateFormat from "@/utils/dateFormat";
import {
  Author,
  Category,
  FeaturedImage,
} from "@/utils/typesDefine/blogSliceTypes";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "./blogCart.module.scss";
interface newsCartProps {
  title: string;
  category: Category;
  admin: Author;
  createdAt: string;
  featuredImage: FeaturedImage;
}
const NewsCart: React.FC<newsCartProps> = ({
  featuredImage,
  category,
  admin,
  title,
  createdAt,
}) => {
  const date = dateFormat(createdAt);
  const convertedDate = date.date.split("-");

  return (
    <Box className={styles.newsCart}>
      <Box className={styles.newsCart__header}>
        <Image
          className={styles.newsCart__img}
          width={400}
          height={300}
          src={featuredImage.data.attributes.url}
          alt={featuredImage.data.attributes.alternativeText || "Blog Image"}
        />
        <Box className={styles.newsCart__date}>
          <Typography className={styles.newsCart__tarikh}>
            {convertedDate[0]}
          </Typography>
          <Typography className={styles.newsCart__month}>
            {convertedDate[1]}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.newsCart__contents}>
        <Box className={styles.newsCart__newsInfo}>
          <Typography className={styles.newsCart__cat}>
            <SellOutlinedIcon className={styles.newsCart__infoIcon} />
            {category.data.attributes.name}
          </Typography>
          <Typography className={styles.newsCart__admin}>
            <PermIdentityRoundedIcon
              className={`${styles.newsCart__infoIcon} ${styles.newsCart__infoAdminIcon}`}
            />
            By
            {` ${admin.data.attributes.firstName}`}
          </Typography>
          {/* <Typography className={styles.newsCart__comment}>
            <ModeCommentOutlinedIcon className={styles.newsCart__infoIcon} />
            {commentCount} Comment
          </Typography> */}
        </Box>
        <Typography title={title} className={styles.newsCart__title}>
          {/* {title.length > 40 ? title.slice(0, 40) + `...` : title} */}
          {title}
        </Typography>
      </Box>
      <Box className={styles.newsCart__button}>
        <Button
          customStyle={{
            fontSize: "14px",
            padding: "5px 10px",
            backgroundColor: "transparent",
            boxShadow: "none",
            color: "#00B207",
            paddingLeft: "0px",
          }}
          arrowIcon
          text="Read More"
        />
      </Box>
    </Box>
  );
};

export default NewsCart;
