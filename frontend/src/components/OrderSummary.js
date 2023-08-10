import React, { useEffect } from "react";
import PayPal from "../payments/paypal";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../slices/orderSlice";

const OrderSummary = ({ navigation }) => {
  const cart = useSelector((state) => state.cart);

  const [session, setSession] = useState(null);
  const [paypalVisible, setPaypalVisible] = useState(false);
  const [paymentId, setPaymentId] = useState(null);

  const email_address = useSelector((state) => state.userLocal.userInfo.email);
  const token = useSelector((state) => state.userLocal.userInfo.token);
  const [createOrder] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems, //array
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        paymentDetails: {
          id: paymentId, // transaction id
          status: "completed", // payment status
          payer: { email_address }, // email address of
        },
        token,
      }).unwrap();
      setTimeout(() => {
        navigation.replace("OrderDetailScreen", { orderId: res._id });
        setPaypalVisible(false);
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (paymentId) {
      handlePlaceOrder(); // Call the function when paymentId changes
    }
  }, [paymentId]);

  const sessionURL = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json", // Use proper header name
      },
    };
    try {
      const response = await axios.post(
        "http://192.168.29.148:5000/api/paypal",
        { totalPrice: cart.totalPrice },
        config
      );
      console.log(response.data);
      setSession(response.data); // Assuming the response contains the session data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    sessionURL();
  }, []);

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
        onPress={() => setPaypalVisible(true)}
        disabled={cart.cartItems.length === 0}
        style={styles.placeOrderButton}
      >
        Place Order
      </Button>
      <PayPal
        session={session}
        paypalVisible={paypalVisible}
        setPaypalVisible={setPaypalVisible}
        navigation={navigation}
        setPaymentId={setPaymentId}
      />
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
    width: "90%",
    backgroundColor: "ghostwhite",
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
