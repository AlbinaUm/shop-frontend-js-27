import {User} from "../../../types";
import {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [userOptionsEl, setUserOptionsEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserOptionsEl(event.currentTarget);
    };

    const handleClose = () => {
      setUserOptionsEl(null);
    };

    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                Hello, {user.username}!
            </Button>
            <Menu
                keepMounted
                anchorEl={userOptionsEl}
                open={Boolean(userOptionsEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <Button component={NavLink} to='/products/new' onClick={handleClose}>Add product</Button>
                </MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;