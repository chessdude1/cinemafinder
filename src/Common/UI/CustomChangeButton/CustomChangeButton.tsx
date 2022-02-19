import React from 'react';
import Button from '@mui/material/Button';
import './CustomChangeButtonStyles.scss';

interface IButtonType {
  type: 'button' | 'reset' | 'submit' | undefined,
  disabled?: boolean,
  children: React.ReactNode;
  variant: 'outlined';
  onClick?: ()=> void
}

export function CustomChangeButton({
  type, disabled, children, variant, onClick,
}: IButtonType) {
  return (
    <Button
      className='custom-change-button'
      onClick={onClick}
      type={type}
      variant={variant}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
