import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const OrderCard = ({ item }) => {
  return (
    <View style={styles.orderItem}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.priceText}>
        ${item.price} x {item.qty}
      </Text>
      <Text style={styles.boldText}>${item.price * item.qty}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around", 
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10, 
  },
  image: {
    width: 100,
    height: 100, 
    borderRadius: 20
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

