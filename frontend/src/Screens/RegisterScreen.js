import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome5 } from "react-native-vector-icons";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);

  // State variables for input field errors
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [loading, setLoading] = useState(false);

  const register = async () => {
    setNameError(null);
    setEmailError(null);
    setPhoneError(null);
    setPasswordError(null);

    if (!name) {
      setNameError(true);
    }

    if (!email) {
      setEmailError(true);
    }

    if (!phone) {
      setPhoneError(true);
    }

    if (!password) {
      setPasswordError(true);
    }

    // If any of the fields are empty, stop the function here
    if (!name || !email || !phone || !password) {
      return;
    }

    setLoading(true);
    try {
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("password", password);
      await AsyncStorage.setItem("phone", phone);
      await AsyncStorage.setItem("email", email);

      setTimeout(() => {
        navigation.navigate("HomeScreen");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.register}>
          <View style={styles.inputContainer}>
            <Icon name="user" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(newText) => {
                setName(newText);
                setNameError(null);
              }}
              placeholder="Name"
              placeholderTextColor="black"
            />
            {nameError && (
              <FontAwesome5 name="hand-point-left" style={styles.errorIcon} />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(newText) => {
                setPassword(newText);
                setPasswordError(null);
              }}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={true}
            />
            {passwordError && (
              <FontAwesome5 name="hand-point-left" style={styles.errorIcon} />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={(newText) => {
                setPhone(newText);
                setPhoneError(null);
              }}
              placeholder="Phone Number"
              placeholderTextColor="black"
            />
            {phoneError && (
              <FontAwesome5 name="hand-point-left" style={styles.errorIcon} />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Icon name="envelope" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(newText) => {
                setEmail(newText);
                setEmailError(null);
              }}
              placeholder="Email"
              placeholderTextColor="black"
            />
            {emailError && (
              <FontAwesome5 name="hand-point-left" style={styles.errorIcon} />
            )}
          </View>

          <Button
            mode="contained"
            onPress={() => register()}
            buttonColor="black"
            loading={loading}
            style={styles.registerButton}
          >
            REGISTER
          </Button>
        </View>

        <Text
          style={{
            fontSize: 20,
            marginTop: "5%",
            color: "black",
            fontWeight: "600",
            textDecorationLine: "underline",
          }}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Already have an Account?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: "30%",
  },
  register: {
    width: "80%",
  },
  errorIcon: {
    fontSize: 25,
    color: "red",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  inputIcon: {
    color: "black",
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    color: "black",
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  passwordButton: {
    marginLeft: 10,
  },
  passwordButtonText: {
    color: "#007AFF",
  },
  registerButton: {
    width: "40%",
    backgroundColor: "black",
    paddingVertical: 5,
    alignSelf: "center",
  },
});

export default RegisterScreen;
