import {AppBar, Container, styled, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    },
});

const AppToolbar = () => {
    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Toolbar>
                <Container maxWidth="xl">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link to="/">CompStore</Link>
                    </Typography>
                </Container>
            </Toolbar>
        </AppBar>
    );
};


export default AppToolbar;