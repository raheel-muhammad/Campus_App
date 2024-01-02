import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signUp } from "../../firebase/signup";
import { registerFail, registerStart } from "../../redux/action";
import SnackBar from "../Snackbar/SnakBar";
import './style.css'

const theme = createTheme();

export default function SignUp() {
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserDetails = useSelector((state) => state.user);
  const [role, setRoll] = useState(null);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email is invalid'),
    password: Yup.string().min(6, "Password must be at least 6 character long").max(10, "Password must be at most 10 character long").required("Password is mandatory").required(),
    role: Yup.string().required("Role is mandatory"),
    userName: Yup.string().required("Input Must be valid").matches(/^[a-zA-Z0-9\s]+(?:[-:%/\\()\u2122.+][a-zA-Z0-9\s]+)*$/, "Not a valid entry").trim(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userName: "",
      role: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      dispatch(registerStart());
      try {
        await signUp({
          email: values.email,
          password: values.password,
          role: values.role,
          userName: values.userName,
          dispatch
        });
        // alert("SignUp Successfully");
        values.role === 'student' ? navigate('/student') : navigate('/company')
      } catch (e) {
        dispatch(registerFail());
        setOpen(true);
        setError(e.message);
      }
    },
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SnackBar severity="error" openSnackBar={open} handleCloseAlert={handleClose}
            AlertMessage={error}

          />
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} className='Button'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Student/Company Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
                {formik.errors.password && (
                  <p style={{ color: "red", marginLeft: "5px", display: "flex", marginBottom: "0px", marginTop: "0px" }}>
                    {formik.errors.password}
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="role"
                    value={formik.values.inCompliance}
                    onChange={(e) => {
                      setRoll(e.target.value);
                    }}

                  >
                    <FormControlLabel
                      onChange={formik.handleChange}
                      value="student"
                      control={<Radio style={{ color: "#532696" }} />}
                      label="Student"

                    />
                    <FormControlLabel
                      onChange={formik.handleChange}
                      value="company"
                      control={<Radio style={{ color: "#532696" }} />}
                      label="company"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {(() => {
                  if (role === "student") {
                    return (
                      <>
                        <TextField
                          required
                          fullWidth
                          id="studentID"
                          label="Student ID"
                          name="userName"
                          autoFocus
                          onChange={formik.handleChange}
                          value={formik.values.userName}
                          sx={{
                            "& .MuiOutlinedInput-root.Mui-focused": {
                              "& > fieldset": {
                                borderColor: "#532696"
                              }
                            }
                          }}
                          InputLabelProps={{ style: { color: '#000000' } }}
                        />
                      </>
                    );
                  } else if (role === "company") {
                    return (
                      <TextField
                        required
                        fullWidth
                        id="companyName"
                        label="Comapany Name"
                        name="userName"
                        autoComplete="given-name + family-name"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                        sx={{
                          "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                              borderColor: "#532696"
                            }
                          }
                        }}
                        InputLabelProps={{ style: { color: '#000000' } }}
                      />
                    );
                  } else {
                    return <></>;
                  }
                })()}
                {formik.errors.userName && (
                  <p style={{ color: "red", marginLeft: "5px", display: "flex", marginBottom: "0px", marginTop: "0px" }}>
                    {formik.errors.userName}
                  </p>
                )}
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={UserDetails.loading ? true : false}
              className='Button'
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to={"/login"}
                  style={{ color: "inherit", textDecoration: "underline" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
