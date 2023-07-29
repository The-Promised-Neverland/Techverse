import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <Image
        style={styles.profileImage}
        source={require("../../../assets/Avatar.jpg")} // Replace this with the actual profile image source
      />
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.info}>John Doe</Text>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.label}>Phone Number:</Text>
      <Text style={styles.info}>+1 (123) 456-7890</Text>
      <Text style={styles.label}>Email ID:</Text>
      <Text style={styles.info}>john.doe@example.com</Text>

      <Text style={styles.orders}>Previous Orders:</Text>
      {/* Add the logic to display previous orders here */}
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  orders: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
});
