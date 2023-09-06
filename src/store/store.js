import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { apiSlice } from './apiSlice'
// import authenReducer from './authenSlice'
// import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // authen: authenReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

// setupListeners(store.dispatch)
