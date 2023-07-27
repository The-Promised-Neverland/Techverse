import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartAsync
} from "../slices/cartSlice";
import { Entypo } from "react-native-vector-icons";
import { Picker } from "@react-native-picker/picker";

const CardCard = ({ item }) => {
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
    dispatch(removeFromCart(productData.product));
    dispatch(updateCartAsync());
    dispatch(addToCart(cartSchema));
    dispatch(updateCartAsync());
  };

  return (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.image} />
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
        <Picker.Item label="Select Quantity" />
        {[...Array(5).keys()].map((x) => (
          <Picker.Item key={x + 1} label={(x + 1).toString()} value={x + 1} />
        ))}
      </Picker>
      <TouchableOpacity
        onPress={() => handleRemoveFromCart(item.product)}
        style={styles.removeButton}
      >
        <Entypo name="trash" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default CardCard;

const styles = StyleSheet.create({
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
