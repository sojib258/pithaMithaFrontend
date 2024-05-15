import OrderHistory from "@/components/pages/orderHistory/OrderHistory";
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
        <OrderHistory />
      </Box>
    </Box>
  );
};

export default page;
