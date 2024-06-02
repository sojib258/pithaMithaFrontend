"use client";
import ToasterMsg from "@/components/atoms/toastMsg/Toaster";
import AddressInfo from "@/components/molecules/addressInfo/AddressInfo";
import OrderItems from "@/components/molecules/cartItems/CartItems";
import PaymentMethodDialog from "@/components/molecules/paymentMethodDialog/PaymentMethodDialog";
import SSLPaymentList from "@/components/molecules/sslPaymentList/SSLPaymentList";
import Summary from "@/components/organisms/orderSummary/Summary";
import { RootState } from "@/store/store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import styles from "./checkout.module.scss";

type paymentData = {
  desc: [];
  gw: {};
};

type Data = {
  id: string | number;
  fullName: string;
  number: string;
  address: string;
  area: string;
  city: string;
  division: string;
  deliveryOption: string;
  landmark: string;
};

const Checkout = () => {
  const { cart, auth } = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<paymentData>({
    desc: [],
    gw: {},
  });

  const [addressData, setAddressData] = useState<Data[]>([]);
  const [chosenAddressId, setChosenAddressId] = useState(null);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [openPaymentOption, setOpenPaymentOption] = useState(false);
  const [openSslPayment, setOpenSslPayment] = useState(false);
  const router = useRouter();

  const { token } = auth;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/users/me?populate[0]=addresses`,
          { headers }
        );

        setLoading(false);
        setAddressData(response.data.addresses);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const shoppingCarts = cart.items;
  const cartItems = shoppingCarts.length;

  const subTotal = shoppingCarts.reduce((acc, cur) => {
    const priceToUse = cur.discountPrice ? cur.discountPrice : cur.price;
    const totalPrice = priceToUse * cur.quantity;
    acc += totalPrice;

    return acc;
  }, 0);

  const address = addressData.find((item) => item.id === chosenAddressId);

  const shippingCost = 60;
  const grandTotal = subTotal + shippingCost;

  const handleAddressSelect = (addressId: any) => {
    setChosenAddressId(addressId);
  };

  // This is for open and close payment option
  const handlePaymentOption = () => {
    setOpenPaymentOption(!openPaymentOption);
  };

  const handleSslPaymentList = () => {
    setOpenSslPayment(!openSslPayment);
  };

  const handleCashOnDelivery = (value: boolean) => {
    setCashOnDelivery(value);
  };

  const handleCheckoutBtn = async () => {
    if (chosenAddressId) {
      handlePaymentOption();
    } else {
      toast.error("Please select a address");
    }
  };

  const handleOrderSubmit = async () => {
    if (cashOnDelivery) {
      try {
        setLoading(true);
        handlePaymentOption();
        const headers = {
          Authorization: `Bearer ${auth.token}`,
        };
        const data = {
          users_permissions_user: auth.userId,
          products: shoppingCarts,
          totalPrice: grandTotal,
          paid: false,
          address: address,
          status: "order placed",
        };
        const responsePromise = axios.post(
          `${process.env.NEXT_PUBLIC_API_KEY}/orders`,
          { data },
          { headers }
        );

        toast.promise(
          responsePromise,
          {
            loading: "Order Processing...",
            success: "Order Completed",
            error: (error: any) => {
              return `${error?.response?.data?.error?.message}`;
            },
          },
          {
            error: {
              duration: 5000,
            },
          }
        );

        const response = await responsePromise;

        const orderId = response.data.data.id;
        setLoading(false);
        router.push(`/payment/order-success/${orderId}`);
      } catch (error) {
        setLoading(false);
      }
    } else {
      toast.error("Please set your payment method");
    }
  };

  const handleOtherPayment = async () => {
    try {
      setLoading(true);
      const toastId = toast.loading("Please Wait...");

      setCashOnDelivery(false);

      if (chosenAddressId !== null) {
        const data = {
          address: address,
          totalPrice: grandTotal,
          products: shoppingCarts,
        };
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/payment`,
          {
            data,
          }
        );
        setLoading(false);
        toast.dismiss(toastId);

        if (response.data.data?.status === "SUCCESS") {
          setPaymentData({
            gw: response.data?.data?.gw,
            desc: response.data?.data?.desc,
          });
          handleSslPaymentList();
          handlePaymentOption();
        } else {
          toast.error(
            "Something went wrong, Please check your network and Try again"
          );
        }
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Something went wrong, Please try again");
    }
  };

  return (
    <Box className={styles.checkout}>
      <Grid container>
        <Grid order={{ xs: 2, lg: 1 }} item xs={12} lg={8}>
          <Box className={styles.checkout__leftItem}>
            <AddressInfo
              selectId={chosenAddressId}
              handleAddressSelect={handleAddressSelect}
            />
            <Box className={styles.checkout__orderItems}>
              {shoppingCarts.map((item) => (
                <OrderItems
                  key={item.productId}
                  imgSrc={item.imgSrc}
                  price={item.price}
                  discountPrice={item.discountPrice}
                  quantity={item.quantity}
                  title={item.title}
                  sx={{ borderBottom: "1px solid #e6e6e6;" }}
                />
              ))}
            </Box>
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
              handleBtn={handleCheckoutBtn}
            />
          </Box>
        </Grid>
      </Grid>
      <ToasterMsg />
      <PaymentMethodDialog
        open={openPaymentOption}
        handleOpen={handlePaymentOption}
        handleCashOnDelivery={handleCashOnDelivery}
        cashOnDelivery={cashOnDelivery}
        handleOtherPayment={handleOtherPayment}
        handleOrderSubmit={handleOrderSubmit}
        loading={loading}
      />
      <SSLPaymentList
        paymentData={paymentData}
        open={openSslPayment}
        handleOpen={handleSslPaymentList}
      />
    </Box>
  );
};

export default Checkout;
