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
    image?: File | null;
}

export interface RegisterMutation {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface User {
    _id: string;
    email: string;
    token: string;
    role: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface GlobalError {
    error: string;
}