import { useNavigation, StackActions } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLoginMutation } from "../slices/userSlice";

const LoginScreen = () => {
  const [login, { isLoading: LoginLoading, error: LoginError }] =
    useLoginMutation();

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      await login({ email, password }).unwrap();
      setLoading(false);
      setEmail("");
      setPassword("");
      navigation.dispatch(StackActions.replace('HomeScreen')); // doing this will make this login screen not appear from homescreen on click of back button
    } catch (error) {
      setLoading(false);
      setError(error.data.message ? error.data.message : "Server Error");
      setTimeout(() => {
        setError(null);
      }, 5000);
      console.error(error?.data?.message || error.error);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.login}>
          <View style={styles.inputContainer}>
            <Icon name="envelope" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="black"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="black"
            />
          </View>
          {error && (
            <Text
              style={{
                alignSelf: "center",
                marginVertical: 20,
                fontWeight: "bold",
                color: "red",
                fontSize: 15,
              }}
            >
              {error}
            </Text>
          )}
          <Button
            mode="contained"
            onPress={loginHandler}
            buttonColor="black"
            loading={loading}
            style={styles.loginButton}
          >
            LOGIN
          </Button>
          <Text
            style={{
              fontSize: 20,
              marginTop: "12%",
              color: "black",
              fontWeight: "600",
              textDecorationLine: "underline",
              alignSelf: "center",
            }}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            Create New Account
          </Text>
        </View>
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
  login: {
    width: "80%",
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
  loginButton: {
    width: "40%",
    backgroundColor: "black",
    paddingVertical: 5,
    alignSelf: "center",
  },
});

export default LoginScreen;
