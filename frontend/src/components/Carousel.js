import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  LogBox,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useGetTopProductsQuery } from "../slices/productSlice";

LogBox.ignoreAllLogs();

const getImageURL = (uid) => {
  return `https://res.cloudinary.com/decz8mn8c/image/upload/f_auto,q_auto/v1/Techverse/${uid}`;
};

const CarouselItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.carouselItem}>
        <Image
          source={{ uri: getImageURL(item.image) }}
          alt={item.name}
          style={styles.carouselImage}
        />
        <Text style={styles.carouselText}>{item.name}</Text>
        <Text style={styles.carouselText}>Price: ${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CarouselView = () => {
  const {
    data: topProducts,
    isLoading,
    error,
  } = useGetTopProductsQuery(null, {
    pollingInterval: 60000,
  });

  const navigation = useNavigation();

  const handleProductClick = (item) => {
    navigation.navigate("ProductScreen", { productData: item });
  };

  return (
    topProducts?.length > 0 && (
      <Carousel
        data={topProducts}
        renderItem={({ item }) => (
          <CarouselItem
            item={item}
            onPress={handleProductClick}
            key={item.name}
          />
        )}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        loop={true}
        autoplay={true} // Enable autoplay here
      />
    )
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 50,
    marginBottom: 50,
  },
  carouselImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
    borderRadius: 10,
  },
  carouselText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CarouselView;
