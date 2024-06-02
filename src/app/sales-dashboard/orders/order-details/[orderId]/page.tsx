"use client";
import AddressCart from "@/components/organisms/address/addressCart/AddressCart";
import OrderDetailsTable from "@/components/organisms/orderDetailsTable/OrderDetailsTable";
import { RootState } from "@/store/store";
import { Order } from "@/utils/typesDefine/orderSliceTypes";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const Page = ({ params }: { params: { orderId: string } }) => {
  const { orderId: orderIdString } = params;
  const orderId = parseInt(orderIdString);

  const { auth, sellerProduct } = useSelector((state: RootState) => state);
  const [orderData, setOrderData] = useState<Order>();
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);

  const sellerProductIds = sellerProduct.items.map((product) => product.id);

  const handleLoading = (value: boolean) => {
    setLoading(value);
  };

  const handleReRender = () => {
    setRender(!render);
  };

  const fetchOrderData = useCallback(async () => {
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${auth.token}`,
      };
      const response = await axios.get(`${API_URL}/orders/${orderId}`, {
        headers,
      });
      const responseData = response.data.data;

      const order: Order = {
        id: responseData.id,
        status: responseData.attributes.status,
        totalPrice: responseData.attributes.totalPrice,
        paid: responseData.attributes.paid,
        transactionId: responseData.attributes.transactionId,
        products: responseData.attributes.products.map((product: any) => ({
          productId: product.productId,
          title: product.title,
          imgSrc: product.imgSrc,
          altText: product.altText,
          quantity: product.quantity,
          price: product.price,
          isServiceAvailable: product.isServiceAvailable,
          discountPrice: product.discountPrice,
        })),
        address: {
          id: responseData.attributes.address.id,
          city: responseData.attributes.address.city,
          area: responseData.attributes.address.area,
          division: responseData.attributes.address.division,
          address: responseData.attributes.address.address,
          number: responseData.attributes.address.number,
          fullName: responseData.attributes.address.fullName,
          landmark: responseData.attributes.address.landmark,
          createdAt: responseData.attributes.address.createdAt,
          deliveryOption: responseData.attributes.address.deliveryOption,
        },
        createdAt: responseData.attributes.createdAt,
      };
      setOrderData(order);
      setLoading(false);
    } catch (error) {
      console.error("Error from fetch order data", error);
      setLoading(false);
    }
  }, [auth.token, orderId]);

  useEffect(() => {
    fetchOrderData();
  }, [fetchOrderData, render]);

  return (
    <Box className={styles.order}>
      <Box className={styles.order__topSection}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box className={styles.order__address}>
              {orderData?.address && (
                <AddressCart
                  loading={loading}
                  addressData={orderData.address}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={styles.order__responseTime}>
              <Typography>Response Time:</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.order__tableSection}>
        {orderData && (
          <OrderDetailsTable
            sellerProductIds={sellerProductIds}
            orderData={orderData}
            token={auth.token}
            loading={loading}
            handleLoading={handleLoading}
            handleRender={handleReRender}
          />
        )}
      </Box>
    </Box>
  );
};

export default Page;
