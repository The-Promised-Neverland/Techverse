import React from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import ProductCard from "../components/ProductCard";
import CarouselView from "../components/Carousel";
import { useGetProductsQuery } from "../slices/productSlice";

const HomeScreen = () => {
  // const { data: products, isLoading, error } = useGetProductsQuery();
  const {data: products, isLoading, error}=useGetProductsQuery();
  console.log(error);
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
