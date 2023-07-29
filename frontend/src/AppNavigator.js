import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Header from "./components/Header";

import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import SplashScreen from "./Screens/SplashScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";

import store from "./store";
import { Provider } from "react-redux";

import { PaperProvider } from "react-native-paper";
import OrderDetailScreen from "./Screens/OrderDetailScreen";
import ProfileScreen from "./Screens/ProfileScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="SplashScreen"
              component={SplashScreen}
            />
            <Stack.Screen
              options={{ header: () => <Header /> }}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ header: () => <Header /> }}
              name="LoginScreen"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ header: () => <Header /> }}
              name="RegisterScreen"
              component={RegisterScreen}
            />
            <Stack.Screen
              options={{ header: () => <Header /> }}
              name="ProductScreen"
              component={ProductScreen}
            />
            <Stack.Screen
              options={{ header: () => <Header /> }}
              name="CartScreen"
              component={CartScreen}
            />
            <Stack.Screen
              options={{ header: () => <Header /> }}
              name="ShippingScreen"
              component={ShippingScreen}
            />
            <Stack.Screen
              options={{ header: () => <Header /> }}
              name="PaymentScreen"
              component={PaymentScreen}
            />
            <Stack.Screen
              options={{ header: () => <Header /> }}
              name="PlaceOrderScreen"
              component={PlaceOrderScreen}
            />
            <Stack.Screen
              options={{ header: () => <Header /> }}
              name="OrderDetailScreen"
              component={OrderDetailScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ProfileScreen"
              component={ProfileScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
};

export default AppNavigator;
