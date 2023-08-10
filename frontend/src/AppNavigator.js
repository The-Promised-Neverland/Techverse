import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
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
import ProfileScreen from "./Screens/ProfileScreen";
import { useRef, useEffect } from "react";
import OrderDetailScreen from "./Screens/OrderDetailScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const navigationRef = useRef();

  useEffect(() => {
    navigationRef.current?.addListener("state", () => {
      const navigationState = navigationRef.current?.getState();
      const allScreens = navigationState?.routes.map((route) => route.name);
      console.log("Screen Stack:", allScreens);
    });
  }, []); //For logging screen stack

  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          >
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
              name="OrderDetailScreen"
              component={OrderDetailScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LoginScreen"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="RegisterScreen"
              component={RegisterScreen}
            />
            <Stack.Screen
              options={{ header: () => <Header /> }}
              name="ProductScreen"
              component={ProductScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="CartScreen"
              component={CartScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ShippingScreen"
              component={ShippingScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="PaymentScreen"
              component={PaymentScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="PlaceOrderScreen"
              component={PlaceOrderScreen}
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
