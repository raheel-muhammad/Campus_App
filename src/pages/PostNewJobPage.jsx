import { Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer/Footer'
import NavBar from '../components/Navbar/NavBar'
import PostNewJob from '../components/PostNewJob/PostNewJob'

const PostNewJobPage = () => {
    const { approved, blocked } = useSelector((state) => state.user);

    return (

        <div>
            <NavBar />
            {approved && !blocked ?
                <PostNewJob /> : <Typography
                    component="h1"
                    variant="h3"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    You are not authorizes. Contact to admin team
                </Typography>
            }


            <Footer />
        </div>
    )
}

export default PostNewJobPage