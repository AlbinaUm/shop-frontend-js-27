import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {Product, ProductMutation} from "../../types";

export const fetchAllProducts = createAsyncThunk<Product[], void>(
    'products/fetchAllProducts',
    async () => {
        const response = await axiosAPI.get<Product[]>('/products');
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk<Product, string>(
    'products/fetchProductById',
    async (product_id) => {
        const response = await axiosAPI.get<Product>('/products/' + product_id);
        return response.data || null;
    }
);


export const createProduct = createAsyncThunk<void, ProductMutation>(
    'products/createProduct',
    async (productToAdd) => {
        const newProduct = {
            ...productToAdd,
            price: Number(productToAdd.price),
        };
        await axiosAPI.post('/products', newProduct);
    }
);