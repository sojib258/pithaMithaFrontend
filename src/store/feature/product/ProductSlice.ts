import {
  FormatImage,
  ProductState,
} from "@/utils/typesDefine/productSliceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

// Define initial state
const initialState: ProductState = {
  items: [],
  loading: false,
  errorMsg: "",
  page: 1,
  hasMore: true,
};

// Define async thunk for fetching products with pagination
export const fetchItems = createAsyncThunk(
  "products/fetchItems",
  async (page: number) => {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        params: {
          populate: {
            tags: true,
            category: true,
            images: true,
            users_permissions_user: {
              populate: "image",
            },
          },
          pagination: {
            page,
            pageSize: 10,
          },
        },
      });
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
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.errorMsg = "";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.data) {
          state.items = [
            ...state.items,
            ...action.payload.data.map((item: any) => ({
              id: item.id,
              attributes: {
                name: item.attributes.name,
                shortDescription: item.attributes.shortDescription,
                description: item.attributes.description,
                price: item.attributes.price,
                weight: item.attributes.weight,
                createdAt: item.attributes.createdAt,
                updatedAt: item.attributes.updatedAt,
                publishedAt: item.attributes.publishedAt,
                stock: item.attributes.stock,
                discountPrice: item.attributes.discountPrice,
                isServiceAvailable: item.attributes.serviceAvailable,
                isPopular: item.attributes.isPopular,
                isFeatured: item.attributes.isFeatured,
                isHotDeals: item.attributes.isHotDeals,
                averageRating: item.attributes.averageRating,
                location: item.attributes.location,
                category: {
                  id: item.attributes.category.data?.id,
                  name: item.attributes.category.data?.attributes?.name,
                  description:
                    item.attributes.category.data?.attributes?.description,
                },
                seller: {
                  sellerId: item.attributes.users_permissions_user.data?.id,
                  firstName:
                    item.attributes.users_permissions_user.data.attributes
                      .firstName,
                  lastName:
                    item.attributes.users_permissions_user.data.attributes
                      ?.lastName,
                  sellerImg:
                    item.attributes.users_permissions_user.data.attributes.image
                      ?.data?.attributes?.url,
                  responseTime:
                    item.attributes.users_permissions_user.data.attributes
                      ?.responseTime,
                  averageResponseTime:
                    item.attributes.users_permissions_user.data.attributes
                      ?.averageResponseTime,
                },
                tags: item.attributes.tags.data.map((tag: any) => ({
                  id: tag.id,
                  name: tag.attributes.name,
                })),
                images: item.attributes.images.data
                  ?.slice(-4)
                  .map((image: any) => ({
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
            })),
          ];
          state.page = state.page + 1;
          state.hasMore = action.payload.hasMore;
        } else {
          state.hasMore = false; // If no data, set hasMore to false
          state.loading = false;
        }
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = "Error fetching products";
      });
  },
});

// Export actions and reducer
export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
