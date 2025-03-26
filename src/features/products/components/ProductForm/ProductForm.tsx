import {useState} from "react";
import Grid from "@mui/material/Grid2";
import {Button, TextField} from "@mui/material";
import {ProductMutation} from "../../../../types";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";

interface Props {
    onSubmitProduct: (product: ProductMutation) => void;
}

const ProductForm: React.FC<Props> = ({onSubmitProduct}) => {
    const [form, setForm] = useState<ProductMutation>({
        title: '',
        description: '',
        price: 0,
        image: null,
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitProduct({...form});
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };

    const fileInputChangeHandler = (eFile: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = eFile.target;

        if (files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width:'100%'}}
                        id="title"
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width:'100%'}}
                        InputProps={{ inputProps: { min: 1} }}
                        type={'number'}
                        id="price"
                        label="Price"
                        name="price"
                        value={form.price}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width:'100%'}}
                        multiline rows={3}
                        id="description"
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                   <FileInput
                       name='image'
                       label='Image'
                       onChange={fileInputChangeHandler}
                   />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button style={{width:'100%'}} type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;