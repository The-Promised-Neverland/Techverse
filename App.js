import React from "react";
import { store } from "./frontend/src/store";
import { Provider } from "react-redux";
import AppNavigator from "./frontend/src/AppNavigator";

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
