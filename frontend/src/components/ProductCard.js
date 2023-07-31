import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Rating from "./Rating";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate("ProductScreen", { productData: product }); 
  }

  const getImageURL = (uid) => {
    return `https://res.cloudinary.com/decz8mn8c/image/upload/f_auto,q_auto/v1/Techverse/${uid}`;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={pressHandler}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: getImageURL(product.image) }} alt={product.name} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{product.name}</Text>
      </View>
      <View style={styles.priceRatingContainer}>
        <Text style={styles.price}>Price: ${product.price}</Text>
        <Rating value={product.rating} text={"ratings"} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "ghostwhite",
    borderRadius: 20,
    padding: 20,
    margin: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    alignItems: "center", // Center the image horizontally
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  contentContainer: {
    alignItems: "center", // Center the name horizontally
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceRatingContainer: {
    flexDirection: "column", // Display price and ratings in a column
    marginTop: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ProductCard;
