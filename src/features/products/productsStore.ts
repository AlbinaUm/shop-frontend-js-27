import {Product} from "../../types";
import {create} from "zustand/react";
import axiosAPI from "../../axiosApi.ts";

interface ProductsState {
    items: Product[];
    item: Product | null;
    fetchLoading: boolean;
    createLoading: boolean;
    fetchAllProducts: () => Promise<void>;
    fetchProductById: (product_id: string) => Promise<void>;
}


export const useProductsStore = create<ProductsState>((set) => ({
    items: [],
    item: null,
    fetchLoading: false,
    createLoading: false,
    fetchAllProducts: async () => {
        set({fetchLoading: true});

        try {
            const response = await axiosAPI.get<Product[]>('/products');
            set({items: response.data || []});
        } catch (e) {
            console.error(e);
        } finally {
            set({fetchLoading: false});
        }
    },
    fetchProductById: async (product_id: string) => {
        set({fetchLoading: true});

        try {
            const response = await axiosAPI.get<Product | null>('/products/' + product_id);
            set({item: response.data || null});
        } catch (e) {
            console.error(e);
        } finally {
            set({fetchLoading: false});
        }
    }
}))