import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // State variables for input field errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const saveData = async () => {
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");

    if (!name) {
      setNameError("Please fill.");
    }

    if (!email) {
      setEmailError("Please fill.");
    }

    if (!phone) {
      setPhoneError("Please fill.");
    }

    if (!password) {
      setPasswordError("Please fill.");
    }

    // If any of the fields are empty, stop the function here
    if (!name || !email || !phone || !password) {
      return;
    }

    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("password", password);
    await AsyncStorage.setItem("phone", phone);
    await AsyncStorage.setItem("email", email);
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.register}>
        <View style={styles.inputContainer}>
          <Icon name="user" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="black"
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={true}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <Icon name="phone" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone Number"
            placeholderTextColor="black"
          />
          {phoneError ? (
            <Text style={styles.errorText}>{phoneError}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <Icon name="envelope" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="black"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        <View style={styles.registerButtonContainer}>
          <TouchableOpacity style={styles.registerButton} onPress={saveData}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={{
          fontSize: 20,
          marginTop: "5%",
          color: "white",
          fontWeight: "600",
          textDecorationLine: "underline",
        }}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Already have an Account?
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
  },
  register: {
    marginTop: "60%",
    width: "70%",
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
  registerButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  registerButton: {
    width: "50%",
    backgroundColor: "black",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginTop: 1,
  },
});

export default RegisterScreen;
