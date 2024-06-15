"use client";
import OrdersTable from "@/components/organisms/ordersTable/OrdersTable";
import { fetchOrders } from "@/store/feature/order/OrderSlice";
import { fetchSellerProduct } from "@/store/feature/sellerProduct/SellerProductSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const { orders, auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const { items: orderItems, loading } = orders;

  const sellerOrders = orderItems
    .filter((order) =>
      order.sellers.some((seller) => seller.userId === auth.userId)
    )
    .map((order) => {
      const sellerInfo = order.sellers.find(
        (seller) => seller.userId === auth.userId
      );
      return {
        orderId: order.id,
        date: order.createdAt,
        seller: sellerInfo,
      };
    });

  useEffect(() => {
    dispatch(fetchSellerProduct() as any);
    dispatch(fetchOrders() as any);
  }, [dispatch]);

  return <OrdersTable loading={loading} sellerOrders={sellerOrders} />;
};

export default Page;
