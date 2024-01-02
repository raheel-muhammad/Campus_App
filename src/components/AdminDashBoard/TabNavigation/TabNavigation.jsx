import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Title from '../../Title';
import { useSelector } from 'react-redux';
// import PanelTab from './PanelTab'
import PanelTabU from './PanelTabU';



export default function TabNavigation() {
    const { NewApprovalStudentsArray, NewApprovalCompaniesArray } = useSelector((state) => state.user);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1', height: "100%", display: "flex", flexDirection: "column", justifyContent: "stretch" }}>
            <TabContext value={value}>
                <Title >New Approval Request</Title>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" textIndicator={"#491D84"}>
                        <Tab label="Students" value="1" />
                        <Tab label="Companies" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1" style={{ padding: "0px" }}>
                    <PanelTabU TableHead1={"ID"} TableHead2={"Email"} Data={NewApprovalStudentsArray} ListDilogTitle={"All Approval Requests"} />
                </TabPanel>
                <TabPanel value="2" style={{ padding: "0px", height: "100%" }}>
                    <PanelTabU TableHead1={"Company"} TableHead2={"Email"} Data={NewApprovalCompaniesArray} ListDilogTitle={"All Approval Requests"} />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
