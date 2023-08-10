import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart, updateCartAsync } from "../slices/cartSlice";
import { Entypo } from "react-native-vector-icons";
import { Picker } from "@react-native-picker/picker";

const ProductScreen = ({ route }) => {
  const { productData } = route.params;

  const dispatch = useDispatch();

  const getImageURL = (uid) => {
    return `https://res.cloudinary.com/decz8mn8c/image/upload/f_auto,q_auto/v1/Techverse/${uid}`;
  }

  const [quantity, setSelectedQuantity] = useState(1);
  const [notify, setNotify] = useState(null);

  const maxQuantityOptions = Math.min(3, productData.countInStock);

  const handleAddToCart = async () => {
    // Dispatch the addToCart action with the selected productData and quantity
    const cartSchema = {
      product: productData._id, // id of the product
      name: productData.name,
      image: productData.image,
      price: productData.price,
      countInStock: productData.countInStock,
      qty: quantity,
    };
    dispatch(addToCart(cartSchema));
    dispatch(updateCartAsync());
    setNotify(true);
    setTimeout(() => {
      setNotify(null);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <Image source={{ uri: getImageURL(productData.image) }} alt={productData.name} style={styles.image} />
        <Text style={styles.heading}>{productData.name}</Text>
        <Text style={styles.description}>{productData.description}</Text>
        <Text style={styles.price}>Price: ${productData.price}</Text>

        {productData.countInStock > 0 ? (
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={quantity}
              onValueChange={(value) => setSelectedQuantity(value)}
              style={styles.dropdownOption}
            >
              <Picker.Item label="Select Quantity" enabled={false}/>
              {[...Array(maxQuantityOptions).keys()].map((x) => (
                <Picker.Item
                  key={x + 1}
                  label={(x + 1).toString()}
                  value={x + 1}
                />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                {notify && <Entypo name="check" size={20} color="white" />}
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "red",
              marginBottom: 12,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 30 }}>Not in Stock</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 30,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 50,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
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
    width: 100,
  },
  addToCartButton: {
    marginTop: 20,
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

export default ProductScreen;
