import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CITIES = ["Seoul", "Busan", "Tokyo", "New York", "Paris", "London", "Sydney", "Beijing"];

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleInputChange = (text) => {
    setQuery(text);
    setFilteredCities(CITIES.filter((city) => city.toLowerCase().includes(text.toLowerCase())));
  };

  const selectCity = async (city) => {
    await AsyncStorage.setItem("lastCity", city); // 선택한 도시 저장
    navigation.navigate("Weather", { city });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="도시를 입력하세요"
        value={query}
        onChangeText={handleInputChange}
      />
      <FlatList
        data={filteredCities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cityItem} onPress={() => selectCity(item)}>
            <Text style={styles.cityName}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: { height: 50, borderBottomWidth: 1, borderBottomColor: "#ccc", fontSize: 18, marginBottom: 10 },
  cityItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#eee" },
  cityName: { fontSize: 18 },
});
