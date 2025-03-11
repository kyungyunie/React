import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./SearchScreen";  // 도시 검색 화면
import WeatherScreen from "./WeatherScreen"; // 날씨 화면

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: "도시 검색" }} />
        <Stack.Screen name="Weather" component={WeatherScreen} options={{ title: "날씨 정보" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
