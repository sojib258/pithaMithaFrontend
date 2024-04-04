import OrderDetails from "@/components/pages/orderDetails/OrderDetails";
const page = ({ params }: { params: { orderId: string | number } }) => {
  const orderId = params.orderId;
  return (
    <>
      <OrderDetails orderId={orderId} />
    </>
  );
};

export default page;
