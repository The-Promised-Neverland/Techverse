import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <View style={styles.container}>
      <StepItem step={step1} label="Sign In" />
      <StepItem step={step2} label="Shipping" />
      <StepItem step={step3} label="Payment" />
      <StepItem step={step4} label="Order" />
    </View>
  );
};

const StepItem = ({ step, label }) => {
  return (
    <View style={styles.stepItem}>
      <Text style={step ? styles.stepText : styles.disabledStepText}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20
  },
  stepItem: {
    flex: 1,
    alignItems: "center",
  },
  stepText: {
    fontWeight: "800",
    fontSize: 16, 
    color: "black", // Customize the active step text color here
  },
  disabledStepText: {
    fontSize: 16,
    color: "gray", // Customize the disabled step text color here
  },
});

export default CheckoutSteps;
