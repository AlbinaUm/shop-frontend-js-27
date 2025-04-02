import Grid from "@mui/material/Grid2";
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import ProductItem from "./components/ProductItem/ProductItem.tsx";
import {useProductsStore} from "./productsStore.ts";



const Products = () => {
   const {items, fetchLoading, fetchAllProducts} = useProductsStore();


    useEffect(() => {
        void fetchAllProducts();
    }, [fetchAllProducts])

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
            {fetchLoading ? <Spinner /> :
                <>
                    {items.length === 0 ? <Typography variant='h4'>No products yet</Typography> :
                        <Grid container direction="row" spacing={1}>
                            {items.map(product => (
                                <ProductItem
                                    key={product.id}
                                    title={product.title}
                                    price={product.price}
                                    id={product.id}
                                    image={product.image || undefined}
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