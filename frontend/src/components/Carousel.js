import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const CarouselItem = ({ item }) => {
  return (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
      <Text style={styles.carouselText}>{item.name}</Text>
      <Text style={styles.carouselText}>Price: ${item.price}</Text>
    </View>
  );
};

const CarouselView = () => {
  const products = [
    {
      name: "Apple Watch Ultra",
      image: require("../../../assets/images/watch.jpg"),
      price: 1200,
    },
    {
      name: "iPhone 14 Pro",
      image: require("../../../assets/images/phone.jpg"),
      price: 1740,
    },
    {
      name: "iPad Pro",
      image: require("../../../assets/images/pad.jpg"),
      price: 2399,
    },
    {
      name: "MacBook Pro",
      image: require("../../../assets/images/mac.jpg"),
      price: 2435,
    },
    {
      name: "Airpods",
      image: require("../../../assets/images/airpods.jpg"),
      price: 159,
    },
  ];

  return (
    <View>
      <Carousel
        data={products}
        renderItem={({ item }) => <CarouselItem item={item} />}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        layout={"default"}
        loop={true}
        autoplay={true} // Enable autoplay here
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10
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
