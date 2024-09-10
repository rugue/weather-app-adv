import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherData } from "../../constants/types/weather";

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  city: string;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  city: "",
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city: string, { rejectWithValue }) => {
    try {
      const API_KEY = "555a78790369426dfb64a4a77a0652ea";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return response.data as WeatherData;
    } catch (error) {
      return rejectWithValue(
        "Failed to fetch weather data. Please check the city name and try again."
      );
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeatherData.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
