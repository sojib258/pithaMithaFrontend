import AddressInfo from "@/components/molecules/addressInfo/AddressInfo";
import OrderItems from "@/components/molecules/cartItems/CartItems";
import Summary from "@/components/organisms/orderSummary/Summary";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styles from "./checkout.module.scss";
const Checkout = () => {
  const orderItems = [
    {
      id: 1,
      imgSrc: "/img/6.jpg",
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

  const dataFromBackend = [
    {
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
    },
    {
      id: 2,
      name: "Sajib Hasan",
      number: "01720046642",
      address:
        "House 83/3, Madartek Road, Madartek Kachabazar, Madartek Chowrasta",
      area: "Barguna Amtoli",
      city: "Barguna",
      division: "Barishal",
      deliveryOption: "office",
      landmark: "Beside big jame masjid",
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

  return (
    <Box className={styles.checkout}>
      <Grid container>
        <Grid order={{ xs: 2, lg: 1 }} item xs={12} lg={8}>
          <Box className={styles.checkout__leftItem}>
            <AddressInfo addressData={dataFromBackend} />
          </Box>
        </Grid>
        <Grid order={{ xs: 1, lg: 2 }} item xs={12} lg={4}>
          <Box className={styles.checkout__rightItem}>
            <Summary
              title="Order Summery"
              cartItems={cartItems}
              grandTotal={grandTotal}
              shippingCost={shippingCost}
              subTotal={subTotal}
              btnText="Place Order"
              btnLink="/payment"
            />
          </Box>
        </Grid>
      </Grid>
      <Box className={styles.checkout__orderItems}>
        {orderItems.map((item) => (
          <OrderItems
            imgSrc={item.imgSrc}
            price={item.price}
            discountPrice={item.discountPrice}
            quantity={item.quantity}
            title={item.title}
            key={item.id}
            sx={{ borderBottom: "1px solid #e6e6e6;" }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Checkout;
