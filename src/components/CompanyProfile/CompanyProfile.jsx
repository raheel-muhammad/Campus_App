import { AccountCircle } from "@material-ui/icons";
import CallIcon from "@mui/icons-material/Call";
import CategoryIcon from '@mui/icons-material/Category';
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from '@mui/icons-material/Language';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
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
import "../StudentProfile/StudentProfile.css";
import Title from "../Title";

export default function StudentProfile() {
  const [disable, setDisable] = useState(true);
  const [ImgLoader, setImgLoader] = useState(false);
  const UserDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setDisable(false);
    formik.handleChange(e);
  };
  const handleReset = () => {
    setDisable(true);
    formik.handleReset();
  };

  const handleUploadImage = async (e) => {
    setImgLoader(true);
    await uploadImage({ e: e, dispatch: dispatch, ImgName: UserDetails.uid, role: UserDetails.role });
    setImgLoader(false);
  };
  const validationSchema = Yup.object({
    fullname: Yup.string(),
    website: Yup.string(),
    address: Yup.string(),
    contact: Yup.number(),
    service: Yup.string()
  });
  const Input = styled("input")({
    display: "none"
  });

  const formik = useFormik({
    initialValues: {
      fullname: UserDetails.fullname || "",
      website: UserDetails.website || "",
      address: UserDetails.address || "",
      contact: UserDetails.contact || "",
      service: UserDetails.service || ""
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(ProfileUpdateInit());
      setDisable(true);
      try {
        await ProfileUpdate({
          uid: UserDetails.uid,
          dispatch: dispatch,
          fullname: values.fullname,
          website: values.website,
          address: values.address,
          contact: values.contact,
          service: values.service,
          role: UserDetails.role,
        });
        dispatch(ProfileUpdateSuccess(values));
      } catch (e) {
        console.log(e);
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
            height: "128vh"
          }
        }}
      >
        <Paper
          elevation={3}
          component='form'
          onSubmit={formik.handleSubmit}
        >
          <div className='profileHead'>
            <div className='head'>
              <div>
                <label htmlFor='icon-button-file' className='uploadBtn'>
                  <Input
                    accept='image/*'
                    onChange={handleUploadImage}
                    id='icon-button-file'
                    type='file'
                  />
                  <IconButton aria-label='upload picture' component='span'>
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
            <div className='profile'>
              <Title>Company Info</Title>
              <Textfield
                editIcon={true}
                id='input-with-icon-textfield'
                label='Company Name'
                name='fullname'
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
                label='Website'
                fullWidth={true}
                name='website'
                onChange={handleChange}
                value={formik.values.website}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LanguageIcon />
                    </InputAdornment>
                  )
                }}
                variant='standard'
                style={{ marginBottom: "10px" }}
              />
              <br />
              <Title>Contact Info</Title>
              <TextField
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
                label='Location'
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
              <Title>Service Info</Title>
              <div style={{ width: "100 %" }}>
                <DropDown
                  sx={{ m: 1, width: 475 }}
                  variant='standard'
                  label='Service'
                  name='service'
                  onChange={handleChange}
                  id='service'
                  value={formik.values.service}
                  arrayCategoray={["Cloud Solutions Provider (CSP)", "Software As A Service (SaaS)", "Monitoring & Hourly IT Services Provider", "Managed Service Provider (MSP)"]}
                  fullWidth={true}
                  Icon={<CategoryIcon />}
                />
              </div>
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
