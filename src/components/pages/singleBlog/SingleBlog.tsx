"use client";
import BlogSidebar from "@/components/organisms/blogSidebar/BlogSidebar";
import useResponsive from "@/hooks/useResponsive";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import styles from "./singleBlog.module.scss";

interface SingleBlogProps {
  blogId: string | number;
}

const SingleBlog: React.FC<SingleBlogProps> = ({ blogId }) => {
  let blogs = useSelector((state: RootState) => state.products.items);

  const { mdScreen } = useResponsive();

  // find single blog by using blogId

  return (
    <Box className={styles.blog}>
      <Box className={styles.blog__leftContent}>
        {blogs.map((item, index) => item.attributes.description)}
      </Box>
      {mdScreen && (
        <Box className={styles.blog__rightContent}>
          {/* Blog Details Page Right Sidebar Area */}
          <BlogSidebar />
        </Box>
      )}
    </Box>
  );
};

export default SingleBlog;
