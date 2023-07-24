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

LogBox.ignoreAllLogs();

const CarouselItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.carouselItem}>
        <Image source={item.image} style={styles.carouselImage} />
        <Text style={styles.carouselText}>{item.name}</Text>
        <Text style={styles.carouselText}>Price: ${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CarouselView = () => {
  const products = [
    {
      name: "Apple Watch Ultra",
      image: require("../../../assets/images/watch.jpg"),
      price: 1200,
      description:
        "Experience the ultimate blend of style and functionality with the Apple Watch. From monitoring your health and fitness to staying connected with loved ones, the Apple Watch Ultra has got you covered. With its sleek and durable design, you can wear it anywhere and everywhere. Make a statement and stay on top of your game with the Apple Watch Ultra.",
    },
    {
      name: "iPhone 14 Pro",
      description:
        "The iPhone is the ultimate combination of sleek design and cutting-edge technology. With its stunning Retina display, powerful A-series chip, and intuitive user interface, it's the perfect device for staying connected, capturing memories, and enjoying the best of Apple's ecosystem. Upgrade your mobile experience with the iPhone today.",
      image: require("../../../assets/images/phone.jpg"),
      price: 1740,
    },
    {
      name: "iPad Pro",
      description:
        "The iPad Pro from Apple is a true game-changer in the world of tablets. With stunning Liquid Retina displays, powerful processors, and incredible versatility, it's perfect for work, play, and everything in between. The sleek and portable design makes it easy to take on-the-go, and the Apple Pencil and Magic Keyboard make it even more versatile. Get ready to take your productivity and creativity to the next level with the iPad Pro.",
      image: require("../../../assets/images/pad.jpg"),
      price: 2399,
    },
    {
      name: "MacBook Pro",
      description:
        "Get ready to tackle any task with the ultimate tool for creators and professionals - the MacBook Pro from Apple. With powerful processors, stunning Retina displays, and macOS operating system, you'll experience seamless productivity like never before. The sleek and portable design makes it perfect for work on-the-go. Invest in the MacBook Pro today and take your productivity to the next level.",
      image: require("../../../assets/images/mac.jpg"),
      price: 2435,
    },
    {
      name: "Airpods",
      description:
        "Experience the freedom of wireless audio with AirPods - the ultimate earbuds for Apple lovers. With the W1 chip, you'll get unparalleled connectivity and ease of use, while the crystal- clear sound quality will leave you in awe.Plus, the sleek and stylish design is the perfect match for any outfit.Upgrade your listening game today with AirPods.",
      image: require("../../../assets/images/airpods.jpg"),
      price: 159,
    },
  ];

  const navigation = useNavigation();

  const handleProductClick = (item) => {
    navigation.navigate("ProductScreen", { productData: item });
  };

  return (
    <Carousel
      data={products}
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
