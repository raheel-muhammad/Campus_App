import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';







function Copyright(props) {
    const { role } = useSelector((state) => state.user);
    return (
        <Typography
            variant='body2'
            color='text.secondary'
            align='center'
            {...props}
        >
            {"Copyright © "}
            <Link to={role === 'student' ? '/student' : '/company'} style={{ color: "inherit", textDecoration: "underline" }}>
                Recruiters
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Copyright />
        </Box>
    )
}

export default Footer