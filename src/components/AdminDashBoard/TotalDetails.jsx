import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Title';
import { useSelector } from 'react-redux';

function preventDefault(event) {
  event.preventDefault();
}

export default function TotalDetails() {
  const { ApprovedStudentsArray, ApprovedCompaniesArray, NewApprovalCompaniesArray, NewApprovalStudentsArray } = useSelector((state) => state.user);
  return (
    <React.Fragment>
      <Title>Total Details</Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Pending Approvals of Students:
      </Typography>
      <Typography component="p" variant="h4" sx={{ flex: 1 }}>
        {NewApprovalStudentsArray.filter(Boolean).length}
      </Typography>


      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Pending Approvals of Companies:
      </Typography>
      <Typography component="p" variant="h4" sx={{ flex: 1 }}>
        {NewApprovalCompaniesArray.filter(Boolean).length}
      </Typography>



      <Typography color="text.secondary" sx={{ flex: 1 }} >
        Registered Companies:
      </Typography>
      <Typography component="p" variant="h4" sx={{ flex: 1 }}>
        {ApprovedCompaniesArray.filter(Boolean).length}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Registered Students:
      </Typography>
      <Typography component="p" variant="h4" sx={{ flex: 1 }}>
        {ApprovedStudentsArray.filter(Boolean).length}
      </Typography>

    </React.Fragment>
  );
}