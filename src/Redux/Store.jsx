import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookReducer';

const store = configureStore({
    reducer: {
        books: bookReducer,
    },
});

export default store;
