import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartAsync,
} from "../slices/cartSlice";
import { Entypo } from "react-native-vector-icons";
import { Picker } from "@react-native-picker/picker";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    dispatch(updateCartAsync());
  };

  const handleQuantityChange = (productData, quantity) => {
    const cartSchema = {
      product: productData.product, // id of the product
      name: productData.name,
      image: productData.image,
      price: productData.price,
      countInStock: productData.countInStock,
      qty: quantity,
    };
    dispatch(addToCart(cartSchema));
    dispatch(updateCartAsync());
  };

  const getImageURL = (uid) => {
    return `https://res.cloudinary.com/decz8mn8c/image/upload/f_auto,q_auto/v1/Techverse/${uid}`;
  };

  return (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: getImageURL(item.image) }}
        alt={item.name}
        style={styles.image}
      />
      <View style={styles.itemDetails}>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>{item.name}</Text>
        <View style={styles.priceQtyContainer}>
          <Text style={styles.priceText}>${item.price}</Text>
        </View>
      </View>
      <Picker
        selectedValue={item.qty}
        onValueChange={(value) => {
          handleQuantityChange(item, value);
        }}
        style={styles.dropdownOption}
      >
        <Picker.Item label="Select Quantity" enabled={false} />
        {[...Array(5).keys()].map((x) => (
          <Picker.Item key={x + 1} label={(x + 1).toString()} value={x + 1} />
        ))}
      </Picker>
      <TouchableOpacity
        onPress={() => handleRemoveFromCart(item.product)}
        style={styles.removeButton}
      >
        <Entypo name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  priceQtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 10,
  },
  dropdownOption: {
    width: 100, // Adjust the width as needed
  },
  removeButton: {
    alignSelf: "center",
    padding: 8,
  },
});
