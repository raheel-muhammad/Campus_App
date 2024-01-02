import React from 'react'
import AppliedJobsView from '../components/AppliedJobsView/AppliedJobsView'
import NavBar from '../components/Navbar/NavBar'
import Footer from '../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import './style.css'
const AppliedJobs = () => {

    const { approved, blocked, alljobs
    } = useSelector((state) => state.user);
    return (
        <div className='container' >
            <NavBar />
            <div className={alljobs.length < 1 ? 'mainNoData' : "main"}>
                {approved && !blocked ?
                    <AppliedJobsView />
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

export default AppliedJobs