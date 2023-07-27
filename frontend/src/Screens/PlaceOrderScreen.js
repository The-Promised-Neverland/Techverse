import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";
import OrderCard from "../components/OrderCard";
import OrderSummary from "../components/OrderSummary";

const PlaceOrderScreen = () => {
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigation.navigate("ShippingScreen");
    } else if (!cart.paymentMethod) {
      navigation.navigate("PaymentScreen");
    }
  }, [navigation, cart.paymentMethod, cart.shippingAddress.address]);

  return (
    <View style={styles.container}>
      <CheckoutSteps step1 step2 step3 step4 />
      <Text style={styles.placeOrderHeading}>Place Order</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={cart.cartItems}
          keyExtractor={(item) => item.product}
          renderItem={({ item }) => <OrderCard item={item} />} // renders each card
          showsVerticalScrollIndicator={false}
        />
      </View>
      <OrderSummary cart={cart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    flex: 1, // This will make the FlatList take the remaining available space above OrderSummary
    marginBottom: 30,
  },
  placeOrderHeading: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PlaceOrderScreen;
