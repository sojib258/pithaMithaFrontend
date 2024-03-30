import getAllProducts from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

// Define interfaces
interface FormatImage {
  width: number;
  height: number;
  url: string;
}

interface ImageData {
  id: number;
  alternativeText: string;
  width: number;
  height: number;
  url: string;
  formats: Record<string, FormatImage>;
}

interface Category {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ProductAttributes {
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  stock: number;
  discountPrice?: number;
  Availability: boolean;
  category: Category;
  isPopular: boolean;
  isFeatured: boolean;
  isHotDeals: boolean;
  images: ImageData[];
}

interface ProductData {
  id: number;
  attributes: ProductAttributes;
}

interface ProductState {
  items: ProductData[];
  loading: boolean;
  errorMsg: string;
}

// Define initial state
const initialState: ProductState = {
  items: [],
  loading: false,
  errorMsg: "",
};

// Define async thunk for fetching products
export const fetchItems = createAsyncThunk("products/fetchItems", async () => {
  try {
    const response = await getAllProducts();
    return response.data;
  } catch (error) {
    return `Error fetching products ${error}`;
  }
});

// Create slice for products
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.payload as string;
      });
  },
});

// Export actions and reducer
export const {} = productSlice.actions;
export default productSlice.reducer;
