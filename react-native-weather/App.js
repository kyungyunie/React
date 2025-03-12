import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // 네비게이션 컨테이너 (앱의 네비게이션 구조를 감싸는 역할)
import { createStackNavigator } from "@react-navigation/stack"; // 스택 네비게이터 생성
import SearchScreen from "./SearchScreen";  // 도시 검색 화면 컴포넌트 가져오기
import WeatherScreen from "./WeatherScreen"; // 날씨 화면 컴포넌트 가져오기

// 스택 네비게이터 생성
const Stack = createStackNavigator();

export default function App() {
  return (
    // 네비게이션 컨테이너로 전체 네비게이션 구조 감싸기
    <NavigationContainer>
      {/* 스택 네비게이터 설정 */}
      <Stack.Navigator initialRouteName="Search"> 
        {/* 초기 화면을 "Search" (도시 검색 화면)으로 설정 */}

        {/* 도시 검색 화면 */}
        <Stack.Screen 
          name="Search" // 화면 이름
          component={SearchScreen} // 연결할 컴포넌트
          options={{ title: "도시 검색" }} // 화면 상단 제목
        />

        {/* 날씨 정보 화면 */}
        <Stack.Screen 
          name="Weather" // 화면 이름
          component={WeatherScreen} // 연결할 컴포넌트
          options={{ title: "날씨 정보" }} // 화면 상단 제목
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
