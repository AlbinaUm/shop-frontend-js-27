import Grid from "@mui/material/Grid2";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectProducts, selectProductsLoading} from "./productsSlice.ts";
import {fetchAllProducts} from "./productsThunks.ts";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import ProductItem from "./components/ProductItem/ProductItem.tsx";


const Products = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const productsFetchLoading = useAppSelector(selectProductsLoading);

    useEffect(() => {
      dispatch(fetchAllProducts());
    }, [dispatch])

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">
                        Products
                    </Typography>
                </Grid>
                <Grid>
                    <Button color="primary" component={Link} to='/products/new'>
                        Add product
                    </Button>
                </Grid>
            </Grid>
            {productsFetchLoading ? <Spinner /> :
                <>
                    {products.length === 0 ? <Typography variant='h4'>No products yet</Typography> :
                        <Grid container direction="row" spacing={1}>
                            {products.map(product => (
                                <ProductItem
                                    key={product.id}
                                    title={product.title}
                                    price={product.price}
                                    id={product.id}
                                />
                            ))}
                        </Grid>
                    }
                </>
            }

        </Grid>
    );
};

export default Products;