import AdminInfo from "@/components/molecules/adminInfo/AdminInfo";
import RecentBlogCart from "@/components/molecules/recentBlogCart/RecentBlogCart";
import SocialIcon from "@/components/molecules/socialIcons/SocialIcon";
import CommentCart from "@/components/organisms/commentCart/CommentCart";
import CommentForm from "@/components/organisms/commentForm/CommentForm";
import fetchBlogs from "@/utils/fetchBlog";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BlocksRendererComponent from "./BlocksRendererComponent";

import Image from "next/image";

import styles from "./singleBlog.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

interface SingleBlogProps {
  slug: string;
}

const SingleBlog: React.FC<SingleBlogProps> = async ({ slug }) => {
  const decodedSlug = decodeURIComponent(slug);

  console.log("DecodedSlug", decodedSlug);

  // // find single blog by using slug
  const [blogData, latestBlogs] = await Promise.all([
    await fetchBlogs(
      `filters[slug][$eq]=${decodedSlug}&populate[category]=true&populate[featuredImage]=true&populate[users_permissions_user][populate]=image`
    ),
    await fetchBlogs(
      `sort[0]=createdAt:desc&pagination[limit]=3&fields[0]=title&fields[1]=createdAt&populate[featuredImage]=*`
    ),
  ]);

  console.log("BLogData", blogData.attributes.users_permissions_user);

  const {
    users_permissions_user: userDetails,
    category,
    featuredImage,
    title,
    description,
    createdAt,
  } = blogData.attributes;

  console.log("UUUUDDDD", userDetails);

  const {
    firstName,
    lastName,
    image: authorImage,
  } = userDetails.data.attributes;

  console.log("BlogData", blogData);

  return (
    <Box className={styles.blog}>
      <Grid container>
        <Grid item md={8}>
          <Box className={styles.blog__leftContent}>
            <Image
              width={800}
              height={600}
              src={featuredImage.data.attributes.url}
              alt={"Featured Image"}
              className={styles.blog__featuredImage}
            />
            <Box className={styles.blog__info}>
              <Typography className={styles.blog__infoText}>
                <SellOutlinedIcon className={styles.blog__infoIcon} />
                {"Category"}
              </Typography>
              <Typography className={styles.blog__infoText}>
                <PermIdentityRoundedIcon
                  className={`${styles.blog__infoIcon} ${styles.blog__infoIcon}`}
                />
                By
                {" Sajib"}
              </Typography>
              {/* <Typography className={styles.newsCart__comment}>
            <ModeCommentOutlinedIcon className={styles.newsCart__infoIcon} />
            {commentCount} Comment
          </Typography> */}
            </Box>
            <Typography className={styles.blog__title}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero
              repudiandae quos quaerat quae itaque.
            </Typography>

            {/* admin info content */}
            <Box className={styles.blog__adminInfo}>
              <AdminInfo
                firstName={firstName}
                lastName={lastName}
                src={authorImage?.data?.attributes?.url}
                date={createdAt}
              />
              <Box sx={{ display: { xs: "none", sm: "initial" } }}>
                <SocialIcon />
              </Box>
            </Box>

            {/* Blog Details Content */}
            <Box className={styles.blog__details}>
              <BlocksRendererComponent content={description} />
            </Box>
            <Box className={styles.blog__commentSection}>
              <Typography className={styles.blog__commentLeaveText}>
                Leave a Comment
              </Typography>
              <CommentForm />
              <Typography className={styles.blog__commentText}>
                Comments
              </Typography>
              <CommentCart />
            </Box>
          </Box>
        </Grid>
        <Grid sx={{ display: { xs: "none", md: "initial" } }} item md={4}>
          <Box className={styles.blog__rightContent}>
            <Typography className={styles.blog__recentText}>
              Recent Posts
            </Typography>
            {latestBlogs.map((item: any) => (
              <RecentBlogCart
                key={item.id}
                id={item.id}
                title={item.attributes.title}
                date={item.attributes.createdAt}
                src={item.attributes.featuredImage.data.attributes.url}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleBlog;
