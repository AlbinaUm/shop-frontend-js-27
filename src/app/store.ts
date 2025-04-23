import {configureStore} from "@reduxjs/toolkit";
import {productsReducer} from "../features/products/productsSlice.ts";
import {categoriesReducer} from "../features/categories/categoriesSlice.ts";
import {usersReducer} from "../features/users/usersSlice.ts";

export const store = configureStore({
    reducer:{
        products: productsReducer,
        categories: categoriesReducer,
        users: usersReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;