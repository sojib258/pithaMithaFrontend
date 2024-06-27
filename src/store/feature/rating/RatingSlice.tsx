import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

type Image = {
  imageId: number;
  width: number;
  height: number;
  url: string;
  altText?: string;
};

type User = {
  firstName: string;
  lastName?: string;
  userId: string | number;
  width?: number;
  height?: number;
  imgSrc?: string;
  altText?: string;
};

type Data = {
  ratingId: number;
  ratingValue: number;
  comment: string;
  images?: Image[];
  publishedAt: string;
  user: User;
};

type InitialState = {
  items: Data[];
  loading: boolean;
  errorMsg: string;
};

const initialState: InitialState = {
  items: [],
  loading: false,
  errorMsg: "",
};

export const fetchRatingData = createAsyncThunk(
  "ratings/fetchRatingData",
  async (productId: number) => {
    try {
      const response = await axios.get(
        `${API_URL}/products/${productId}?populate[ratings][populate][users_permissions_user][populate]=image&populate[ratings][populate]=images`
      );

      return response.data.data;
    } catch (error: any) {
      console.error("Error from RatingSlice", error);
      return error?.message;
    }
  }
);

const RatingSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatingData.pending, (state) => {
        state.loading = true;
        state.errorMsg = "";
      })
      .addCase(fetchRatingData.fulfilled, (state, action) => {
        (state.loading = false),
          (state.items = action.payload?.attributes?.ratings?.data.map(
            (rating: any) => ({
              ratingId: rating.id,
              comment: rating.attributes.comment,
              publishedAt: rating.attributes.publishedAt,
              ratingValue: rating.attributes.ratingValue,
              images: rating.attributes?.images?.data?.map((image: any) => ({
                imageId: image?.id,
                width: image?.attributes?.width,
                height: image?.attributes?.height,
                url: image?.attributes?.url,
                altText: image?.attributes?.alternativeText,
              })),
              user: {
                userId: rating.attributes?.users_permissions_user?.data?.id,
                firstName:
                  rating.attributes?.users_permissions_user.data.attributes
                    ?.firstName,
                lastName:
                  rating.attributes?.users_permissions_user?.data?.attributes
                    ?.lastName,
                imgSrc:
                  rating.attributes?.users_permissions_user?.data?.attributes
                    ?.image?.data?.attributes?.url,
                width:
                  rating.attributes?.users_permissions_user?.data?.attributes
                    ?.image?.data?.attributes?.width,
                height:
                  rating.attributes?.users_permissions_user?.data?.attributes
                    ?.image?.data?.attributes?.height,
                altText:
                  rating.attributes?.users_permissions_user?.data?.attributes
                    ?.image?.data?.attributes?.alternativeText,
              },
            })
          ));
      })
      .addCase(fetchRatingData.rejected, (state) => {
        (state.loading = false), (state.errorMsg = "Error from fetchRatings");
      });
  },
});

export const {} = RatingSlice.actions;
export default RatingSlice.reducer;
