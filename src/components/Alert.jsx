import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { useSelector } from "react-redux";
export default function BasicAlerts() {
  const UserDetails = useSelector((state) => state.user);
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="filled" severity="error">
        {UserDetails.error}
      </Alert>
    </Stack>
  );
}
