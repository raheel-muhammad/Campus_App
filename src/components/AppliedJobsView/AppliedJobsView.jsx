import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Main from '../MainCards/Main'

const AppliedJobsView = () => {

    const UserDetails = useSelector((state) => state.user)
    return (
        <div>
            {UserDetails.AppliedJobs.length < 1 ?
                <>
                    <Box
                        sx={{ color: "#220D50", fontSize: { xs: "30px", sm: "50px", md: "70px" } }}
                        align="center"

                    > You have'nt applied for any job</Box>
                    {/* <img src="https://i.ibb.co/sm1xMwz/applied.png" alt="applied" border="0" /> */}
                    <Box component="img"
                        src="https://i.ibb.co/Q9cPT5M/applied.png"
                        alt="applied"
                        sx={{ width: { xs: "300px", sm: "400px" } }}
                    />
                </>
                :

                <Main
                    alljobs={UserDetails.AppliedJobs}
                    uid={UserDetails.uid}
                    DialogBox={false}
                    EditModal={false}
                    Title={"Applied Jobs"} />}
        </div>
    )
}

export default AppliedJobsView