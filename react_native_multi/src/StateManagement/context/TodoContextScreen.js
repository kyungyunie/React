import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { TodoContext } from './TodoContext';
import { FontAwesome5 } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;

const TodoContextScreen = () => {
    const { todos, addTodo, toggleTodo, deleteTodo } = useContext(TodoContext);
    const [text, setText] = useState('');

    const handleAddTodo = () => {
        if (text.trim()?.length > 0) {
            addTodo(text.trim());
            setText('');
        } else {
            Alert.alert('텍스트를 입력해주세요');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => toggleTodo(item.id)}>
            <View style={styles.todoItem}>
                <View style={[styles.checkbox, item.completed && styles.completed]}
                />
                <Text style={[styles.todoText, item.completed && styles.completedText]}>
                    {item.text}
                </Text>
                <TouchableOpacity
                    onPress={(e) => {
                        e.stopPropagation();
                        deleteTodo(item.id)
                    }}
                    style={styles.deleteButton}
                >
                    <FontAwesome5 name="trash" size={17} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="할 일을 입력하세요"
                />
                <TouchableOpacity
                    onPress={handleAddTodo}
                    style={styles.addButton}
                >
                    <FontAwesome5 name="plus" size={17} color="white" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>할 일이 없습니다</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        height: screenHeight,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    addButton: {
        width: 50,
        backgroundColor: '#8B00FF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#8B00FF',
        borderRadius: 4,
        marginRight: 10,
    },
    completed: {
        backgroundColor: '#8B00FF',
    },
    todoText: {
        flex: 1,
        fontSize: 16,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    deleteButton: {
        padding: 10,
        backgroundColor: '#ff4444',
        borderRadius: 5,
    },
    emptyContainer: {
        flex: 1,
        minHeight: screenHeight / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
    }
});

export default TodoContextScreen;