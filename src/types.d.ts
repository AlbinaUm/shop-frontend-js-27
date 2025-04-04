export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image?: string | null;
}

export interface ProductMutation {
    title: string;
    description: string;
    price: number | string;
    image: File | null;
}