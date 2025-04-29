import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {productsReducer} from "../features/products/productsSlice.ts";
import {categoriesReducer} from "../features/categories/categoriesSlice.ts";
import {usersReducer} from "../features/users/usersSlice.ts";
import storage from 'redux-persist/lib/storage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore, } from "redux-persist";


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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;