import React from 'react';

import Button from '@mui/material/Button';

interface IButtonType {
  type: 'button' | 'reset' | 'submit' | undefined,
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined,
  variant: 'text' | 'contained' | 'outlined',
  disabled: boolean,
  children: React.ReactNode;
}

export function CustomButton({
  type, color, variant, disabled, children,
}: IButtonType) {
  return (
    <Button
      type={type}
      color={color}
      variant={variant}
      disabled={disabled}
    >
      {children}

    </Button>
  );
}
