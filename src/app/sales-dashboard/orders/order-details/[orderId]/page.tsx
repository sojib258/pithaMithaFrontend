"use client";
import ResponseTime from "@/components/molecules/responseTime/ResponseTime";
import AddressSkeleton from "@/components/molecules/skeleton/address/AddressSkeleton";
import TableSkeleton from "@/components/molecules/skeleton/table/TableSkeleton";
import AddressCart from "@/components/organisms/address/addressCart/AddressCart";
import OrderDetailsTable from "@/components/organisms/orderDetailsTable/OrderDetailsTable";
import { RootState } from "@/store/store";
import timeFormat from "@/utils/timeFormat";
import { Order } from "@/utils/typesDefine/orderSliceTypes";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.scss";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const Page = ({ params }: { params: { orderId: string } }) => {
  const { orderId: orderIdString } = params;
  const orderId = parseInt(orderIdString);

  const { auth } = useSelector((state: RootState) => state);
  const [orderData, setOrderData] = useState<Order>();
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);
  const [responseTime, setResponseTime] = useState<number>(0);

  const sellerOrder = orderData?.sellers.find(
    (seller) => seller.userId === auth.userId
  );

  const formatedTime =
    sellerOrder?.responseTime && timeFormat(sellerOrder?.responseTime);

  const handleLoading = (value: boolean) => {
    setLoading(value);
  };

  const handleReRender = () => {
    setRender(!render);
  };

  const handleElapsedTimeUpdate = (elapsedTime: number) => {
    setResponseTime(elapsedTime);
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
        rootStatus: responseData.attributes.rootStatus,
        totalPrice: responseData.attributes.totalPrice,
        paid: responseData.attributes.paid,
        transactionId: responseData.attributes.transactionId,
        sellers: responseData.attributes.sellers,
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
              {loading ? (
                <AddressSkeleton />
              ) : (
                orderData?.address && (
                  <AddressCart addressData={orderData.address} />
                )
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={styles.order__responseTime}>
              {sellerOrder?.status === "order placed" ? (
                orderData?.createdAt && (
                  <>
                    <Typography className={styles.order__responseText}>
                      Response Time:
                    </Typography>
                    <Typography className={styles.order__responseTimeText}>
                      <ResponseTime
                        onElapsedTimeUpdate={handleElapsedTimeUpdate}
                        startTime={orderData.createdAt}
                      />
                    </Typography>
                  </>
                )
              ) : (
                <>
                  <Typography className={styles.order__responseText}>
                    Response Time:
                  </Typography>
                  <Typography className={styles.order__responseTimeText}>
                    {formatedTime}
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.order__tableSection}>
        {loading ? (
          <TableSkeleton />
        ) : (
          orderData &&
          sellerOrder && (
            <OrderDetailsTable
              sellerOrder={sellerOrder}
              orderId={orderData.id}
              rootStatus={orderData.rootStatus}
              date={orderData?.createdAt}
              paid={orderData.paid}
              token={auth.token}
              userId={auth.userId}
              loading={loading}
              handleLoading={handleLoading}
              handleRender={handleReRender}
              elapsedTime={responseTime}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default Page;
