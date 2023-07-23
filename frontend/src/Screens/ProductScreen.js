import { Image, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const ProductScreen = ({ route }) => {
  const { productData } = route.params;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Calculate the maximum quantity options in the dropdown
  const maxQuantityOptions = Math.min(3, productData.countInStock);

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
    setShowDropdown(false);
  };

  return (
    <View>
      <Text>{productData.name}</Text>
      <Image source={productData.image} />
      <Text>{productData.description}</Text>
      <Text>{productData.price}</Text>

      {productData.countInStock > 0 ? (
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownText}>Qty: {selectedQuantity}</Text>
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
        </TouchableOpacity>
      ) : (
        <Text>NO STOCK</Text>
      )}
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: 150,
    backgroundColor: "lightgray",
    marginBottom: 10,
  },
});
