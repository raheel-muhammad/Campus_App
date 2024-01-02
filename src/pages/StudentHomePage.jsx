import React from 'react'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/Navbar/NavBar'
import AvailableJobs from '../components/StudentHomepage/AvailableJobs'
import { useSelector } from "react-redux";
import { Typography } from '@mui/material';
const StudentHomePage = () => {


  const { approved, blocked, alljobs } = useSelector((state) => state.user);
  return (
    <div className='container'>

      <NavBar />
      <div className={alljobs.length < 1 ? 'mainNoData' : "main"}>
        {approved && !blocked ?
          <AvailableJobs />
          : <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            You are not authorizes. <br />Contact to admin team
          </Typography>
        }
      </div>
      <Footer />
    </div>
  )
}

export default StudentHomePage