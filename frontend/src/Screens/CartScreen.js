import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const CartScreen = () => {
  const navigation = useNavigation();

  // Dummy data for the cart items
  const cartItems = useSelector((state)=>state.cartItems);

  const handleRemoveFromCart = (id) => {
    // Implement the remove item from cart logic here
  };

  const handleCheckout = () => {
    // Implement the checkout logic here
  };

  const cardCard = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{item.name}</Text>
        <Text>${item.price}</Text>
        <Text>Qty {item.qty}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemoveFromCart(item.product)}
        style={styles.removeButton}
      >
        <Text style={{ color: "white" }}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text>Your Cart is Empty!</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.product}
          renderItem={cardCard}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
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
    paddingTop: 0,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 20
  },
  removeButton: {
    alignSelf: "center",
    padding: 8,
    backgroundColor: "red",
    borderRadius: 8,
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
