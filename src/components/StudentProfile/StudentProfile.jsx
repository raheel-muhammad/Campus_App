import { AccountCircle } from "@material-ui/icons";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import NumbersIcon from "@mui/icons-material/Numbers";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SchoolIcon from "@mui/icons-material/School";
import { LoadingButton } from "@mui/lab";
import { Avatar, InputAdornment, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ProfileUpdate } from "../../firebase/ProfileUpdate";
import uploadImage from "../../firebase/uploadImg";
import {
  ProfileUpdateFail,
  ProfileUpdateInit,
  ProfileUpdateSuccess
} from "../../redux/action";
import DropDown from "../DropDown/DropDown";
import Textfield from "../Inputfeild/Textfield";
import Title from "../Title";
import CategoryIcon from '@mui/icons-material/Category';




export default function StudentProfile() {
  // const [UploadBtn, setUploadBtn] = useState(false)
  const [disable, setDisable] = useState(true);
  const [ImgLoader, setImgLoader] = useState(false);
  const UserDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setDisable(false);
    formik.handleChange(e);
  };

  const handleReset = () => {
    formik.handleReset();
    setDisable(true);

  };

  const handleUploadImage = async (e) => {
    setImgLoader(true)
    await uploadImage({ e: e, dispatch: dispatch, ImgName: UserDetails.uid, role: UserDetails.role });
    setImgLoader(false)
    // setUploadBtn(false)
  };

  const validationSchema = Yup.object({
    fullname: Yup.string(),
    fathername: Yup.string(),
    cnic: Yup.number(),
    address: Yup.string(),
    contact: Yup.number(),
    qualification: Yup.string(),
    category: Yup.string()
  });
  const Input = styled("input")({
    display: "none"
  });

  const formik = useFormik({
    initialValues: {
      fullname: UserDetails.fullname || "",
      fathername: UserDetails.fathername || "",
      cnic: UserDetails.cnic || "",
      address: UserDetails.address || "",
      contact: UserDetails.contact || "",
      qualification: UserDetails.qualification || "",
      category: UserDetails.category || ""
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(ProfileUpdateInit());
      setDisable(true);
      try {
        await ProfileUpdate({
          uid: UserDetails.uid,
          dispatch: dispatch,
          fullname: values.fullname,
          fathername: values.fathername,
          cnic: values.cnic,
          address: values.address,
          contact: values.contact,
          qualification: values.qualification,
          role: UserDetails.role,
          category: values.category
        });
        dispatch(ProfileUpdateSuccess(values));
      } catch (e) {

        dispatch(ProfileUpdateFail());
      }
    }
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          "& > :not(style)": {
            m: 1,
            width: "128vh",
            height: "100vh"
          }
        }}
        component='form'
      >
        <Paper
          elevation={3}
          component='form'
          onSubmit={formik.handleSubmit}
        >
          <div className='profileHead'>
            <div className='head'>
              <div>
                <label htmlFor='icon-button-file' className='uploadBtn' >
                  <Input
                    accept='image/*'
                    onChange={handleUploadImage}
                    id='icon-button-file'
                    type='file'
                    disabled={ImgLoader}
                  />
                  <IconButton aria-label='upload picture' component='span'   >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
              <Avatar
                alt={UserDetails.fullname}

                src={ImgLoader ? 'https://cdn.dribbble.com/users/3432202/screenshots/7090834/media/b27b345dc25d5ae622b249f604d0dfb0.gif' : UserDetails.profilePicture}
                className='Avatar'
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignCcontent: "center",
              justifyContent: "center"
            }}
          >
            <div className='profile' type='form'>
              <Title>Personal Info</Title>
              <Textfield
                editIcon={true}
                id='input-with-icon-textfield'
                label='Full Name'
                name='fullname'
                inputProps={{
                  maxLength: 20
                }}

                fullWidth
                onChange={handleChange}
                value={formik.values.fullname}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
                variant='standard'
                style={{ marginBottom: "10px" }}
              />

              <Textfield
                editIcon={true}
                id='input-with-icon-textfield'
                label='Father Name'
                fullWidth={true}
                name='fathername'
                onChange={handleChange}
                value={formik.values.fathername || ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
                variant='standard'
                style={{ marginBottom: "10px" }}
              />
              <Textfield
                editIcon={true}
                variant='standard'
                id='standard-basic'
                label='CNIC No'
                type='tel'
                fullWidth={true}
                name='cnic'
                onChange={handleChange}
                value={formik.values.cnic}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <NumbersIcon />
                    </InputAdornment>
                  )
                }}
                inputProps={{
                  minLength: 13,
                  maxLength: 13
                }}
                autoComplete='off'
                style={{ marginBottom: "10px" }}
              />
              <br />
              <Title>Contact Info</Title>
              <TextField
                editIcon={true}
                id='input-with-icon-textfield'
                label='Email'
                fullWidth
                disabled={true}
                multiline
                rowsMax={4}
                type='email'
                value={UserDetails.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                  disableUnderline: true
                }}
                variant='standard'
                style={{ marginBottom: "10px" }}
              />
              <Textfield
                editIcon={true}
                id='input-with-icon-textfield'
                label='Permenant Address'
                fullWidth={true}
                name='address'
                onChange={handleChange}
                value={formik.values.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HomeIcon />
                    </InputAdornment>
                  )
                }}
                variant='standard'
                style={{ marginBottom: "10px" }}
              />
              <Textfield
                editIcon={true}
                variant='standard'
                id='input-with-icon-textfield'
                label='Contact No'
                type='tel'
                fullWidth={true}
                name='contact'
                onChange={handleChange}
                value={formik.values.contact}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                inputProps={{ minLength: 11, maxLength: 11 }}
                autoComplete='off'
                style={{ marginBottom: "10px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <CallIcon />
                    </InputAdornment>
                  )
                }}
              />
              <br />
              <Title>Academic Info</Title>
              <Textfield
                editIcon={true}
                id='input-with-icon-textfield'
                label='Highest Qualification'
                name='qualification'
                fullWidth={true}
                onChange={handleChange}
                value={formik.values.qualification}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SchoolIcon />
                    </InputAdornment>
                  )
                }}
                variant='standard'
                style={{ marginBottom: "10px" }}
              />
              <DropDown
                sx={{ mt: 1, width: 500 }}
                variant='standard'
                label='Category'
                name='category'
                onChange={handleChange}
                id='category'
                value={formik.values.category}
                arrayCategoray={["Fresher", "Mid-Level", "Senior"]}
                fullWidth={true}
                Icon={<CategoryIcon />}
              />
            </div>
          </div>
          <div className='bottom-btns'>
            <div className='apply-btn'>
              <LoadingButton
                type='submit'
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={disable}
                loading={UserDetails.loading ? true : false}
              >
                Apply Changes
              </LoadingButton>
            </div>
            <div className='reset-btn'>
              <LoadingButton
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={disable}
                loading={UserDetails.loading ? true : false}
                onClick={handleReset}
              >
                Reset
              </LoadingButton>
            </div>
          </div>
        </Paper>
      </Box>
    </>
  );
}




