import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer, { loadInitialState } from "./slices/cartSlice";
import { apiSlice } from "./slices/apiSlice";
import { usersApiSlice } from "./slices/userSlice";
import { productsApiSlice } from "./slices/productSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    user: usersApiSlice,
    product: productsApiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

store.dispatch(loadInitialState());

export default store;
