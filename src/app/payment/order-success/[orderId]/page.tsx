import SuccessCart from "@/components/organisms/orderSuccessCart/SuccessCart";
import Box from "@mui/material/Box";
const page = ({ params }: { params: { orderId: string } }) => {
  const orderId = params.orderId;
  return (
    <Box sx={{ width: "100%", height: "auto", backgroundColor: "#fff" }}>
      <Box
        sx={{
          width: { xs: "95%", sm: "90%" },
          height: "auto",
          margin: "0px auto",
        }}
      >
        <SuccessCart orderId={orderId} />
      </Box>
    </Box>
  );
};

export default page;
