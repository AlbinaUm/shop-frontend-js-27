import {useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Button, TextField} from "@mui/material";
import {RegisterMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectRegisterError, selectRegisterLoading} from "./usersSlice.ts";
import {register} from "./usersThunks.ts";
import {toast} from "react-toastify";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const registerLoading = useAppSelector(selectRegisterLoading);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{email?: string}>({});
    const [form, setForm] = useState<RegisterMutation>({
        email: '',
        password: '',
        confirmPassword: '',
    });


    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;

      if (name === 'email') {
          if (!emailRegex.test(value)) {
              setErrors(prevState => ({
                  ...prevState,
                  email: 'Invalid email format',
              }));
          } else {
              setErrors(prevState => ({
                  ...prevState,
                  email: '',
              }));
          }
      }

      setForm({ ...form, [name]: value });
    };

    const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
        try {
            await dispatch(register(form)).unwrap();
            navigate("/");
            toast.success("Registration successful");
        } catch(error) {

        }
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmitFormHandler} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid  size={{xs: 12}}>
                        <TextField
                            disabled={registerLoading}
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="family-name"
                            value={form.email}
                            onChange={onInputChange}
                            helperText={getFieldError('email') || errors.email ? errors.email : ''}
                            error={Boolean(getFieldError('email')) || Boolean(errors.email)}
                        />
                    </Grid>
                    <Grid size={{xs: 12}}>
                        <TextField
                            disabled={registerLoading}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={form.password}
                            onChange={onInputChange}
                            helperText={getFieldError('password')}
                            error={Boolean(getFieldError('password'))}
                        />
                    </Grid>

                    <Grid size={{xs: 12}}>
                        <TextField
                            disabled={registerLoading}
                            fullWidth
                            name="confirmPassword"
                            label="Confirm password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={form.confirmPassword}
                            onChange={onInputChange}
                            helperText={getFieldError('confirmPassword')}
                            error={Boolean(getFieldError('confirmPassword'))}
                        />
                    </Grid>
                </Grid>
                <Button
                    disabled={registerLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="space-between">
                    <Grid sx={{mx: 'auto'}}>
                        <Link to='/login' variant="body2" component={RouterLink}>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Register;