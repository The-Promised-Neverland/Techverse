import AsyncStorage from "@react-native-async-storage/async-storage";

export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = async (state) => {
  // Calculate items price
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

  try {
    await AsyncStorage.setItem(
      "CART_STORAGE_KEY",
      JSON.stringify(updatedState)
    );
  } catch (error) {
    console.error("Error saving cart state to AsyncStorage:", error);
  }

  return updatedState;
};
