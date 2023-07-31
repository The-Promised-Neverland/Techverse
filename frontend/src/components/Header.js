import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import brandImage from "../../../assets/favicon.png";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Badge } from "react-native-paper";
import { useSelector } from "react-redux";

const Header = () => {
  const navigation = useNavigation();

  const userInfo = useSelector((state) => state.userLocal.userInfo);

  const itemCount = useSelector((state) => state.cart.cartItems).length;

  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <Image source={brandImage} style={styles.brandImage} />
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        {userInfo ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Avatar.Image size={50} source={{ uri: userInfo.profileImg }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <View style={styles.iconBackground}>
              <FontAwesome name="user" size={24} color="black" />
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
          <View style={styles.iconBackground}>
            <FontAwesome5 name="shopping-cart" size={24} color="black" />
            {itemCount > 0 && <Badge style={styles.badge}>{itemCount}</Badge>}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  brandImage: {
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBackground: {
    position: "relative", // Use position relative for badge positioning
    padding: 5,
    marginHorizontal: 5,
  },
  badge: {
    position: "absolute", // Position the badge at the top right corner
    top: -5,
    right: -5,
    backgroundColor: "green", // Customize the badge background color
    fontWeight: "bold",
  },
});

export default Header;
