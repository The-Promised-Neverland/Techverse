import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Loader from "../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState(null);

  const login = async () => {
    setModalVisible(true);
    try {
      const Remail = await AsyncStorage.getItem("email");
      const Rpassword = await AsyncStorage.getItem("password");
      if (email === Remail && password === Rpassword) {
        setTimeout(() => {
          navigation.navigate("HomeScreen");
        }, 3000);
      } else {
        setMessage("Wrong email or password");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } catch (error) {
      setModalVisible(false);
      console.log(error);
    }
  };

  return (
    <>
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

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      {message && <Text>{message}</Text>}
      <Text
        style={{
          fontSize: 20,
          marginTop: "12%",
          color: "white",
          fontWeight: "600",
          textDecorationLine: "underline",
        }}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Create New Account
      </Text>

      <Loader modalVisible={modalVisible} />
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
  login: {
    marginTop: "65%",
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
  loginButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  loginButton: {
    width: "50%",
    backgroundColor: "black",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
