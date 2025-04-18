import Grid from "@mui/material/Grid2";
import {Button, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import ProductItem from "./components/ProductItem/ProductItem.tsx";
import {useProductsStore} from "./productsStore.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchAllCategories} from "../categories/categoriesThunks.ts";
import {selectCategories} from "../categories/categoriesSlice.ts";


const Products = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const {items, fetchLoading, fetchAllProducts} = useProductsStore();
    const {category_id} = useParams();


    useEffect(() => {
        void fetchAllProducts(category_id);
        dispatch(fetchAllCategories());
    }, [fetchAllProducts, dispatch, category_id])

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
            {fetchLoading ? <Spinner/> :
                <Grid container justifyContent="space-between">

                    <Grid size={3}>
                        {categories.length > 0 ?
                            <ul>
                                <li><Button variant="text" component={Link} to={`/`}>Все</Button></li>
                                {categories.map(category => (
                                    <li key={category._id}><Button variant="text" component={Link} to={`/${category._id}`}>{category.title}</Button></li>
                                ))}
                            </ul>
                            :
                            null
                        }
                    </Grid>

                    <Grid size={8}>
                        {items.length === 0 ? <Typography variant='h4'>No products yet</Typography> :
                            <Grid container direction="row" spacing={1}>
                                {items.map(product => (
                                    <ProductItem
                                        key={product._id}
                                        title={product.title}
                                        category_title={product.category.title}
                                        price={product.price}
                                        id={product._id}
                                        image={product.image || undefined}
                                    />
                                ))}
                            </Grid>
                        }
                    </Grid>
                </Grid>
            }

        </Grid>
    );
};

export default Products;