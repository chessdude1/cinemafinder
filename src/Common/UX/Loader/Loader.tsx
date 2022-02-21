import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50vh' }}>
      <CircularProgress />
    </Box>
  );
}
