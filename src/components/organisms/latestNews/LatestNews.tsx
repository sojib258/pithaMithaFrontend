import BlogCart from "@/components/molecules/blogCart/BlogCart";
import { fetchBlogs } from "@/utils/fetchBlog";
import { BlogData } from "@/utils/typesDefine/blogSliceTypes";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import styles from "./latestNews.module.scss";
const LatestNews = async () => {
  // Fetch Only Three Blogs
  const blogData = await fetchBlogs(
    `filters[isFeatured][$eq]=true&fields[0]=title&fields[1]=createdAt&populate[users_permissions_user][populate]=image&populate[comments]=true&populate[category]=true&populate[featuredImage]=true`
  );

  return (
    <Box className={styles.news}>
      <Typography className={styles.news__headText}>Latest News</Typography>
      <Grid container spacing={2}>
        {blogData.map((item: BlogData) => {
          const {
            title,
            category,
            featuredImage,
            createdAt,
            comments,
            users_permissions_user,
          } = item.attributes;
          const commentCount = comments.data.length;
          return (
            <Grid flexGrow={1} key={item.id} sm={12} md={6} xl={4} item>
              <Link href={`/blogs/${item.id}`}>
                <BlogCart
                  title={title}
                  admin={users_permissions_user}
                  category={category}
                  featuredImage={featuredImage}
                  createdAt={createdAt}
                  commentCount={commentCount}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default LatestNews;
