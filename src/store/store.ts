// import { configureStore } from "@reduxjs/toolkit";
// import CategoryReducer from "./feature/category/CategorySlice";
// import ProductReducer from "./feature/product/ProductSlice";

// export const store = configureStore({
//   reducer: {
//     products: ProductReducer,
//     category: CategoryReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CategoryReducer from "./feature/category/CategorySlice";
import ProductReducer from "./feature/product/ProductSlice";

const rootReducer = combineReducers({
  products: ProductReducer,
  category: CategoryReducer,
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
export default store;
