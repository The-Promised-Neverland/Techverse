import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "Paypal",
  itemsPrice: 0.0,
  shippingPrice: 0.0,
  taxPrice: 0.0,
  totalPrice: 0.0,
};

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (_, { getState }) => {
    // getstate is passed by redux internally
    const state = getState().cart;
    try {
      const itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Calculate shipping price (If order is above $100 then free, else $10 shipping fee)
      const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);

      // Calculate tax price
      const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

      // Calculate total price
      const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
      ).toFixed(2);

      // Create a new object with the updated state
      const updatedState = {
        ...state,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      await AsyncStorage.setItem(
        "CART_STORAGE_KEY",
        JSON.stringify(updatedState)
      );
      return updatedState;
    } catch (error) {
      console.error("Error saving cart state to AsyncStorage:", error);
      throw new Error("Failed to update cart.");
    }
  }
);

export const loadInitialState = createAsyncThunk(
  "cart/loadInitialState",
  async () => {
    try {
      const data = await AsyncStorage.getItem("CART_STORAGE_KEY");
      return data ? JSON.parse(data) : initialState;
    } catch (error) {
      console.error("Error loading cart state from AsyncStorage:", error);
      return initialState;
    }
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
          x.product === item.product ? item : x
        );
      } else {
        state.cartItems.push(item);
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
      return action.payload; // currentState = updatedState
    });
    builder.addCase(updateCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updateCartAsync.rejected, (state, action) => {
      console.error("Error updating cart:", action.error);
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
