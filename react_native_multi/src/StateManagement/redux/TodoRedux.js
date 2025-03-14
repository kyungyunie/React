import { createSlice } from '@reduxjs/toolkit';

// 1. 초기 상태 정의
const initialState = {
    todos: [],
};

// 2. createSlice 생성
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // 3. 액션 생성
        addTodo: (state, action) => {
            state.todos.push({
                id: Date.now(),
                text: action.payload,
                completed: false
            });
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
    },
});

// 4. 액션 내보내기
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

// 5. 리듀서 내보내기
export default todoSlice.reducer;