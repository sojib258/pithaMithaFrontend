import SingleBlog from "@/components/pages/singleBlog/SingleBlog";
import Box from "@mui/material/Box";
const BlogDetails = ({ params }: { params: { blogId: string } }) => {
  const blogId = params.blogId;
  return (
    <Box sx={{ width: "100%", height: "auto", backgroundColor: "#fff" }}>
      <Box
        sx={{
          width: { xs: "95%", sm: "90%" },
          height: "auto",
          margin: "0px auto",
        }}
      >
        <SingleBlog blogId={blogId} />
      </Box>
    </Box>
  );
};

export default BlogDetails;
