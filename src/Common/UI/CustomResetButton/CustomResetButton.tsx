import React from 'react';
import Button from '@mui/material/Button';
import './CustomResetButtonStyles.scss';

interface IResetButtonType {
  type: 'button' | 'reset' | 'submit' | undefined;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined;
  disabled?: boolean;
  content: string;
  variant?: 'outlined' | 'contained' | 'text';
  onClick?: () => void;
}

export function CustomResetButton({ type, color, disabled, content, variant, onClick }: IResetButtonType) {
  return (
    <Button sx={{ textTransform: 'none' }} className='custom-reset-button' onClick={onClick} type={type} variant={variant} color={color} disabled={disabled}>
      {content}
    </Button>
  );
}
