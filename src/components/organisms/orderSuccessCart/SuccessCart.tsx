"use client";
import Button from "@/components/atoms/button/Button";
import { deleteAllCarts } from "@/store/feature/cart/CartSlice";
import { RootState } from "@/store/store";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./scucessCart.module.scss";
interface SuccessCartProps {
  orderId: string;
}
interface initialData {
  id: string | number;
  attributes: {
    paid: boolean;
    totalPrice: number | null;
    transactionId: number | string;
    address: {
      id: number | string;
      fullName: string;
      number: number | string;
      email: string;
      address: string;
    };
  };
}
const initData = {
  id: "",
  attributes: {
    paid: false,
    totalPrice: null,
    transactionId: "",
    address: {
      id: "",
      address: "",
      fullName: "",
      number: "",
      email: "",
    },
  },
};
const SuccessCart: React.FC<SuccessCartProps> = ({ orderId }) => {
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState<initialData>(initData);
  dispatch(deleteAllCarts());
  const router = useRouter();

  const handleTrackOrder = () => {
    router.push(`/order-history/order-details/${orderId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}/orders/${orderId}?filters[users_permissions_user]=${userId}`,
          { headers }
        );

        setOrderDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, orderId, userId]);

  console.log("OrderD", orderDetails);
  const { paid, totalPrice, address, transactionId } = orderDetails.attributes;
  const { address: deliveryAddress, fullName, number, email } = address;
  return (
    <Box className={styles.cart}>
      <Box className={styles.cart__wrapper}>
        <Box className={styles.cart__header}>
          <Box className={styles.cart__icon}>
            <Image
              className={styles.cart__checkIcon}
              width={100}
              height={100}
              src={"/icons/success.png"}
              alt={"check-icon"}
            />
          </Box>
          <Typography className={styles.cart__successTitle} component={"h2"}>
            Order Successful
          </Typography>
        </Box>
        <Box className={styles.cart__body}>
          <Box className={styles.cart__list}>
            <Typography className={styles.cart__listKey}>Order ID</Typography>
            <Typography className={styles.cart__listValue}>
              #{orderId}
            </Typography>
          </Box>
          <Box className={styles.cart__list}>
            <Typography className={styles.cart__listKey}>
              Payment Type
            </Typography>
            <Typography className={styles.cart__listValue}>
              {paid ? "Mobile Banking" : "Cash On Delivery"}
            </Typography>
          </Box>
          <Box className={styles.cart__list}>
            <Typography className={styles.cart__listKey}>
              Payment Status
            </Typography>
            <Typography className={styles.cart__listValue}>
              {paid ? "Paid" : "Not Paid"}
            </Typography>
          </Box>
          <Box className={styles.cart__list}>
            <Typography className={styles.cart__listKey}>Mobile</Typography>
            <Typography className={styles.cart__listValue}>{number}</Typography>
          </Box>
          <Box className={styles.cart__list}>
            <Typography className={styles.cart__listKey}>Email</Typography>
            <Typography className={styles.cart__listValue}>
              {email ? email : ""}
            </Typography>
          </Box>
          <Box className={styles.cart__list}>
            <Typography className={styles.cart__listKey}>
              Delivery Address
            </Typography>
            <Typography className={styles.cart__listValue}>
              {deliveryAddress}
            </Typography>
          </Box>
          <Box className={styles.cart__amountList}>
            <Typography className={styles.cart__amountKey}>
              Ammount Paid
            </Typography>
            <Typography className={styles.cart__amountValue}>
              <Image
                width={40}
                height={40}
                src={"/icons/taka.png"}
                alt="Taka Logo"
                className={styles.cart__currencyIcon}
              />
              {totalPrice}
            </Typography>
          </Box>
          <Box className={styles.cart__list}>
            <Typography className={styles.cart__listKey}>
              Transaction ID
            </Typography>
            <Typography className={styles.cart__listValue}>
              {transactionId}
            </Typography>
          </Box>
        </Box>
        <Box className={styles.cart__footer}>
          <Button
            onClick={handleTrackOrder}
            sx={{ width: "100%" }}
            text="Track Order"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SuccessCart;
