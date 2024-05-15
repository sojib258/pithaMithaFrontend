"use client";
import Button from "@/components/atoms/button/Button";
import Label from "@/components/atoms/label/Label";
import Tracker from "@/components/molecules/tracker/Tracker";
import Products from "@/components/organisms/orderDetailProduct/Product";
import { RootState } from "@/store/store";
import dateFormat from "@/utils/dateFormat";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./orderDetails.module.scss";
interface OrderDetailsProps {
  orderId: string | number;
}

type Products = {
  productId: number | string;
  title: string;
  price: number;
  discountPrice: number;
  imgSrc: string;
  altText?: string;
  quantity: number;
};

type Address = {
  addressId: number | string;
  fullName: string;
  number: number | string;
  division: string;
  city: string;
  area: string;
  address: string;
  landmark: string;
  deliveryOption: string;
};

type OrderDetails = {
  orderId: string | number;
  date: string;
  paid: boolean;
  transactionId: number | null;
  totalPrice: number | null;
  status: string;
  products: Products[];
  address: Address;
};

const initData = {
  orderId: "",
  date: "",
  paid: false,
  transactionId: null,
  totalPrice: null,
  status: "",
  products: [],
  address: {
    addressId: "",
    fullName: "",
    number: "",
    division: "",
    city: "",
    area: "",
    address: "",
    landmark: "",
    deliveryOption: "",
  },
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>(initData);
  const [loading, setLoading] = useState(false);
  const [wrongOrderId, setWrongOrderId] = useState(false);
  const router = useRouter();
  // Fetch Product by OrderId
  const { fullName, number, address, area, city, division, deliveryOption } =
    orderDetails.address;
  const orderItems = orderDetails.products;

  const cartItems = orderItems.length;

  const subTotal = orderItems.reduce((acc, cur) => {
    const priceToUse = cur.discountPrice ? cur.discountPrice : cur.price;
    const totalPrice = priceToUse * cur.quantity;
    acc += totalPrice;

    return acc;
  }, 0);

  const shippingCost = 60;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setWrongOrderId(false);
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/orders/${orderId}`,
          { headers }
        );
        const data = response.data.data;
        setOrderDetails({
          orderId: data.id,
          date: data.attributes.createdAt,
          paid: data.attributes.paid,
          status: data.attributes.status,
          totalPrice: data.attributes.totalPrice,
          transactionId: data.attributes.transactionId,
          address: data.attributes.address,
          products: data.attributes.products,
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

    fetchData(); // Call the async function immediately
  }, [token, orderId]);

  const orderDate = orderDetails && dateFormat(orderDetails.date);

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
              <Typography className={styles.details__headDate}>
                {`Placed on ${orderDate?.date}, ${orderDate?.time} (${orderItems.length} Products)`}
              </Typography>
            </Box>
            <Link href={"/order-history"}>
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
                    {loading ? (
                      <Skeleton className={styles.skeleton__text} />
                    ) : (
                      fullName
                    )}
                  </Typography>
                  <Typography className={styles.details__addressLocation}>
                    {loading ? (
                      <Skeleton className={styles.skeleton__text} />
                    ) : (
                      address
                    )}
                  </Typography>
                  <Typography className={styles.details__addressDivision}>
                    {loading ? (
                      <Skeleton className={styles.skeleton__text} />
                    ) : (
                      `${area}, ${city}, ${division}`
                    )}
                  </Typography>
                  {loading ? (
                    <Skeleton className={styles.skeleton__text} />
                  ) : (
                    deliveryOption && <Label text={deliveryOption} />
                  )}

                  <Typography
                    component={"span"}
                    className={styles.details__addressNumber}
                  >
                    {loading ? (
                      <Skeleton className={styles.skeleton__text} />
                    ) : (
                      number
                    )}
                  </Typography>
                </Box>
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
                        {orderId}
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
                        Items ({orderItems.length})
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
                        {orderDetails?.totalPrice}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box className={styles.details__tracker}>
              <Typography className={styles.details__trackHead}>
                Order Track:
              </Typography>
              <Tracker status={orderDetails?.status} />
            </Box>
            <Box className={styles.details__orderProducts}>
              <Products status={orderDetails.status} productData={orderItems} />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default OrderDetails;
