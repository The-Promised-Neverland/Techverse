import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { savePaymentMethod } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { RadioButton } from "react-native-paper";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigation.navigate("ShippingScreen");
    }
  }, [shippingAddress]);

  const submitHandler = () => {
    dispatch(savePaymentMethod(paymentMethod));
    navigation.navigate("PlaceOrderScreen");
  }; 

  return (
    <View style={styles.container}>
      <CheckoutSteps step1 step2 step3 />
      <Text style={styles.heading}>Payment Gateway</Text>
      <View style={styles.paymentOption}>
        <RadioButton.Android
          value="PayPal"
          status={paymentMethod === "PayPal" ? "checked" : "unchecked"}
          onPress={() => setPaymentMethod("PayPal")}
          color="black"
        />
        <Text style={styles.paymentText}>PayPal</Text>
      </View>

      <View style={styles.paymentOption}>
        <RadioButton.Android
          value="Stripe"
          status={paymentMethod === "Stripe" ? "checked" : "unchecked"}
          onPress={() => setPaymentMethod("Stripe")}
          color="black"
        />
        <Text style={styles.paymentText}>Stripe</Text>
      </View>

      <View style={styles.paymentOption}>
        <RadioButton.Android
          value="Cash on Delivery"
          status={
            paymentMethod === "Cash on Delivery" ? "checked" : "unchecked"
          }
          onPress={() => setPaymentMethod("Cash on Delivery")}
          color="black"
        />
        <Text style={styles.paymentText}>Cash on Delivery</Text>
      </View>
      <TouchableOpacity style={styles.paymentButton} onPress={submitHandler}>
        <Text style={styles.paymentButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 40,
    alignSelf: "center",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: "20%",
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 10,
  },
  paymentButton: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  paymentButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
