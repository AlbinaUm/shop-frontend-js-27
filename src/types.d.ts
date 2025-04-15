export interface Product {
    _id: string;
    category: {
        _id: string;
        title: string;
    };
    title: string;
    description: string;
    price: number;
    image?: string | null;
}

export interface Category {
    _id: string;
    title: string;
    description: string;
}


export interface ProductMutation {
    category: string;
    title: string;
    description: string;
    price: number | string;
    image: File | null;
}