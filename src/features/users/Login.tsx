import {useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import {Alert, Button, TextField} from "@mui/material";
import {LoginMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectLoginError, selectLoginLoading} from "./usersSlice.ts";
import {facebookLogin, googleLogin, login} from "./usersThunks.ts";
import {toast} from "react-toastify";
import {GoogleLogin} from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import {FACEBOOK_APP_ID} from "../../../globalConstants.ts";


const Login = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectLoginError);
    const loginLoading = useAppSelector(selectLoginLoading);
    const navigate = useNavigate();
    const [form, setForm] = useState<LoginMutation>({
        email: '',
        password: '',
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(login(form)).unwrap();
            navigate("/");
            toast.success("Login successful");
        } catch (error) {
            console.error(error);
        }
    };

    const googleLoginHandler =  async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/');
        toast.success("Google facebook successful");
    };

    const facebookLoginHandler =  async (userID: string, accessToken: string) => {
        await dispatch(facebookLogin({userID, accessToken})).unwrap();
        navigate('/');
        toast.success("Login facebook successful");
    };


    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOpenIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>

            {error && (
                <Alert severity="error">
                    {error.error}
                </Alert>
            )}

            <Box sx={{pt: 2}}>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        if (credentialResponse.credential) {
                            void googleLoginHandler(credentialResponse.credential);
                        }
                    }}
                    onError={() => {
                        console.log('Login failed');
                    }}
                />
            </Box>

            <Box>
                <Button
                    onClick={() => {
                        window.location.href=`https://github.com/login/oauth/authorize?client_id=Ov23liWcvgPgetctZVrq`
                    }}
                >
                    Github login
                </Button>
            </Box>

            <Box sx={{pt: 2}}>
                <FacebookLogin
                    appId={FACEBOOK_APP_ID}
                    onSuccess={response => facebookLoginHandler(response.userID, response.accessToken)}
                    onFail={() => alert('Facebook Login failed')}
                />
            </Box>

            <Box component="form" noValidate onSubmit={onSubmitFormHandler} sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid size={{xs: 12}}>
                        <TextField
                            disabled={loginLoading}
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="family-name"
                            value={form.email}
                            onChange={onInputChange}
                            error={Boolean(error)}
                        />
                    </Grid>
                    <Grid size={{xs: 12}}>
                        <TextField
                            disabled={loginLoading}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={form.password}
                            onChange={onInputChange}
                            error={Boolean(error)}
                        />
                    </Grid>
                </Grid>
                <Button
                    disabled={loginLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign In
                </Button>
                <Grid container justifyContent="space-between">
                    <Grid sx={{mx: 'auto'}}>
                        <Link to='/register' variant="body2" component={RouterLink}>
                            Don't have an account, yet? Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Login;