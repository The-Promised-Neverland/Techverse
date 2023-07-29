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
import { FontAwesome5 } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const [errorAddress, setErrorAddress] = useState(null);
  const [errorCity, setErrorCity] = useState(null);
  const [errorPostalCode, setErrorPostalCode] = useState(null);
  const [errorCountry, setErrorCountry] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const submitHandler = () => {
    let flag = true;

    if (address === "") {
      setErrorAddress(true);
      flag = false;
    }
    if (city === "") {
      setErrorCity(true);
      flag = false;
    }
    if (postalCode === "") {
      setErrorPostalCode(true);
      flag = false;
    }
    if (country === "") {
      setErrorCountry(true);
      flag = false;
    }

    if (flag === false) {
      return;
    }

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(updateCartAsync());
    navigation.navigate("PaymentScreen");
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <CheckoutSteps step1 step2 />
        <Text style={styles.heading}>Shipping Screen</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Address"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              setErrorAddress(null);
            }}
          />
          {errorAddress && (
            <FontAwesome5 name="hand-point-left" style={styles.errorIcon} />
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter City"
            value={city}
            onChangeText={(text) => {
              setCity(text);
              setErrorCity(null);
            }}
          />
          {errorCity && (
            <FontAwesome5 name="hand-point-left" style={styles.errorIcon} />
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Postal Code"
            value={postalCode}
            onChangeText={(text) => {
              setPostalCode(text);
              setErrorPostalCode(null);
            }}
          />
          {errorPostalCode && (
            <FontAwesome5 name="hand-point-left" style={styles.errorIcon} />
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Country"
            value={country}
            onChangeText={(text) => {
              setCountry(text);
              setErrorCountry(null);
            }}
          />
          {errorCountry && (
            <FontAwesome5 name="hand-point-left" style={styles.errorIcon} />
          )}
        </View>

        <TouchableOpacity style={styles.shippingButton} onPress={submitHandler}>
          <Text style={styles.shippingButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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
    width: "90%",
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
  errorIcon: {
    fontSize: 25,
    color: "red",
    padding: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
});

export default ShippingScreen;
