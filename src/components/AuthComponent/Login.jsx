import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import loginUser from "../../firebase/login";
import {
  loginFail,
  loginStart
} from "../../redux/action";
import SnackBar from "../Snackbar/SnakBar";
import './style.css'



const theme = createTheme();

export default function SignUp() {
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserDetails = useSelector((state) => state.user);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required("Email is mandatory")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid'),
    password: Yup.string().min(6, "Password must be at least 6 character long").max(10, "Password must be at most 10 character long").required("Password is mandatory")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema,

    onSubmit: async (values) => {
      dispatch(loginStart());
      try {
        await loginUser({
          email: values.email,
          password: values.password,
          dispatch,
          navigate
        });
      } catch (e) {
        dispatch(loginFail());
        setOpen(true);
        setError(e.message);
      }
    }
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };





  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >

          <SnackBar severity="error" openSnackBar={open} handleCloseAlert={handleClose}
            AlertMessage={error}

          />



          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} className='Button'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#532696"
                      }
                    }
                  }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                />

                {formik.errors.email && (
                  <p style={{ color: "red", marginLeft: "5px", display: "flex", marginBottom: "0px", marginTop: "0px" }}>
                    {formik.errors.email}
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#532696"
                      }
                    }
                  }}
                  InputLabelProps={{ style: { color: '#000000' } }}
                />
                {formik.errors.password ? (
                  <p style={{ color: "red", marginLeft: "5px", display: "flex", marginBottom: "0px", marginTop: "0px" }}>
                    {formik.errors.password}
                  </p>
                ) : null}

              </Grid>
            </Grid>
            <LoadingButton
              // loadingIndicator={< CircularProgress color="#fff" size={16} />}
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              loading={UserDetails.loading ? true : false}
              className='Button'

            >
              Log In
            </LoadingButton>

            <Grid className="Links">
              <Box component={Link}
                to={UserDetails.loading ? "#" : "/forgotpassword"}
                sx={{
                  color: "inherit", textDecoration: "underline",
                }}
              >
                {"Forget Passwrord?"}
              </Box>
              <Link
                to={UserDetails.loading ? "#" : "/signup"}
                style={{ color: "inherit", textDecoration: "underline", paddingLeft: "20px" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>

            </Grid>

          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
}
