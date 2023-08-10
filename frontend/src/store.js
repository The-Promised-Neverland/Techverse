import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer, { loadInitialState } from "./slices/cartSlice";
import { apiSlice } from "./slices/apiSlice";
import { usersApiSlice } from "./slices/userSlice";
import { productsApiSlice } from "./slices/productSlice";
import { ordersApiSlice } from "./slices/orderSlice";
import userStoreReducer from "./slices/userStore";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    order: ordersApiSlice,
    user: usersApiSlice,
    product: productsApiSlice,
    userLocal: userStoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

store.dispatch(loadInitialState());

export default store;
