import { OrderState } from "@/utils/typesDefine/orderSliceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const initialState: OrderState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const token = Cookies.get("myAppAuthToken");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.get(`${API_URL}/orders`, { headers });

  return response.data.data.map((order: any) => {
    const products =
      typeof order.attributes.products === "string"
        ? JSON.parse(order.attributes.products)
        : order.attributes.products;

    const address =
      typeof order.attributes.address === "string"
        ? JSON.parse(order.attributes.address)
        : order.attributes.address;

    return {
      id: order.id,
      status: order.attributes.status,
      totalPrice: order.attributes.totalPrice,
      paid: order.attributes.paid,
      products,
      address,
      createdAt: order.attributes.createdAt,
    };
  });
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      });
  },
});

export default orderSlice.reducer;
