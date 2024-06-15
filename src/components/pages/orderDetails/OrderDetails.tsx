"use client";
import Button from "@/components/atoms/button/Button";
import DeleteAlert from "@/components/molecules/deleteAlert/DeleteAlert";
import Tracker from "@/components/molecules/tracker/Tracker";
import AddressCart from "@/components/organisms/address/addressCart/AddressCart";
import Products from "@/components/organisms/orderDetailProduct/Product";
import { RootState } from "@/store/store";
import dateFormat from "@/utils/dateFormat";
import timeFormat from "@/utils/timeFormat";
import {
  Order,
  OrderProduct,
  Seller,
} from "@/utils/typesDefine/orderSliceTypes";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import styles from "./orderDetails.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;
interface OrderDetailsProps {
  orderId: number;
}

const initData: Order = {
  id: 0,
  createdAt: "",
  paid: false,
  transactionId: null,
  totalPrice: null,
  rootStatus: "",
  sellers: [],
  address: {
    id: 0,
    fullName: "",
    number: "",
    division: "",
    city: "",
    area: "",
    address: "",
    landmark: "",
    deliveryOption: "",
    createdAt: "",
  },
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const [orderDetails, setOrderDetails] = useState<Order>(initData);
  const [loading, setLoading] = useState(false);
  const [wrongOrderId, setWrongOrderId] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const subTotal = orderDetails.sellers.reduce((acc: number, seller) => {
    const sellerTotal = seller.products.reduce(
      (sellerAcc: number, product: OrderProduct) => {
        const priceToUse = product.discountPrice
          ? product.discountPrice
          : product.price;
        const totalPrice = priceToUse * product.quantity;
        sellerAcc += totalPrice;

        return sellerAcc;
      },
      0
    );
    acc += sellerTotal;
    return acc;
  }, 0);

  const shipping = 60;
  const grandTotal = subTotal + shipping;

  const totalProduct = orderDetails.sellers.reduce((acc, seller) => {
    acc += seller.products.length;
    return acc;
  }, 0);

  const orderDate = orderDetails && dateFormat(orderDetails.createdAt);

  // Check order is cancelled or not
  const orderCancelled = orderDetails.rootStatus === "cancelled";

  const handleOpenAlert = () => {
    setOpenAlert(!openAlert);
  };

  const handleReRender = () => {
    setReRender(!reRender);
  };

  const handleCancelOrder = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setLoading(true);
      handleOpenAlert();

      // Fetch the current order data
      const response = await axios.get(`${API_URL}/orders/${orderId}`, {
        headers,
      });
      const orderData = response.data.data;
      const sellers = orderData.attributes.sellers;

      // handle any of the seller received the order then customer can't cancel order
      const sellerNotReceiveOrder = sellers.every((seller: Seller) => {
        if (seller.status === "order placed") {
          return true;
        }
        return false;
      });

      if (!sellerNotReceiveOrder) {
        setLoading(false);
        alert("Seller received your order. You don't cancel this order");
        handleReRender();
        return;
      }

      const updatedSellers = sellers.map((seller: Seller) => ({
        ...seller,
        status: "cancelled",
      }));

      // Update the order with the new rootStatus and updated sellers
      const cancelPromise = axios.put(
        `${API_URL}/orders/${orderId}`,
        {
          data: {
            rootStatus: "cancelled",
            sellers: updatedSellers,
          },
        },
        { headers }
      );

      toast.promise(
        cancelPromise,
        {
          loading: "Order Cancellation...",
          success: "Order Cancelled",
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

      const cancelResponse = await cancelPromise;
      setLoading(false);
      handleReRender();
    } catch (error) {
      console.error("Error from order cancellation", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setWrongOrderId(false);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${API_URL}/orders/${orderId}`, {
          headers,
        });
        const data = response.data.data;
        setOrderDetails({
          id: data.id,
          createdAt: data.attributes.createdAt,
          paid: data.attributes.paid,
          rootStatus: data.attributes.rootStatus,
          totalPrice: data.attributes.totalPrice,
          transactionId: data.attributes.transactionId,
          address: data.attributes.address,
          sellers: data.attributes.sellers,
        });
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.error("Error fetching data:", error);
        if (error.response.data.data === null) {
          setWrongOrderId(true);
        }
      }
    };

    fetchData(); // Call the async function
  }, [token, orderId, reRender]);

  return (
    <>
      {wrongOrderId ? (
        <Typography>There are no orders are available 😊😊</Typography>
      ) : (
        <Box className={styles.details}>
          <Box className={styles.details__head}>
            <Box className={styles.details__headPara}>
              <Typography className={styles.details__headText}>
                Order Details
              </Typography>
              {loading ? (
                <Skeleton sx={{ width: "200px" }} />
              ) : (
                <Typography className={styles.details__headDate}>
                  {`Placed on ${orderDate?.date}, ${orderDate?.time} (${totalProduct} Products)`}
                </Typography>
              )}
            </Box>
            <Link href={"/order-history"}>
              <Button
                sx={{
                  backgroundColor: "transparent!important",
                  boxShadow: "none",
                  color: "#00b207!important",
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
            {/* Order Address and Price Area Section */}
            <Grid container mb={4}>
              <Grid item xs={12} lg={7}>
                <AddressCart
                  loading={loading}
                  addressData={orderDetails.address}
                />
              </Grid>
              <Grid item xs={12} lg={5}>
                <Box className={styles.details__subTotalArea}>
                  <Box className={styles.details__subTotalHead}>
                    <Box className={styles.details__subTotalLeft}>
                      <Typography
                        className={styles.details__subTotalOrderIdText}
                      >
                        Order Id
                      </Typography>
                      <Typography className={styles.details__subTotalOrderId}>
                        #{orderId}
                      </Typography>
                    </Box>
                    <Box className={styles.details__subTotalRight}>
                      <Typography
                        className={styles.details__subTotalPaymentText}
                      >
                        Payment Method
                      </Typography>
                      <Typography className={styles.details__subTotalPayment}>
                        {orderDetails?.paid
                          ? "Mobile Banking"
                          : "Cash on Delivery"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={styles.details__subBody}>
                    <Box className={styles.details__subBox}>
                      <Typography className={styles.details__boxKey}>
                        Items ({totalProduct})
                      </Typography>
                      <Typography className={styles.details__price}>
                        <Image
                          width={40}
                          height={40}
                          src={"/icons/taka.png"}
                          alt="Taka Logo"
                          className={styles.details__currencyIcon}
                        />
                        {subTotal}
                      </Typography>
                    </Box>
                    <Box className={styles.details__subBox}>
                      <Typography className={styles.details__boxKey}>
                        Shipping
                      </Typography>
                      <Typography className={styles.details__boxPrice}>
                        60
                      </Typography>
                    </Box>
                    <Box className={styles.details__grandBox}>
                      <Typography className={styles.details__grandTotal}>
                        Grand Total:
                      </Typography>
                      <Typography className={styles.details__grandTotal}>
                        <Image
                          width={40}
                          height={40}
                          src={"/icons/taka.png"}
                          alt="Taka Logo"
                          className={styles.details__currencyIcon}
                        />
                        {grandTotal}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Order Cancellation Area */}
            <Box className={styles.details__cancelArea}>
              <Box className={styles.details__cancelInfo}>
                <Typography className={styles.details__cancelHeadText}>
                  Order Cancellation:
                </Typography>
                <Typography className={styles.details__cancelInfoText}>
                  You can&apos;t cancel order if seller received this order.
                </Typography>
              </Box>

              {/* Handle Button for Cancel Order */}
              <Box className={styles.details__cancelBtn}>
                {orderCancelled ? (
                  <Button
                    disabled={true}
                    sx={{
                      boxShadow: "none",
                      color: "#808080 !important",
                      padding: "4px 12px!important",
                      fontSize: ".875rem!important",
                      "&:hover": {
                        textDecoration: "underline",
                        boxShadow: "none!important",
                      },
                    }}
                    text="Order Cancelled"
                  />
                ) : (
                  <Button
                    disabled={loading}
                    sx={{
                      backgroundColor: loading ? " " : "transparent!important",
                      boxShadow: "none",
                      color: loading
                        ? "#808080 !important"
                        : "#00b207!important",
                      padding: "4px 12px!important",
                      fontSize: ".875rem!important",
                      "&:hover": {
                        textDecoration: "underline",
                        boxShadow: "none!important",
                      },
                    }}
                    text="Cancel Order"
                    onClick={handleOpenAlert}
                  />
                )}
              </Box>
              <DeleteAlert
                handleAction={handleCancelOrder}
                message={"Do you want to cancel this order?"}
                btnTextClose="No"
                btnTextAction="Yes"
                open={openAlert}
                handleClose={handleOpenAlert}
              />
            </Box>
            {/* Products Information Area */}
            {orderDetails.sellers.map((seller) => (
              <Box key={seller.userId} className={styles.details__seller}>
                <Box className={styles.details__sellerHead}>
                  <Typography className={styles.details__sellerName}>
                    Seller Name:{" "}
                    <Typography
                      className={styles.details__sellerNameV}
                      component={"span"}
                    >
                      {`${seller.firstName} `}
                      {seller.lastName && seller.lastName}
                    </Typography>
                  </Typography>
                  {seller.averageResponseTime && (
                    <Typography className={styles.details__sellerResponseTime}>
                      Average Response Time:{" "}
                      <Typography
                        className={styles.details__sellerNameV}
                        component={"span"}
                      >
                        {timeFormat(seller.averageResponseTime)}
                      </Typography>
                    </Typography>
                  )}
                </Box>

                <Box className={styles.details__orderProducts}>
                  <Products
                    status={seller.status}
                    productData={seller.products}
                    userId={userId}
                  />
                </Box>
                <Box className={styles.details__tracker}>
                  <Typography className={styles.details__trackHead}>
                    Order Track:
                  </Typography>
                  <Tracker status={seller.status} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default OrderDetails;
