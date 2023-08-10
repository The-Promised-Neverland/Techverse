import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import Techverse from "../../../assets/favicon.png";

const SplashScreen = () => {
  const navigation = useNavigation();

  const fadeAnim = new Animated.Value(0);
  const spinAnim = new Animated.Value(0);

  const setup = async () => {
    navigation.navigate("HomeScreen");
  };

  useEffect(() => {
    // Spin Animation
    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // Fade-in Animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setup();
    }, 3000);
  }, [fadeAnim, navigation, spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Techverse}
        style={[
          styles.logo,
          { opacity: fadeAnim, transform: [{ rotate: spin }] },
        ]}
      />
      <Text style={styles.text}>Your stop for everything tech</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default SplashScreen;
