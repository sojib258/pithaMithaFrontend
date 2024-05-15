import OrderDetails from "@/components/pages/orderDetails/OrderDetails";
import Box from "@mui/material/Box";
const page = ({ params }: { params: { orderId: string | number } }) => {
  const orderId = params.orderId;

  console.log("ORderID", orderId, "Type", typeof orderId);
  return (
    <>
      <Box sx={{ width: "100%", height: "auto", backgroundColor: "#fff" }}>
        <Box
          sx={{
            width: { xs: "95%", sm: "90%" },
            height: "auto",
            margin: "0px auto",
          }}
        >
          <OrderDetails orderId={orderId} />
        </Box>
      </Box>
    </>
  );
};

export default page;
