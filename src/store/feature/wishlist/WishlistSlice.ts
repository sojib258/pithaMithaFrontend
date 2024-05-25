import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface WishlistData {
  productId: number;
  title: string;
  price: number;
  discountPrice?: number;
  imgSrc: string;
  altText?: string;
  isServiceAvailable: boolean;
}

interface WishlistSliceType {
  items: WishlistData[];
}

const initialState: WishlistSliceType = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<WishlistData>) => {
      const productExist = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (productExist === -1) {
        state.items.unshift(action.payload);
      }
    },
    removeWishlist: (
      state,
      action: PayloadAction<{ productId: string | number }>
    ) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
  },
});

export const { addToWishList, removeWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
