import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {productsReducer} from "../features/products/productsSlice.ts";
import {categoriesReducer} from "../features/categories/categoriesSlice.ts";
import {usersReducer} from "../features/users/usersSlice.ts";
import storage from 'redux-persist/lib/storage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore, } from "redux-persist";
import {AxiosHeaders, InternalAxiosRequestConfig} from "axios";
import axiosAPI from "../axiosApi.ts";


const usersPersistConfig = {
    key: 'store:users',
    storage,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    users:  persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
            }
        })
});

export const persistor = persistStore(store);

axiosAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    if (!token) return config;

    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', 'Bearer ' + token);
    return config;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;