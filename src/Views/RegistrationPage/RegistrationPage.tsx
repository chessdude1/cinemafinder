import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

export function RegistrationPage() {
  return (
    <Container maxWidth='md'>
      <h2>Create free account</h2>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > :not(style)': { m: 1, width: '60%' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField id='outlined-basic' label='Name' variant='filled' />
        <TextField id='filled-basic' label='Email' variant='filled' />
        <TextField id='standard-basic' label='Password' variant='filled' />
      </Box>
    </Container>
  );
}
