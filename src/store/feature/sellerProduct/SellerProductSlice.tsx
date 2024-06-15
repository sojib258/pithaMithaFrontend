import {
  FormatImageData,
  SellerProductState,
} from "@/utils/typesDefine/sellerProductTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

const initialState: SellerProductState = {
  items: [],
  loading: false,
  errorMsg: "",
};
export const fetchSellerProduct = createAsyncThunk(
  "seller/fetchItems",
  async () => {
    try {
      const token = Cookies.get("myAppAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${API_URL}/users/me?[populate][products][populate][0]=images&[populate][products][populate][1]=category&[populate][products][populate][2]=tags&[populate][products][populate][3]=ratings`,
        { headers }
      );

      console.log("SSSSSSSSS", response);
      return response?.data;
    } catch (error: any) {
      console.error("Error from sellerProductSlice", error);
      return error?.message;
    }
  }
);
const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(fetchSellerProduct.pending, (state) => {
        (state.loading = true), (state.errorMsg = "");
      })
      .addCase(fetchSellerProduct.fulfilled, (state, action) => {
        (state.loading = false),
          (state.items = action.payload.products.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            shortDescription: item.shortDescription,
            price: item.price,
            discountPrice: item.discountPrice,
            averageRating: item.averageRating,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            publishedAt: item.publishedAt,
            stock: item.stock,
            isServiceAvailable: item.serviceAvailable,
            category: {
              id: item?.category?.id,
              name: item?.category?.name,
              description: item?.category?.description,
            },
            tags: item?.tags?.map((tag: any) => ({
              id: tag?.id,
              name: tag?.name,
            })),
            seller: {
              sellerId: action.payload.id,
              firstName: action.payload.firstName,
              lastName: action.payload?.lastName,
              sellerImg: action.payload?.sellerImg,
              averageResponseTime: action.payload?.averageResponsetime,
            },
            weight: item.weight,
            completedDays: item.completedDays,
            isPopular: item.isPopular,
            isFeatured: item.isFeatured,
            isHotDeals: item.isHotDeals,
            images: item.images.map((imageItem: any) => ({
              id: imageItem.id,
              width: imageItem.width,
              height: imageItem.height,
              url: imageItem.url,
              alternativeText: imageItem.alternativeText,
              formats: Object.keys(
                imageItem?.formats ? imageItem?.formats : {}
              ).reduce((acc: Record<string, FormatImageData>, key: string) => {
                acc[key] = {
                  width: imageItem.formats[key].width,
                  height: imageItem.formats[key].height,
                  url: imageItem.formats[key].url,
                };
                return acc;
              }, {}),
            })),
          })));
      })
      .addCase(fetchSellerProduct.rejected, (state) => {
        (state.loading = false),
          (state.errorMsg = "Error from fetchSellerProduct");
      });
  },
});

export const {} = sellerProductSlice.actions;
export default sellerProductSlice.reducer;
