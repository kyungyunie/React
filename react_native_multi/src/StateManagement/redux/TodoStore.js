import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';

// 1. persistConfig 설정
const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Redux가 저장되는 Storage로 AsyncStorage를 이용
};

// 2. persistReducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Store 구성
export const store = configureStore({
    reducer: persistedReducer,  // reducer 구성
    middleware: (getDefaultMiddleware) => // middleware 구성
        getDefaultMiddleware({
            serializableCheck: {
                // Redux Persist 액션 무시
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat(logger)
});

// 4. persistStore 생성
export const persistor = persistStore(store);

// 5. dispatch 생성
export const todoDispatch = store.dispatch;
