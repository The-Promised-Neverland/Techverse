import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CardCard from "../components/CartCard";
import { useSelector } from "react-redux";
import CartTotalDisplay from "../components/CartTotalDisplay";

const CartScreen = () => {
  const navigation = useNavigation();

  const { cartItems } = useSelector((state) => state.cart);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <View
          style={{
            alignSelf: "center",
            alignContent: "center",
            marginTop: "50%",
          }}
        >
          <Text style={{ fontSize: 50 }}>Card is empty!</Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.product}
          renderItem={({ item }) => <CardCard item={item} />} // renders each card
          ListFooterComponent={
            <View>
              <CartTotalDisplay cartItems={cartItems} />
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => navigation.navigate("ShippingScreen")}
              >
                <Text style={styles.checkoutButtonText}>
                  Proceed to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: "15%",
    alignSelf: "center",
  },
  dropdownOptions: {
    marginTop: 10,
    flexDirection: "row",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dropdownOption: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    fontSize: 16,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 20,
  },
  removeButton: {
    alignSelf: "center",
    padding: 8,
  },
  checkoutButton: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
