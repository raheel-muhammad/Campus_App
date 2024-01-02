import React from 'react'
import Footer from '../components/Footer/Footer';
import NavBar from '../components/Navbar/NavBar'
import ResetPassword from "../components/AuthComponent/ResetPassword";
import Box from '@mui/material/Box';
const ForgotPassword = () => {
  return (
    <div className='container'>
      <NavBar />
      {/* <div className='mainAuth'> */}
      <Box sx={{
        flexGrow: 1
      }}>
        <ResetPassword />
      </Box>
      {/* </div> */}
      <Footer />
    </div>
  )
}

export default ForgotPassword