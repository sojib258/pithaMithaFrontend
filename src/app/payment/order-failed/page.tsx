import OrderFailed from "@/components/organisms/orderFailedCart/OrderFailed";
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
        <OrderFailed />
      </Box>
    </Box>
  );
};

export default page;
