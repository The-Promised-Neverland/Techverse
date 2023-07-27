import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const OrderSummary = ({ cart, onPressPlaceOrder }) => {
  return (
    <View style={styles.card}>
      <View style={styles.listGroupItem}>
        <Text style={styles.title}>Order Summary</Text>
        <View style={styles.priceItem}>
          <Text>Items:</Text>
          <Text>${cart.itemsPrice}</Text>
        </View>
        <View style={styles.priceItem}>
          <Text>Shipping Price:</Text>
          <Text>${cart.shippingPrice}</Text>
        </View>
        <View style={styles.priceItem}>
          <Text>Tax Price:</Text>
          <Text>${cart.taxPrice}</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.boldText}>Total Price:</Text>
          <Text>${cart.totalPrice}</Text>
        </View>
        <Button
          mode="contained"
          onPress={onPressPlaceOrder}
          disabled={cart.cartItems.length === 0}
          style={styles.placeOrderButton}
        >
          Place Order
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  listGroupItem: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
  },
  priceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  placeOrderButton: {
    marginTop: 10,
  },
});

export default OrderSummary;
