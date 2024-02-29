import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./feature/category/CategorySlice";
import ProductReducer from "./feature/product/ProductSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    category: CategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
