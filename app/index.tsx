import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import HomeScreen from "./screens/HomeScreen";

export default function Index() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}
