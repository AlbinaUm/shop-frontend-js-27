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
        const formData = new FormData();
        const keys = Object.keys(productToAdd) as (keyof ProductMutation)[];

        keys.forEach(key => {
            const value = productToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post('/products', formData);
    }
);

export const editProduct = createAsyncThunk<
    void,
    {productToEdit: ProductMutation, id: string}
>(
    'products/editProduct',
    async ({productToEdit, id}) => {
        const formData = new FormData();
        const keys = Object.keys(productToEdit) as (keyof ProductMutation)[];

        keys.forEach(key => {
            const value = productToEdit[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.patch('/products/' + id, formData);
    }
);