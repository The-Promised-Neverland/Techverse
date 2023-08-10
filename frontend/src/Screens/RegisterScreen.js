import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { FontAwesome5 } from "react-native-vector-icons";
import { useRegisterMutation } from "../slices/userSlice";
import {
  handleCameraCapture,
  handleMediaLibrarySelect,
} from "../utils/CameraUtils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RegisterScreen = () => {
  const route = useRoute();
  const redirectScreen = route.params?.redirect;

  const navigation = useNavigation();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [profileImage, setProfileImage] = useState(
    "https://res.cloudinary.com/decz8mn8c/image/upload/v1690702744/UserImages/Default_slwlfm.webp"
  );

  // State variables for input field errors
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [register] = useRegisterMutation();

  const registerHandler = async () => {
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
      await register({ name, email, password, phone, profileImage });
      setTimeout(() => {
        setLoading(false); // Set loading to false after the operation is done
        if (redirectScreen) {
          navigation.replace(redirectScreen);
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          });
        }
      }, 3000);
    } catch (error) {
      setLoading(false); // Set loading to false in case of an error
      console.error(error);
    }
  };

  const openCamera = async () => {
    setModalVisible(false);
    const imageUrl = await handleCameraCapture();
    if (imageUrl) {
      setProfileImage(imageUrl); // Fix the function name to setProfileImage
    }
  };

  const openMediaLibrary = async () => {
    setModalVisible(false);
    const imageUrl = await handleMediaLibrarySelect();
    if (imageUrl) {
      setProfileImage(imageUrl); // Fix the function name to setProfileImage
    }
  };

  return (
    <KeyboardAwareScrollView overScrollMode="never">
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.register}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Image style={styles.profileImage} source={{ uri: profileImage }} />
          </Pressable>
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
            onPress={registerHandler}
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
          onPress={() =>
            navigation.replace("LoginScreen", { redirect: redirectScreen })
          }
        >
          Already have an Account?
        </Text>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable style={styles.modalOption} onPress={openCamera}>
              <Text style={styles.modalOptionText}>Camera</Text>
            </Pressable>
            <Pressable style={styles.modalOption} onPress={openMediaLibrary}>
              <Text style={styles.modalOptionText}>Device</Text>
            </Pressable>
            <Pressable
              style={styles.modalOption}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalOptionText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "70%", // Adjust the maximum height of the modal content
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalOptionText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontWeight: "600",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "15%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: "10%",
  },
  register: {
    width: "80%",
  },
  errorIcon: {
    fontSize: 25,
    color: "red",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    alignSelf: "center",
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
  registerButton: {
    width: "40%",
    backgroundColor: "black",
    paddingVertical: 5,
    alignSelf: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default RegisterScreen;
