import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";
import OrderCard from "../components/OrderCard";
import OrderSummary from "../components/OrderSummary";
import { ScrollView } from "react-native-gesture-handler";

const PlaceOrderScreen = () => {
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigation.navigate("ShippingScreen");
    } else if (!cart.paymentMethod) {
      navigation.navigate("PaymentScreen");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address]);

  return (
    <ScrollView style={styles.container} overScrollMode="never">
      <CheckoutSteps step1 step2 step3 step4 />
      <Text style={styles.placeOrderHeading}>Place Order</Text>
      <FlatList
        data={cart.cartItems}
        keyExtractor={(item) => item.product}
        renderItem={({ item }) => <OrderCard item={item} />} // renders each card
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      />
      <View style={styles.shippingInfo}>
        <Text style={styles.shippingLabel}>Shipping Address:</Text>
        <Text style={styles.shippingText}>
          {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
          {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
        </Text>
      </View>
      <OrderSummary cart={cart} navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeOrderHeading: {
    fontSize: 24,
    marginVertical: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  shippingInfo: {
    borderColor: "#ddd",
    padding: "5%",
  },
  shippingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  shippingText: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
});

export default PlaceOrderScreen;
