import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
  props,
  ref,
// eslint-disable-next-line react/jsx-props-no-spreading
) => <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />);

interface ISnackbars {
  text: string;
  type: 'error' | 'success';
  isOpen: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void
}

export function Snackbars({ text, type, isOpen, handleClose } : ISnackbars) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {type === 'success'
        ? (
          <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
              {text}
            </Alert>
          </Snackbar>
        )
        : ''}
      {type === 'error'
        ? (
          <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>{text}</Alert>
          </Snackbar>
        )
        : ''}
    </Stack>
  );
}
