import BlogPage from "@/components/pages/blogs/BlogList";
import Box from "@mui/material/Box";
const Blog = () => {
  return (
    <Box sx={{ width: "100%", height: "auto", backgroundColor: "#fff" }}>
      <Box
        sx={{
          width: { xs: "95%", sm: "90%" },
          height: "auto",
          margin: "0px auto",
        }}
      >
        <BlogPage />
      </Box>
    </Box>
  );
};

export default Blog;
