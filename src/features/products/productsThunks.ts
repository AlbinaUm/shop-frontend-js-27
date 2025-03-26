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
        // title: string;
        // description: string;
        // price: number;
        // image: File | null;


        formData.append('title', productToAdd.title);
        formData.append('description', productToAdd.description);
        formData.append('price', String(productToAdd.price));

        // !== null
        if (productToAdd.image) {
            formData.append('image', productToAdd.image);
        }

        await axiosAPI.post('/products', formData);
    }
);