import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // 아이콘 사용을 위한 라이브러리 추가

// 한국 도시 리스트 (한글 → 영어 변환 추가)
const KOREAN_CITIES = {
  "서울": "Seoul", "부산": "Busan", "인천": "Incheon", "대구": "Daegu",
  "대전": "Daejeon", "광주": "Gwangju", "울산": "Ulsan", "수원": "Suwon",
  "청주": "Cheongju", "창원": "Changwon", "성남": "Seongnam", "고양": "Goyang",
  "용인": "Yongin", "전주": "Jeonju", "천안": "Cheonan", "안산": "Ansan",
  "안양": "Anyang", "남양주": "Namyangju", "김해": "Gimhae", "포항": "Pohang",
  "의정부": "Uijeongbu", "시흥": "Siheung", "구미": "Gumi", "진주": "Jinju",
  "강릉": "Gangneung", "양산": "Yangsan", "제주": "Jeju", "춘천": "Chuncheon",
  "서산": "Seosan"
};

// 해외 도시 리스트 (한글 → 영어 변환 추가)
const INTERNATIONAL_CITIES = {
  "도쿄": "Tokyo", "오사카": "Osaka", "뉴욕": "New York", "파리": "Paris",
  "런던": "London", "베를린": "Berlin", "로마": "Rome", "마드리드": "Madrid",
  "토론토": "Toronto", "시드니": "Sydney", "방콕": "Bangkok",
  "싱가포르": "Singapore", "홍콩": "Hong Kong", "베이징": "Beijing",
  "상하이": "Shanghai", "두바이": "Dubai", "모스크바": "Moscow"
};

// 전체 도시 리스트 (한글 기준으로 검색할 수 있도록 키 값 사용)
const CITIES = [...Object.keys(KOREAN_CITIES), ...Object.keys(INTERNATIONAL_CITIES)];

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState(""); // 사용자가 입력한 검색어 상태
  const [filteredCities, setFilteredCities] = useState([]); // 검색 결과 목록 상태

  const handleInputChange = (text) => {
    setQuery(text);

    if (text.trim() === "") {
      setFilteredCities([]); // 검색어가 없으면 목록 숨김
      return;
    }

    // 한국 및 해외 도시 한글 → 영어 변환 적용
    const translatedCity = KOREAN_CITIES[text] || INTERNATIONAL_CITIES[text] || text;

    // 검색어가 포함된 도시 필터링
    setFilteredCities(
      CITIES.filter((city) =>
        city.includes(text) || (KOREAN_CITIES[city] && KOREAN_CITIES[city].toLowerCase().includes(text.toLowerCase()))
      )
    );
  };

  const selectCity = async (city) => {
    const translatedCity = KOREAN_CITIES[city] || INTERNATIONAL_CITIES[city] || city;
    await AsyncStorage.setItem("lastCity", translatedCity); // 마지막 검색 도시를 저장
    setQuery(""); // 검색 입력창 초기화
    setFilteredCities([]); // 검색 결과 목록 숨김
    navigation.navigate("Weather", { city: translatedCity }); // 날씨 화면으로 이동하면서 선택된 도시 전달
  };

  return (
    <View style={styles.container}>
      {/* 왼쪽 상단 '날씨' 타이틀 */}
      <Text style={styles.title}>날씨</Text>

      {/* 검색 입력창 컨테이너 */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="도시를 입력하세요"
          placeholderTextColor="#A0A0A0"
          value={query}
          onChangeText={handleInputChange}
        />
      </View>

      {/* 검색 결과 목록 (검색어 입력 시만 표시) */}
      {filteredCities.length > 0 && (
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.cityItem} onPress={() => selectCity(item)}>
              <Text style={styles.cityName}>{item}</Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1C1E", // 검정색 배경 (세련된 스타일)
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // 반투명한 검은색 배경
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "white",
    height: "100%",
  },
  cityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)", // 부드러운 하얀색 선
    alignItems: "center",
  },
  cityName: {
    fontSize: 18,
    color: "white",
  },
});
