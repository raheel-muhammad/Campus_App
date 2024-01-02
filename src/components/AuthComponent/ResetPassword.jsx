import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import React from "react";

import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  passordResetFail,
  passwordResetInitiaite,
  passwordResetSuccess
} from "../../redux/action";
import './style.css'
import SnackBar from "../Snackbar/SnakBar";

const auth = getAuth();

const theme = createTheme();
const ResetPassword = () => {
  const [openSnackBar, setopenSnackBar] = useState(false)
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserDetails = useSelector((state) => state.user);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required("Email is required")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      dispatch(passwordResetInitiaite());
      try {
        await sendPasswordResetEmail(auth, values.email);
        dispatch(passwordResetSuccess());
        setOpen(true);
      } catch (e) {
        dispatch(passordResetFail());
        setopenSnackBar(true)
        setError(e.message);
      }
    },
  });
  const handleClose = () => {
    setOpen(false);
    setReset(true);
  };
  const handleCloseSnackBar = () => {
    setopenSnackBar(false);
    setError("")
  }
  useEffect(() => {
    if (reset) {
      navigate("/");
    }
  }, [reset, navigate]);

  return (

    <ThemeProvider theme={theme}>
      <Container component="main" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "448px",
            px: "26px",
            mx: "auto"
          }}
        >
          <SnackBar severity="error" openSnackBar={openSnackBar} handleCloseAlert={handleCloseSnackBar}
            AlertMessage={error}

          />
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} className='Button'>
            <RotateLeftOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password..?
          </Typography>
          <p>Enter your registered email address in order to get reset link.</p>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%"
            }}
          >
            <TextField
              required
              fullWidth
              // id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    borderColor: "#532696"
                  }
                },
              }}
              InputLabelProps={{ style: { color: '#000000' } }}
            />
            {formik.errors.email && (
              <p style={{ color: "red", marginLeft: "5px", display: "flex", marginBottom: "0px", marginTop: "0px" }}>
                {formik.errors.email}
              </p>
            )}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3, mb: 2,
              }}
              loading={UserDetails.loading ? true : false}
              className='Button'
            >
              Send Email
            </LoadingButton>
            <Grid container justifyContent='flex-end'>
              <Grid style={{ justifyContent: 'space-between' }} item>
                <Link to={UserDetails.loading ? "#" : "/"}
                  style={{ color: "inherit", textDecoration: "underline" }}
                >
                  {"Go back to login page?"}
                </Link>

              </Grid>
            </Grid>

          </Box>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle
              style={{ cursor: "move" }}
              id="draggable-dialog-title"
            >
              Link Sent Successfully
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Password Reset Link has been sent to your Email.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className='Button'>Done</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </ThemeProvider>

  );
};

export default ResetPassword;
