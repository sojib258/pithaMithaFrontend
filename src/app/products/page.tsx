import Products from "@/components/pages/products/Products";
import Box from "@mui/material/Box";
const ProductPage = () => {
  return (
    <Box sx={{ width: "100%", height: "auto", backgroundColor: "#fff" }}>
      <Box sx={{ width: "90%", height: "auto", margin: "0px auto" }}>
        <Products />
      </Box>
    </Box>
  );
};

export default ProductPage;
