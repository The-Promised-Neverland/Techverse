import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const OrderCard = ({ item }) => {
  return (
    <View style={styles.orderItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.priceText}>
          ${item.price} x {item.qty}
        </Text>
      </View>
      <Text style={styles.boldText}>${item.price * item.qty}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Changed from "space-around" to "space-between"
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    paddingHorizontal: 20
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 15,
  },
  priceText: {
    fontSize: 14,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default OrderCard;
