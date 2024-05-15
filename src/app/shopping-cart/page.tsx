import ShoppingCart from "@/components/organisms/shoppingCart/ShoppingCart";
import Box from "@mui/material/Box";
const page = () => {
  return (
    <Box sx={{ width: "100%", height: "auto", backgroundColor: "#fff" }}>
      <Box
        sx={{
          width: { xs: "95%", sm: "90%" },
          height: "auto",
          margin: "0px auto",
        }}
      >
        <ShoppingCart />
      </Box>
    </Box>
  );
};

export default page;
