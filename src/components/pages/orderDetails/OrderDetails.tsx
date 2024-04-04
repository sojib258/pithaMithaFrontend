import Button from "@/components/atoms/button/Button";
import Label from "@/components/atoms/label/Label";
import Products from "@/components/organisms/orderDetailProduct/Product";
import Summary from "@/components/organisms/orderSummary/Summary";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import styles from "./orderDetails.module.scss";
interface OrderDetailsProps {
  orderId: string | number;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  // Fetch Product by OrderId

  const orderItems = [
    {
      id: 1,
      imgSrc: "/img/6.jpg",
      altText: "image alt text",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, reprehenderit!",
      quantity: 2,
      price: 1000,
      discountPrice: 990,
    },
    {
      id: 2,
      imgSrc: "/img/6.jpg",
      title: "Lorem ipsum dolor sit amet",
      quantity: 2,
      price: 300,
      discountPrice: 299,
    },
  ];

  const cartItems = orderItems.length;

  const subTotal = orderItems.reduce((acc, cur) => {
    const priceToUse = cur.discountPrice ? cur.discountPrice : cur.price;
    const totalPrice = priceToUse * cur.quantity;
    acc += totalPrice;

    return acc;
  }, 0);

  const shippingCost = 60;

  const grandTotal = subTotal + shippingCost;

  const addressData = {
    id: 1,
    name: "Sajib Hasan",
    number: "01720046642",
    address:
      "House 83/3, Madartek Road, Madartek Kachabazar, Madartek Chowrasta",
    area: "Barguna Amtoli",
    city: "Barguna",
    division: "Barishal",
    deliveryOption: "home",
    landmark: "Beside big jame masjid",
  };

  const { name, number, address, area, city, division, deliveryOption } =
    addressData;

  return (
    <Box className={styles.details}>
      <Box className={styles.details__head}>
        <Box className={styles.details__headPara}>
          <Typography className={styles.details__headText}>
            Order Details
          </Typography>
          <Typography className={styles.details__headDate}>
            {`• ${"April 1, 2024"} •`}
          </Typography>
          <Typography className={styles.details__headProductItems}>
            3 Products
          </Typography>
        </Box>
        <Link href={"/dashboard/order-history"}>
          <Button
            sx={{
              backgroundColor: "transparent!important",
              boxShadow: "none",
              color: "#00b207!important",
              padding: "0px!important",
              fontSize: "1rem!important",
              "&:hover": {
                textDecoration: "underline",
                boxShadow: "none!important",
              },
            }}
            text="Back to List"
          />
        </Link>
      </Box>
      <Box className={styles.details__body}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <Box className={styles.details__addressArea}>
              <Typography className={styles.details__deliveryText}>
                Delivery Address:
              </Typography>
              <Typography className={styles.details__addressName}>
                {name}
              </Typography>
              <Typography className={styles.details__addressLocation}>
                {address}
              </Typography>
              <Typography
                className={styles.details__addressDivision}
              >{`${area}, ${city}, ${division}`}</Typography>
              <Label text={deliveryOption} />

              <Typography
                component={"span"}
                className={styles.details__addressNumber}
              >
                {number}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box className={styles.details__subTotalArea}>
              <Box className={styles.details__subTotalHead}>
                <Box className={styles.details__subTotalLeft}>
                  <Typography className={styles.details__subTotalOrderIdText}>
                    Order Id
                  </Typography>
                  <Typography className={styles.details__subTotalOrderId}>
                    {orderId}
                  </Typography>
                </Box>
                <Box className={styles.details__subTotalRight}>
                  <Typography className={styles.details__subTotalPaymentText}>
                    Payment Method
                  </Typography>
                  <Typography className={styles.details__subTotalPayment}>
                    Cash on Delivery
                  </Typography>
                </Box>
              </Box>
              <Summary
                sx={{
                  border: "none!important",
                  boxShadow: "none!important",
                }}
                cartItems={cartItems}
                grandTotal={grandTotal}
                shippingCost={shippingCost}
                subTotal={subTotal}
              />
            </Box>
          </Grid>
        </Grid>
        <Box className={styles.details__orderProducts}></Box>
      </Box>
      <Box className={styles.details__product}>
        <Products productData={orderItems} />
      </Box>
    </Box>
  );
};

export default OrderDetails;
