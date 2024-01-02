import { Box } from '@material-ui/core';
import { Typography } from '@mui/material';
import * as React from 'react';
import { useSelector } from "react-redux";
import Main from '../MainCards/Main';


const PostedJobs = () => {



    const UserDetails = useSelector((state) => state.user)

    return (
        <div>
            {UserDetails.alljobs.length < 1 ?
                <>
                    <Box
                        sx={{ color: "#220D50", fontSize: { xs: "30px", sm: "50px", md: "70px" } }}


                    > You have'nt posted any job</Box>
                    {/* <img src="https://i.ibb.co/sm1xMwz/applied.png" alt="applied" border="0" /> */}
                    <Box component="img" src="https://i.ibb.co/9ZPtSwN/images-removebg-preview.png" alt="No data available"
                        sx={{ width: { xs: "300px", sm: "400px" } }}
                    />
                </>
                :
                <Main
                    alljobs={UserDetails.alljobs}
                    uid={UserDetails.uid}
                    DialogBox={false}
                    EditModal={true}
                    Title={"Posted Jobs"}
                />

            }   </div>)
}

export default PostedJobs