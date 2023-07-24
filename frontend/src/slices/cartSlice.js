import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import updateCart from "../utils/updateCart";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "Paypal",
};

const loadInitialState = createAsyncThunk("cart/loadInitialState", async () => {
  try {
    const data = await AsyncStorage.getItem("CART_STORAGE_KEY");
    return data ? JSON.parse(data) : initialState;
  } catch (error) {
    console.error("Error loading cart state from AsyncStorage:", error);
    return initialState;
  }
});

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (state) => {
    return await updateCart(state); // Perform the asynchronous updateCart operation
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    clearCartItems: (state, action) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInitialState.fulfilled, (state, action) => {
      // Handle the fulfilled state of loadInitialState action
      // Update the state with the data returned from the async action
      const loadedState = action.payload;
      state.cartItems = loadedState.cartItems;
      state.shippingAddress = loadedState.shippingAddress;
      state.paymentMethod = loadedState.paymentMethod;
      state.itemsPrice = loadedState.itemsPrice;
      state.shippingPrice = loadedState.shippingPrice;
      state.taxPrice = loadedState.taxPrice;
      state.totalPrice = loadedState.totalPrice;
    });

    builder.addCase(updateCartAsync.fulfilled, (state, action) => {
      // This extra reducer handles the fulfilled (success) state of the updateCartAsync action
      // Update the state with the data returned from the async action
      const updatedState = action.payload;
      state.cartItems = updatedState.cartItems;
      state.shippingAddress = updatedState.shippingAddress;
      state.paymentMethod = updatedState.paymentMethod;
      state.itemsPrice = updatedState.itemsPrice;
      state.shippingPrice = updatedState.shippingPrice;
      state.taxPrice = updatedState.taxPrice;
      state.totalPrice = updatedState.totalPrice;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
