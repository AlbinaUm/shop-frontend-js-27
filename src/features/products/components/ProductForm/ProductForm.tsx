import Grid from "@mui/material/Grid2";
import {Button, MenuItem, TextField} from "@mui/material";
import {ProductMutation} from "../../../../types";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {productSchema} from "../../../../zodSchemas/productsSchemas.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {useEffect} from "react";
import {fetchAllCategories} from "../../../categories/categoriesThunks.ts";
import {selectCategories, selectCategoriesLoading} from "../../../categories/categoriesSlice.ts";

interface Props {
    onSubmitProduct: (product: ProductMutation) => void;
}

const ProductForm: React.FC<Props> = ({onSubmitProduct}) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const categoriesLoading = useAppSelector(selectCategoriesLoading);
    const {register, handleSubmit, formState: {errors}, setValue} = useForm(
        {
            resolver: zodResolver(productSchema),
            defaultValues: {
                category: '',
                title: '',
                description: '',
                price: '0',
                image: null,
            }
        });

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch])

    const onSubmit = (data: ProductMutation) => {
        onSubmitProduct({...data});
    };

    const fileInputChangeHandler = (eFile: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = eFile.target;

        if (files) {
            setValue('image', files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        select
                        disabled={categoriesLoading}
                        style={{width: '100%'}}
                        id="category"
                        label="Category"
                        {...register("category")}
                        error={!!errors.category}
                        helperText={errors.category?.message}
                    >
                        <MenuItem value='' disabled>Select category</MenuItem>
                        {categories.map(category => (
                            <MenuItem value={category._id} key={category._id}>{category.title}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="title"
                        label="Title"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        type={'number'}
                        id="price"
                        label="Price"
                        {...register("price")}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        multiline rows={3}
                        id="description"
                        label="Description"
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <FileInput
                        name='image'
                        label='Image'
                        onChange={fileInputChangeHandler}
                        errors={!!errors.image}
                        helperText={errors.image?.message}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button style={{width: '100%'}} type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;