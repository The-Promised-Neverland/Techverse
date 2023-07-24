import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = ({ route }) => {
  const { productData } = route.params;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    // Dispatch the addToCart action with the selected productData and quantity
    dispatch(addToCart({ ...productData, qty: selectedQuantity }));
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const maxQuantityOptions = Math.min(3, productData.countInStock);

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
    setShowDropdown(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={productData.image} style={styles.image} />
      <Text style={styles.heading}>{productData.name}</Text>
      <Text style={styles.description}>{productData.description}</Text>
      <Text style={styles.price}>Price: ${productData.price}</Text>

      {productData.countInStock > 0 ? (
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownText}>Qty: {selectedQuantity}</Text>
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdownOptions}>
              {[...Array(maxQuantityOptions)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleQuantityChange(index + 1)}
                >
                  <Text style={styles.dropdownOption}>{index + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "red",
            marginTop: 70,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>Not in Stock</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 70,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
    borderRadius: 50,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdownContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  dropdownButton: {
    backgroundColor: "black",
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  dropdownText: {
    color: "white",
    fontSize: 16,
  },
  dropdownOptions: {
    marginTop: 10,
    flexDirection: "row",
  },
  dropdownOption: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    fontSize: 16,
    marginRight: 10,
  },
  addToCartButton: {
    marginTop: 20,
    marginBottom: 80,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
