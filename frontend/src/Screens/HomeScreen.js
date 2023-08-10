import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import ProductCard from "../components/ProductCard";
import CarouselView from "../components/Carousel";
import { useGetProductsQuery } from "../slices/productSlice";

const HomeScreen = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery(null, {
    pollingInterval: 10000, // Fetch data every 10 seconds (10,000 milliseconds)
  });

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
        overScrollMode="never"
        initialNumToRender={10}
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
