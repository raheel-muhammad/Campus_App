import { Typography } from '@material-ui/core';
import { createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useSelector } from "react-redux";
import Main from '../MainCards/Main';

const theme = createTheme();

const AvailabeJobs = () => {
    const UserDetails = useSelector((state) => state.user);
    return (
        <div>
            {UserDetails.alljobs.length < 1 ?
                <>
                    <Box
                        // component="h1"
                        // variant="h2"
                        align="center"
                        // gutterBottom
                        // style={{  }}
                        sx={{ color: "#220D50", fontSize: { xs: "30px", sm: "50px", md: "70px" } }}

                    > Sorry! No jobs are available</Box>
                    <div>

                        <Box component="img" src="https://i.ibb.co/9ZPtSwN/images-removebg-preview.png"
                            alt="No data available"
                            sx={{ width: { xs: "300px", sm: "400px" } }}
                        />
                    </div>
                </>
                : <Main
                    Title={"Available Jobs"}
                    alljobs={UserDetails.alljobs}
                    DialogBoxButtonText={"Apply"}
                    DialogBoxTitle={"Do you want to apply?"}
                    DialogBoxText={"Note:Before apply on any job make sure you have completely fill your profile"}
                    DialogAgreeButtonText={"Yes"}
                    DialogCancelButtonText={"No"}
                    uid={UserDetails.uid}
                    DialogBox={true}
                    EditModal={false}
                />}
        </div>

    )
}

export default AvailabeJobs