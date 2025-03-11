import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, StatusBar } from "react-native";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";

const API_KEY = "889ddeef044f79587bbffa644435bd33";

const weatherIcons = {
  Clear: "☀️",
  Clouds: "🌥️",
  Rain: "🌧️",
  Snow: "❄️",
  Thunderstorm: "⛈️",
  Drizzle: "🌦️",
  Mist: "🌫️",
};

const getBackgroundColor = (weather) => {
  switch (weather) {
    case "Clear": return "#A2C5F2";
    case "Clouds": return "#B0BBD3";
    case "Rain": return "#6D8FA0";
    case "Snow": return "#D3E3FC";
    default: return "#C5A2E2";
  }
};

export default function WeatherScreen({ route }) {
  const [city, setCity] = useState(route.params?.city || "Seoul");
  const [weatherData, setWeatherData] = useState(null);
  const [timezoneOffset, setTimezoneOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#A2C5F2");

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (selectedCity) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&units=metric&appid=${API_KEY}`
      );
      const data = response.data;
      setWeatherData(data.list);
      setTimezoneOffset(data.city.timezone);
      setBackgroundColor(getBackgroundColor(data.list[0].weather[0].main));
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
    setLoading(false);
  };

  // ✅ 5일간의 최저·최고 기온 계산
  const getDailyTemperature = () => {
    if (!weatherData) return [];

    const groupedData = weatherData.reduce((acc, entry) => {
      const date = moment.utc(entry.dt_txt).add(timezoneOffset, "seconds").format("YYYY-MM-DD");

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry.main.temp);
      return acc;
    }, {});

    return Object.keys(groupedData).map((date, index) => {
      const isToday = index === 0; // 첫 번째 날짜는 '오늘'로 표시
      const dailyTemps = groupedData[date];
      return {
        date: isToday ? "오늘" : moment(date).format("ddd"),
        tempMin: Math.min(...dailyTemps), // ✅ 하루 최저 기온 계산
        tempMax: Math.max(...dailyTemps), // ✅ 하루 최고 기온 계산
        weather: weatherData.find((d) => moment.utc(d.dt_txt).format("YYYY-MM-DD") === date)?.weather[0].main || "Clear",
      };
    });
  };

  const dailyTemperatures = getDailyTemperature();

  return (
    <ScrollView style={[styles.container, { backgroundColor }]} contentContainerStyle={styles.scrollContent}>
      <StatusBar barStyle="light-content" />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          <Text style={styles.cityName}>{city}</Text>
          <Text style={styles.mainTemp}>{Math.round(weatherData[0].main.temp)}°</Text>
          <Text style={styles.description}>{weatherData[0].weather[0].description}</Text>
          <Text style={styles.feelsLike}>체감 온도: {Math.round(weatherData[0].main.feels_like)}°</Text>
          <Text style={styles.highLow}>최고: {Math.round(weatherData[0].main.temp_max)}° | 최저: {Math.round(weatherData[0].main.temp_min)}°</Text>

          {/* 📌 시간별 일기예보 */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>시간별 일기예보</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
              {weatherData.slice(0, 8).map((hour, index) => (
                <View key={index} style={styles.hourlyBox}>
                  <Text style={styles.hour}>{moment.utc(hour.dt_txt).add(timezoneOffset, "seconds").format("HH:mm")}</Text>
                  <Text style={styles.weatherIcon}>{weatherIcons[hour.weather[0].main] || "☀️"}</Text>
                  <Text style={styles.temp}>{Math.round(hour.main.temp)}°</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* 📌 5일간의 일기예보 */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>5일간의 일기예보</Text>
            {dailyTemperatures.slice(0, 5).map((day, index) => (
              <View key={index} style={styles.dailyBox}>
                <Text style={styles.day}>{day.date}</Text>
                <Text style={styles.weatherIcon}>{weatherIcons[day.weather] || "☀️"}</Text>
                <Text style={styles.minTemp}>{Math.round(day.tempMin)}°</Text>
                <View style={styles.tempBar}>
                  <View style={[styles.tempFill, { width: `${(day.tempMax - day.tempMin) * 5}%` }]} />
                </View>
                <Text style={styles.maxTemp}>{Math.round(day.tempMax)}°</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { alignItems: "center", paddingVertical: 20 },
  cityName: { fontSize: 40, fontWeight: "bold", color: "white" },
  mainTemp: { fontSize: 80, fontWeight: "bold", color: "white" },
  description: { fontSize: 22, fontWeight: "bold", color: "white", marginVertical: 5 },
  feelsLike: { fontSize: 18, fontWeight: "normal", color: "white", marginVertical: 5 },
  highLow: { fontSize: 18, fontWeight: "normal", color: "white" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "white", marginBottom: 5 },
  card: { backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: 15, padding: 15, marginVertical: 10, width: "90%" },
  
  // ✅ 시간별 예보 스타일
  hourlyScroll: { marginVertical: 10 },
  hourlyBox: { alignItems: "center", marginHorizontal: 10 },
  hour: { fontSize: 16, fontWeight: "600", color: "white" },
  weatherIcon: { fontSize: 30 },
  temp: { fontSize: 18, fontWeight: "600", color: "white" },

  // ✅ 5일간의 예보 스타일
  dailyBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.3)",
  },
  day: { fontSize: 18, fontWeight: "bold", color: "white", width: 50 },
  minTemp: { fontSize: 18, color: "white", width: 30, textAlign: "right" },
  maxTemp: { fontSize: 18, color: "white", width: 30, textAlign: "left" },

  // ✅ 막대바 스타일 (최저·최고 기온 반영)
  tempBar: { 
    flex: 1, 
    height: 6, 
    backgroundColor: "rgba(255,255,255,0.2)", 
    borderRadius: 3, 
    marginHorizontal: 5,
    overflow: "hidden",
    position: "relative",
  },
  tempFill: { 
    height: 6, 
    backgroundColor: "#FFD700", 
    borderRadius: 3,
    position: "absolute",
    left: 0, // ✅ 막대바가 최저 기온에 맞게 정렬되도록 변경
  },
});
