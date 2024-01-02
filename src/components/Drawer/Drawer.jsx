import FactCheckIcon from '@mui/icons-material/FactCheck';
import LinkIcon from '@mui/icons-material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import WorkIcon from '@mui/icons-material/Work';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import HomeIcon from '@mui/icons-material/Home';
import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import "../Navbar/NavBar.css"
export default function Drawer() {

    const CompanyDrawerTabs = [
        {
            name: "Home",
            pathname: "/company"
        },
        {
            name: "Post Now Job",
            pathname: "/postnewjobs"
        }
    ]

    const StudentDrawerTabs = [
        {
            name: 'Home',
            pathname: '/student'
        },
        {
            name: 'View Applied Jobs',
            pathname: '/appliedjobs'
        }]

    const mystyle = {
        backgroundColor: "#220D50", color: "#fff"
    }
    const iconStyle = {
        color: "#fff"
    }

    const location = useLocation();
    // console.log("==>", location.pathname)
    const { role } = useSelector((state) => state.user);
    const [state, setState] = useState({
        bottom: false,
    });

    const toggleDrawer = (anchor, open,) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'left' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {role === 'company' ? <List>
                {CompanyDrawerTabs.map((item, index) => (
                    <Link to={item.name === 'Home' ? "/company" : "/postnewjobs"} style={{ textDecoration: "none", color: "inherit" }}>
                        <ListItem text={item.name} disablePadding>
                            <ListItemButton style={location.pathname === item.pathname ? mystyle : null}>
                                <ListItemIcon >
                                    {index % 2 === 0 ?
                                        <WorkHistoryIcon style={location.pathname === item.pathname ? iconStyle : null} />
                                        :
                                        <WorkIcon style={location.pathname === item.pathname ? iconStyle : null} />}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />

                    </Link>
                ))}
            </List>
                :
                <List>
                    {StudentDrawerTabs.map((item, index) => (
                        <Link to={item.name === 'View Applied Jobs' ? "/appliedjobs" : "/student"} style={{ textDecoration: "none", color: "inherit" }}>
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton style={location.pathname === item.pathname ? mystyle : null}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ?
                                            <HomeIcon style={location.pathname === item.pathname ? iconStyle : null} />
                                            :
                                            <FactCheckIcon style={location.pathname === item.pathname ? iconStyle : null} />}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </Link>
                    ))}
                </List>}
        </Box >
    );

    return (
        <div>

            <React.Fragment key={'left'}>
                <Button onClick={toggleDrawer('left', true)} ><  MenuIcon className='DrawerIcon' /></Button>
                <SwipeableDrawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
