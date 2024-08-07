import BlogSkeleton from "@/components/molecules/skeleton/blogSkeleton/BlogSkeleton";
import SingleBlog from "@/components/pages/singleBlog/SingleBlog";
import Box from "@mui/material/Box";
import { Suspense } from "react";
const BlogDetails = ({ params }: { params: { blogId: string } }) => {
  const integerBlogId = parseInt(params.blogId);
  return (
    <Box sx={{ width: "100%", height: "auto", backgroundColor: "#fff" }}>
      <Box
        sx={{
          width: { xs: "95%", sm: "90%" },
          height: "auto",
          margin: "0px auto",
        }}
      >
        <Suspense fallback={<BlogSkeleton />}>
          <SingleBlog blogId={integerBlogId} />
        </Suspense>
      </Box>
    </Box>
  );
};

export default BlogDetails;
