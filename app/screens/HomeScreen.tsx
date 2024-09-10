import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchWeatherData, setCity } from "../store/weatherSlice";

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data: weatherData,
    loading,
    error,
    city,
  } = useAppSelector((state) => state.weather);
  const [inputCity, setInputCity] = useState(city);

  const fetchWeather = useCallback(
    (cityName: string) => {
      if (cityName.trim()) {
        dispatch(setCity(cityName.trim()));
        dispatch(fetchWeatherData(cityName.trim()));
      } else {
        Alert.alert("Invalid Input", "Please enter a valid city name.");
      }
    },
    [dispatch]
  );

  const handleSubmit = () => {
    fetchWeather(inputCity);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputCity}
          onChangeText={setInputCity}
          placeholder="Enter city name"
        />
        <Button title="Search" onPress={handleSubmit} disabled={loading} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : weatherData ? (
        <>
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
        </>
      ) : (
        <Text>Enter a city name and press 'Search' to get weather data.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
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
    marginBottom: 20,
  },
  error: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default HomeScreen;
