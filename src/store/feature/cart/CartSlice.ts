import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartData {
  productId: number;
  title: string;
  imgSrc: string;
  altText?: string;
  quantity: number;
  price: number;
  discountPrice?: number;
  isServiceAvailable: boolean;
}

interface CartSliceType {
  items: CartData[];
}

const initialState: CartSliceType = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartData>) => {
      state.items.unshift(action.payload);
    },
    updateCart: (
      state,
      action: PayloadAction<{
        quantity: number;
        type: string;
        productId: number | string;
      }>
    ) => {
      const toBeUpdatedIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      const updatedQuantity =
        action.payload.type === "increment"
          ? state.items[toBeUpdatedIndex].quantity + 1
          : state.items[toBeUpdatedIndex].quantity - 1;

      state.items[toBeUpdatedIndex] = {
        ...state.items[toBeUpdatedIndex],
        quantity: updatedQuantity,
      };
    },
    handleAlreadyExistInCart: (
      state,
      action: PayloadAction<{
        quantity: number;
        productId: number | string;
      }>
    ) => {
      const toBeUpdatedIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );
      const updatedQuantity =
        state.items[toBeUpdatedIndex].quantity + action.payload.quantity;

      state.items[toBeUpdatedIndex] = {
        ...state.items[toBeUpdatedIndex],
        quantity: updatedQuantity,
      };
    },
    removeToCart: (
      state,
      action: PayloadAction<{ productId: string | number }>
    ) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
    deleteAllCarts: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  updateCart,
  removeToCart,
  handleAlreadyExistInCart,
  deleteAllCarts,
} = cartSlice.actions;
export default cartSlice.reducer;
