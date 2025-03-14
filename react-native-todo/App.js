import React, { useEffect, useState, useRef } from 'react';
import { 
  StatusBar, Text, TextInput, TouchableOpacity, View, ScrollView, 
  StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const STORAGE_KEY = "todos";

const theme = {
  bg: "#1E1E1E",
  white: "#FFFFFF",
  grey: "#A9A9A9",
  toDoBg: "#3A3D40",
  highlight: "#FFD700",
};

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [filter, setFilter] = useState("all");

  const inputRef = useRef(null);

  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const onChangeText = (input) => setText(input);

  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      Alert.alert("목록 저장에 실패했습니다.");
    }
  };

  const loadToDos = async () => {
    try {
      const stringToDos = await AsyncStorage.getItem(STORAGE_KEY);
      if (stringToDos) {
        setToDos(JSON.parse(stringToDos));
      }
    } catch (e) {
      Alert.alert("목록 불러오기에 실패했습니다.");
    }
  };

  const addTodo = () => {
    if (!selectedDate || text.trim() === "") return;
    const newToDos = { 
      ...toDos, 
      [Date.now()]: { text, working, completed: false, date: selectedDate } 
    };
    setToDos(newToDos);
    saveToDos(newToDos);
    setText('');
  };

  const toggleComplete = (key) => {
    const newToDos = { 
      ...toDos, 
      [key]: { ...toDos[key], completed: !toDos[key].completed } 
    };
    setToDos(newToDos);
    saveToDos(newToDos);
  };

  const deleteTodo = async (key) => {
    const newToDos = { ...toDos };
    delete newToDos[key];
    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  useEffect(() => {
    loadToDos();
  }, []);

  const getFilteredToDos = () => {
    return Object.keys(toDos).filter((key) => {
      const todo = toDos[key];
      if (todo.working !== working || todo.date !== selectedDate) return false;
      if (filter === "progress") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoiding}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar style="auto" />

          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={work} style={styles.modeButton}>
                <Text style={[styles.btnText, working ? styles.activeText : styles.inactiveText]}>Work</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={travel} style={styles.modeButton}>
                <Text style={[styles.btnText, !working ? styles.activeText : styles.inactiveText]}>Travel</Text>
              </TouchableOpacity>
            </View>

            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={selectedDate ? { [selectedDate]: { selected: true, selectedColor: theme.highlight } } : {}}
              theme={{
                backgroundColor: theme.bg,
                calendarBackground: theme.bg,
                dayTextColor: theme.white,
                monthTextColor: theme.white,
                textDisabledColor: theme.grey,
                arrowColor: theme.white,
              }}
              style={styles.calendar}
            />

            {selectedDate && (
              <>
                <View style={styles.filterContainer}>
                  <TouchableOpacity onPress={() => setFilter("all")} style={styles.filterButton}>
                    <Text style={[styles.filterText, filter === "all" && styles.activeText]}>전체</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setFilter("progress")} style={styles.filterButton}>
                    <Text style={[styles.filterText, filter === "progress" && styles.activeText]}>진행 중</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setFilter("completed")} style={styles.filterButton}>
                    <Text style={[styles.filterText, filter === "completed" && styles.activeText]}>완료</Text>
                  </TouchableOpacity>
                </View>

                <TextInput 
                  ref={inputRef}
                  style={styles.input}
                  placeholder={working ? "Add a To Do" : "Where do you want to go?"}
                  placeholderTextColor="#CCCCCC"
                  onChangeText={onChangeText}
                  onSubmitEditing={addTodo} 
                  returnKeyType="done"
                  value={text} 
                  editable={true}
                />

                {getFilteredToDos().map((key) => (
                  <View key={key} style={styles.toDo}>
                    <TouchableOpacity onPress={() => toggleComplete(key)}>
                      <FontAwesome name={toDos[key].completed ? "check-circle" : "circle-o"} size={32} color="white" />
                    </TouchableOpacity>
                    <Text style={[styles.toDoText, toDos[key].completed && styles.completedText]}>
                      {toDos[key].text}
                    </Text>
                    <TouchableOpacity onPress={() => deleteTodo(key)}>
                      <FontAwesome name="trash" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoiding: { flex: 1, backgroundColor: theme.bg },
  container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 20, paddingTop: 40 },
  scrollContainer: { flexGrow: 1, backgroundColor: theme.bg, paddingBottom: 100 },
  header: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  modeButton: { padding: 15 },
  btnText: { fontSize: 32, fontWeight: "700" },
  activeText: { color: theme.white },
  inactiveText: { color: theme.grey },
  calendar: { marginBottom: 20 },
  filterContainer: { flexDirection: "row", justifyContent: "space-around", marginVertical: 10 },
  filterButton: { padding: 10 },
  filterText: { fontSize: 18, color: theme.grey },
  input: { backgroundColor: theme.white, padding: 15, borderRadius: 10, fontSize: 18, marginBottom: 20 },
  toDo: { backgroundColor: theme.toDoBg, padding: 20, borderRadius: 10, marginVertical: 5, flexDirection: "row", justifyContent: "space-between" },
  toDoText: { color: theme.white, fontSize: 18 },
  completedText: { textDecorationLine: "line-through", color: theme.grey },
});
