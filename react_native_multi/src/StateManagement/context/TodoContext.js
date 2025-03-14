import React, { createContext, useState } from 'react';

// 1. Context 생성
export const TodoContext = createContext();

// 2. Provider 컴포넌트 생성
export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    // 3. 할 일 추가 함수
    const addTodo = (text) => {
        setTodos(prev => [...prev, { id: Date.now(), text, completed: false }]);
    };

    // 4. 할 일 완료 토글 함수
    const toggleTodo = (id) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // 5. 할 일 삭제 함수
    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    // 6. Provider 컴포넌트 반환
    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};






