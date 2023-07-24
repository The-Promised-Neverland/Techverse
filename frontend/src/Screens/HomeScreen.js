import React from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import products from "../../data/products";
import ProductCard from "../components/ProductCard";
import CarouselView from "../components/Carousel";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        contentContainerStyle={styles.productList}
        ListHeaderComponent={<CarouselView />} // this renders anything as the top of the list
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productList: {
    justifyContent: "space-between",
  },
});

export default HomeScreen;
