import { configureStore } from '@reduxjs/toolkit';
// import slices
import authReducer from './slices/auth';

// create and export a store (Which is a global state basically)
export const store = configureStore({
    reducer: {
        authReducer
    }
});
