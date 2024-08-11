import { ProductState } from "@/utils/typesDefine/productSliceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

// Define initial state
const initialState: ProductState = {
  items: [],
  loading: false,
  errorMsg: "",
  meta: {},
};

// Define async thunk for fetching products with pagination
export const fetchProducts = createAsyncThunk(
  "products/fetchItems",
  async (pagination: string = "") => {
    try {
      const response = await axios.get(
        `${API_URL}/products?populate[tags]=true&populate[category]=true&populate[images]=treu&populate[users_permissions_user][populate]=image&${pagination}`
      );
      return {
        data: response?.data.data,
        hasMore:
          response?.data.meta.pagination.page <
          response?.data.meta.pagination.pageCount,
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
);

// Create slice for products
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.errorMsg = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload.data];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = "Error fetching products";
      });
  },
});

// Export actions and reducer
export default productSlice.reducer;
