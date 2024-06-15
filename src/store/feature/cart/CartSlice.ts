import { CartSliceType, ProductData } from "@/utils/typesDefine/cartSliceTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: CartSliceType = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        sellerId: number;
        firstName: string;
        lastName?: string;
        sellerImg?: string;
        responseTime?: number;
        averageResponseTime?: number;
        product: ProductData;
      }>
    ) => {
      const {
        sellerId,
        firstName,
        lastName,
        sellerImg,
        responseTime,
        averageResponseTime,
        product,
      } = action.payload;
      const existingSeller = state.items.find(
        (item) => item.userId === sellerId
      );

      if (existingSeller) {
        existingSeller.averageResponseTime = averageResponseTime;
        const existingProduct = existingSeller.products.find(
          (p) => p.productId === product.productId
        );
        if (existingProduct) {
          existingProduct.quantity += product.quantity;
        } else {
          existingSeller.products.push(product);
        }
      } else {
        state.items.push({
          userId: sellerId,
          firstName: firstName,
          lastName: lastName,
          sellerImg: sellerImg,
          status: "",
          responseTime: responseTime,
          averageResponseTime: averageResponseTime,
          products: [product],
        });
      }
    },
    updateCart: (
      state,
      action: PayloadAction<{
        sellerId: number;
        productId: number;
        quantity: number;
        type: string;
      }>
    ) => {
      const { sellerId, productId, type } = action.payload;
      const existingSeller = state.items.find(
        (item) => item.userId === sellerId
      );

      if (existingSeller) {
        const existingProduct = existingSeller.products.find(
          (p) => p.productId === productId
        );
        if (existingProduct) {
          const updatedQuantity =
            type === "increment"
              ? existingProduct.quantity + 1
              : existingProduct.quantity - 1;

          existingProduct.quantity = updatedQuantity;
        }
      }
    },
    removeToCart: (
      state,
      action: PayloadAction<{ sellerId: number; productId: number }>
    ) => {
      const { sellerId, productId } = action.payload;
      const existingSeller = state.items.find(
        (item) => item.userId === sellerId
      );

      if (existingSeller) {
        existingSeller.products = existingSeller.products.filter(
          (p) => p.productId !== productId
        );
        if (existingSeller.products.length === 0) {
          state.items = state.items.filter((item) => item.userId !== sellerId);
        }
      }
    },
    deleteAllCarts: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateCart, removeToCart, deleteAllCarts } =
  cartSlice.actions;
export default cartSlice.reducer;
