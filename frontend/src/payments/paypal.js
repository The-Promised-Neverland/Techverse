import React from "react";
import { Modal } from "react-native";
import WebView from "react-native-webview";

const PayPal = ({ session, setPaypalVisible, paypalVisible, setPaymentId }) => {

  const handleStateChange = async (navstate) => {
    const url = navstate.url;
    if (url.includes("/success")) {
      const queryString = url.split("?")[1];
      const paramsArray = queryString.split("&");

      let paymentId;
      for (const param of paramsArray) {
        const [key, value] = param.split("=");
        if (key === "paymentId") {
          paymentId = value;
          break;
        }
      }
      setPaymentId(paymentId);
    } else if (url.includes("/cancel")) {
      setPaypalVisible(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={paypalVisible}
      onRequestClose={() => setPaypalVisible(false)}
    >
      <WebView
        startInLoadingState={true}
        source={{ uri: session }}
        onNavigationStateChange={(navstate) => handleStateChange(navstate)}
      />
    </Modal>
  );
};

export default PayPal;
