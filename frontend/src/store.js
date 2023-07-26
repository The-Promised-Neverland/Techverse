import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer, { loadInitialState } from "./slices/cartSlice";

const store = configureStore({
    reducer: {
        cart: cartSliceReducer,
    },
});

store.dispatch(loadInitialState());

export default store;