import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthReducer from "./feature/auth/AuthSlice";
import CartReducer from "./feature/cart/CartSlice";
import CategoryReducer from "./feature/category/CategorySlice";
import OrderSlice from "./feature/order/OrderSlice";
import ProductReducer from "./feature/product/ProductSlice";
import RatingSlice from "./feature/rating/RatingSlice";
import SellerProductSlice from "./feature/sellerProduct/SellerProductSlice";
import TagsSlice from "./feature/tags/TagsSlice";
import UserReducer from "./feature/user/UserSlice";
import WishlistReducer from "./feature/wishlist/WishlistSlice";

const rootReducer = combineReducers({
  products: ProductReducer,
  category: CategoryReducer,
  auth: AuthReducer,
  user: UserReducer,
  cart: CartReducer,
  wishlist: WishlistReducer,
  tags: TagsSlice,
  sellerProduct: SellerProductSlice,
  ratings: RatingSlice,
  orders: OrderSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
