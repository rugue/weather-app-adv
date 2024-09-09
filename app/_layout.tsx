import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Weather App" }} />
        <Stack.Screen name="details" options={{ title: "Weather Details" }} />
      </Stack>
    </Provider>
  );
}
