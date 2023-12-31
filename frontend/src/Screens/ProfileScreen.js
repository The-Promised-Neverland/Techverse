import React, { useState } from "react";
import { StyleSheet, Text, Image, Pressable } from "react-native"; // Import ActivityIndicator
import { SafeAreaView } from "react-native-safe-area-context";
import UploadModal from "../components/UploadModal";
import { logout } from "../slices/userStore";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const [uploading, setUploading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLocal.userInfo);

  const handleLogout = async () => {
    try {
      setIsLoading(true); // Show the activity indicator
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a 3-second delay
      await dispatch(logout()).unwrap();
      setIsLoading(false); // Hide the activity indicator
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoading(false); // Hide the activity indicator if there's an error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <Pressable onPress={() => setModalVisible(true)}>
        <Image
          style={styles.profileImage}
          source={{ uri: userInfo?.profileImg }}
          onLoad={() => setUploading(false)} // when it will be fully rendered on image
        />
        <ActivityIndicator
          style={styles.spinner}
          animating={uploading}
          color="blue"
          size={50}
        />
      </Pressable>

      <Button buttonColor="red" loading={isLoading} onPress={handleLogout}>
        Logout
      </Button>

      <UploadModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        userID={userInfo?._id}
        setUploading={setUploading}
        token={userInfo?.token}
      />

      <Text>name: {userInfo?.name}</Text>
      <Text>email: {userInfo?.email}</Text>
      <Text>phone: {userInfo?.phone}</Text>
      <Text>Previous Orders</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    alignSelf: "center",
  },
  spinner: {
    position: "absolute",
    top: "40%",
    left: "48%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
});

export default ProfileScreen;
