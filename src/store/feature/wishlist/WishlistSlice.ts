import { CartSliceData, ProductData } from "@/utils/typesDefine/cartSliceTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface WishlistSliceType {
  items: CartSliceData[];
}

const initialState: WishlistSliceType = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishList: (
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
        averageResponseTime,
        product,
      } = action.payload;
      const existingSeller = state.items.find(
        (seller) => seller.userId === sellerId
      );

      if (existingSeller) {
        const productIndex = existingSeller.products.findIndex(
          (item) => item.productId === product.productId
        );
        if (productIndex !== -1) {
          // Product exists, remove it
          existingSeller.products.splice(productIndex, 1);
          toast.success("Remove from Wishlist");
          // If no products left for this seller, remove the seller
          if (existingSeller.products.length === 0) {
            state.items = state.items.filter(
              (seller) => seller.userId !== sellerId
            );
          }
        } else {
          // Product doesn't exist, add it
          existingSeller.products.push(product);
          toast.success("Added to Wishlist");
        }
      } else {
        // Seller doesn't exist, add seller with product
        state.items.push({
          userId: sellerId,
          firstName: firstName,
          lastName: lastName,
          sellerImg: sellerImg,
          status: "",
          averageResponseTime: averageResponseTime,
          products: [product],
        });
        toast.success("Added to Wishlist");
      }
    },
    addToWishlist: (
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
        averageResponseTime,
        product,
      } = action.payload;

      const existingSeller = state.items.find(
        (seller) => seller.userId === sellerId
      );

      if (existingSeller) {
        const productExist = existingSeller.products.find(
          (item) => item.productId === product.productId
        );
        if (!productExist) {
          existingSeller.products.push(product);
        }
      } else {
        state.items.push({
          userId: sellerId,
          firstName: firstName,
          lastName: lastName,
          sellerImg: sellerImg,
          status: "",
          averageResponseTime: averageResponseTime,
          products: [product],
        });
      }
    },
    removeWishlist: (
      state,
      action: PayloadAction<{ sellerId: number; productId: number }>
    ) => {
      const { sellerId, productId } = action.payload;
      const existingSeller = state.items.find(
        (seller) => seller.userId === sellerId
      );

      if (existingSeller) {
        existingSeller.products = existingSeller.products.filter(
          (item) => item.productId !== productId
        );
        if (existingSeller.products.length === 0) {
          state.items = state.items.filter(
            (seller) => seller.userId !== sellerId
          );
        }
      }
    },
  },
});

export const { toggleWishList, addToWishlist, removeWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
