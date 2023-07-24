import AsyncStorage from "@react-native-async-storage/async-storage";

export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

export const updateCart = async (state) => {
    // Calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    // Calculate shipping price (If order is above $100 then free, else $10 shipping fee)

    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    // Calculate tax price

    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
    
    // Calculate total price
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

    await AsyncStorage.setItem('CART_STORAGE_KEY', JSON.stringify(state));


    return state;
}
