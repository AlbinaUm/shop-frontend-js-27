import Grid from "@mui/material/Grid2";
import {Card, CardActions, CardContent, CardHeader, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom";

interface Props {
    title: string;
    price: number;
    id: string;
}

const ProductItem: React.FC<Props> = ({title, price, id}) => {
    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
                <CardHeader title={title} />
                <CardContent>
                    <strong>
                        Price: {price} KGS
                    </strong>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/products/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductItem;