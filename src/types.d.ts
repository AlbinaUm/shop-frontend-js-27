export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image?: string | null;
}

export interface Category {
    id: string;
    title: string;
    description: string;
}


export interface ProductMutation {
    category_id: number;
    title: string;
    description: string;
    price: number | string;
    image: File | null;
}