import {Typography} from "@mui/material";
import ProductForm from "./components/ProductForm/ProductForm.tsx";
import {ProductMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {createProduct} from "./productsThunks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const NewProduct = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCreateNewProduct = async (product: ProductMutation) => {
        try {
            await dispatch(createProduct(product)).unwrap();
            toast.success("Product was successfully created!");
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
                New product
            </Typography>
            <ProductForm onSubmitProduct={onCreateNewProduct}/>
        </>
    );
};

export default NewProduct;