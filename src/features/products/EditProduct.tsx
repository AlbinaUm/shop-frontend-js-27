import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOneProduct, selectProductsLoading} from "./productsSlice.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {createProduct, fetchProductById} from "./productsThunks.ts";
import {Container, Typography} from "@mui/material";
import ProductForm from "./components/ProductForm/ProductForm.tsx";
import {ProductMutation} from "../../types";
import {toast} from "react-toastify";


const EditProduct = () => {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectOneProduct);
    const fetchLoading = useAppSelector(selectProductsLoading);
    const navigate = useNavigate();
    const {product_id} = useParams();

    useEffect(() => {
        if (product_id) {
            dispatch(fetchProductById(product_id))
        }
    }, [dispatch, product_id])



    const onEditProduct = async (product: ProductMutation) => {
        try {
            await dispatch(createProduct(product)).unwrap();
            toast.success("Product was successfully edited.!");
            navigate('/');
        } catch (e) {
            toast.error("Product was not successfully edited");
            console.error(e);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{textAlign: "center"}}>
                <strong>Edit product</strong>
            </Typography>
            <ProductForm onSubmitProduct={onEditProduct} productToEdit={product} />
        </Container>
    );
};

export default EditProduct;