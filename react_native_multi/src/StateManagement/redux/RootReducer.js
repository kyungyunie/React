import { combineReducers } from '@reduxjs/toolkit';
import todoSlice from './TodoRedux';

const rootReducer = combineReducers({
    todos: todoSlice,
});

export default rootReducer;
