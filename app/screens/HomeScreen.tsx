import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchWeatherData } from "../store/weatherSlice";

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data: weatherData,
    loading,
    error,
  } = useAppSelector((state) => state.weather);

  const fetchWeather = useCallback(() => {
    dispatch(fetchWeatherData("London"));
  }, [dispatch]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
        <Button title="Retry" onPress={fetchWeather} />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>No weather data available</Text>
        <Button title="Fetch Weather" onPress={fetchWeather} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weatherData.name}</Text>
      <Text style={styles.temperature}>
        {Math.round(weatherData.main.temp)}°C
      </Text>
      <Text style={styles.description}>
        {weatherData.weather[0].description}
      </Text>
      <Button
        title="View Details"
        onPress={() =>
          router.push({
            pathname: "/details",
            params: { weatherData: JSON.stringify(weatherData) },
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  city: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 64,
    fontWeight: "bold",
  },
  description: {
    fontSize: 24,
    marginTop: 10,
  },
});

export default HomeScreen;
