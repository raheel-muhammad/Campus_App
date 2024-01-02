import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
// import NewApprovals from './NewApprovals';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Approvals } from '../../firebase/NewApproval';
// import TableData from './Table/Table';
import TabNavigation from './TabNavigation/TabNavigation';
import TotalDetails from './TotalDetails';
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import TableU from './Table/TableU';


const mdTheme = createTheme();

function DashboardContent() {
  const { ApprovedCompaniesArray, ApprovedStudentsArray, alljobs, AppliedJobs, uid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {

    if (uid) {
      const starCountRefPost = ref(database, 'company/');
      onValue(starCountRefPost, (snapshot) => {
        Approvals(dispatch)
      })
    }




  }, [])

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 535,
              }}
            >
              <TotalDetails />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 535,
              }}
            >
              <TabNavigation />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {/* <CompanyData /> */}
              <TableU
                Title={"Registered Companies"}
                TableCellHead1={"Company Name"}
                TableCellHead2={"Email"}
                Data={ApprovedCompaniesArray}
                TableCellLinkText={"See Posted Jobs"}
                ListDilogTitle={"All Registered Companies"}
                ListButtonText1={"See Posted Jobs"}
                ListDilogTitle1={"All Posted Jobs"}
                alljobs={alljobs}
                ListDialogCloseButton1={"Close"}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <TableU
                Title={"Registered Students"}
                TableCellHead1={"Student ID"}
                TableCellHead2={"Email"}
                Data={ApprovedStudentsArray}
                TableCellLinkText={"See Applied Jobs"}
                ListDilogTitle={"All Registered Students"}
                ListButtonText1={"See Applied Jobs"}
                ListDilogTitle1={"All Applied Jobs"}
                alljobs={AppliedJobs}
                ListDialogCloseButton1={"Close"}

              />
            </Paper>
          </Grid>
        </Grid>

      </Container>
    </ThemeProvider>
  );
}

export default function AdminDashBoard() {
  return <DashboardContent />;
}