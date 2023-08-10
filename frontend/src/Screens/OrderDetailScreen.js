import { BackHandler, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const OrderDetailScreen = () => {
  const route = useRoute();
  const { orderId } = route.params;


  return (
    <View>
      <Text>OrderDetails: {orderId}</Text>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({});
