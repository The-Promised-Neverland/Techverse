import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CartTotalDisplay = ({ cartItems }) => {
  const getTotalAmount = () => {
    return cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2);
  };

  const formatTotalAmount = (amount) => {
    const dollars = Math.floor(amount);
    const cents = (amount - dollars).toFixed(2).substring(2);
    return `${dollars}.${cents}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtotalText}>Subtotal</Text>
      <Text style={styles.totalAmountText}>
        $ {formatTotalAmount(getTotalAmount())}
        <Text style={styles.superscript}>
          .{formatTotalAmount(getTotalAmount()).split(".")[1]}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 12,
  },
  totalAmountText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  superscript: {
    fontSize: 12,
    position: "relative",
    bottom: 8,
  },
});

export default CartTotalDisplay;
