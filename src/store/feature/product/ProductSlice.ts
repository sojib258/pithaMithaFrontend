import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
  ratingValue?: number;
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
    const response = await axios.get(`${API_URL}/products?populate=*`);
    return response.data.data;
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
        state.items = action.payload.map((item: any) => ({
          id: item.id,
          attributes: {
            name: item.attributes.name,
            description: item.attributes.description,
            price: item.attributes.price,
            createdAt: item.attributes.createdAt,
            updatedAt: item.attributes.updatedAt,
            publishedAt: item.attributes.publishedAt,
            stock: item.attributes.stock,
            discountPrice: item.attributes.discountPrice,
            Availability: item.attributes.Availability,
            ratingValue: item.attributes.ratingValue,
            isPopular: item.attributes.isPopular,
            isFeatured: item.attributes.isFeatured,
            isHotDeals: item.attributes.isHotDeals,
            category: {
              id: item.attributes.category.data?.id,
              name: item.attributes.category.data?.attributes?.name,
              description:
                item.attributes.category.data?.attributes?.description,
            },
            images: item.attributes.images.data.slice(-4).map((image: any) => ({
              id: image.id,
              alternativeText: image.attributes.alternativeText,
              width: image.attributes.width,
              height: image.attributes.height,
              url: image.attributes.url,
              formats: Object.keys(image.attributes.formats).reduce(
                (acc: Record<string, FormatImage>, key: string) => {
                  acc[key] = {
                    width: image.attributes.formats[key].width,
                    height: image.attributes.formats[key].height,
                    url: image.attributes.formats[key].url,
                  };
                  return acc;
                },
                {}
              ),
            })),
          },
        }));
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
