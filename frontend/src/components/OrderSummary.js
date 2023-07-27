import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const OrderSummary = ({ cart }) => {
  const navigation = useNavigation();

  const placeOrderHandler = () => {
    navigation.navigate("OrderDetailScreen");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Order Summary</Text>
      <View style={styles.priceItem}>
        <Text>Marked Price</Text>
        <Text style={styles.priceValue}>${cart.itemsPrice}</Text>
      </View>
      <View style={styles.priceItem}>
        <Text>Shipping Price</Text>
        <Text style={styles.priceValue}>${cart.shippingPrice}</Text>
      </View>
      <View style={styles.priceItem}>
        <Text>Tax Price</Text>
        <Text style={styles.priceValue}>${cart.taxPrice}</Text>
      </View>
      <View style={styles.priceItem}>
        <Text style={styles.boldText}>Final Price</Text>
        <Text style={[styles.priceValue, styles.boldText]}>
          ${cart.totalPrice}
        </Text>
      </View>
      <Button
        mode="contained"
        onPress={placeOrderHandler}
        disabled={cart.cartItems.length === 0}
        style={styles.placeOrderButton}
      >
        Place Order
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    width: "80%",
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  boldText: {
    fontWeight: "bold",
  },
  priceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  priceValue: {
    textAlign: "left",
  },
  placeOrderButton: {
    marginTop: 20,
    alignSelf: "center",
    width: "70%",
    backgroundColor: "black",
  },
});

export default OrderSummary;
