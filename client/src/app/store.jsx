import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../features/auth/authSlice';
import { apiSlice } from '../app/api/apiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer, // Auth slice reducer
        [apiSlice.reducerPath]: apiSlice.reducer,  
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), // Add API middleware
    devTools: true, // Enable Redux DevTools
});

// Enable cache-based listeners for API queries
setupListeners(store.dispatch);
