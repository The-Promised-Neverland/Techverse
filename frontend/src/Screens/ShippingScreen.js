import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress, updateCartAsync } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigation } from "@react-navigation/native";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const submitHandler = () => {
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(updateCartAsync());
    navigation.navigate("PaymentScreen");
  };

  return (
    <View style={styles.container}>
      <CheckoutSteps step1 step2 />
      <Text style={styles.heading}>Shipping Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter City"
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Postal Code"
        value={postalCode}
        onChangeText={(text) => setPostalCode(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Country"
        value={country}
        onChangeText={(text) => setCountry(text)}
      />

      <TouchableOpacity style={styles.shippingButton} onPress={submitHandler}>
        <Text style={styles.shippingButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  shippingButton: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  shippingButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShippingScreen;
