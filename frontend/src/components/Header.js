import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"; // Import Expo vector icons
import brandImage from "../../../assets/favicon.png";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Image source={brandImage} style={styles.brandImage} />
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => console.log("User icon clicked")}>
          <View style={styles.iconBackground}>
            <FontAwesome name="user" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Cart icon clicked")}>
          <View style={styles.iconBackground}>
            <FontAwesome5 name="shopping-cart" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: "row", // Arrange content horizontally
    justifyContent: "space-between", // Distribute content evenly along the row
    alignItems: "center", // Center content vertically
    paddingHorizontal: 15, // Add some horizontal padding for spacing
  },
  brandImage: {
    borderRadius: 100,
    width: 40, // Set the width and height according to your brand favicon size
    height: 40,
  },
  iconsContainer: {
    flexDirection: "row", // Arrange icons horizontally
    alignItems: "center", // Center icons vertically
  },
  iconBackground: {
    borderRadius: 100,
    padding: 5, // Add some padding to create a gap between the icons
    marginHorizontal: 5, // Add some horizontal margin to create space between the icons
  },
  boldIcon: {
    fontWeight: "bold", // Make the icons bold
  },
});

export default Header;
