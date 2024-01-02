import React from 'react'
import NavBar from '../components/Navbar/NavBar'
import Footer from '../components/Footer/Footer'
import PostedJobs from '../components/PostedJobs/PostedJobs'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import './style.css'
const CompanyHomePage = () => {
  const { approved, blocked, alljobs
  } = useSelector((state) => state.user);
  return (
    <div className='container'>
      <NavBar />
      <div className={alljobs.length < 1 ? 'mainNoData' : "main"}>
        {approved && !blocked ?
          <PostedJobs />
          : <Typography
            component="h1"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            You are not authorizes. Contact to admin team
          </Typography>
        }

      </div>
      <Footer />
    </div>
  )
}

export default CompanyHomePage