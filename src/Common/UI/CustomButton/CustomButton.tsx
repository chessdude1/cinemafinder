import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './CustomButtonStyles.scss';

interface IButtonType {
  type: 'button' | 'reset' | 'submit' | undefined,
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined,
  disabled: boolean,
  children: React.ReactNode;

}

export function CustomButton({
  type, color, disabled, children,
}: IButtonType) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  return (
    <Button
      sx={{ textTransform: 'none' }}
      className='custom-button'
      onClick={() => { setIsButtonClicked(!isButtonClicked); }}
      type={type}
      variant={isButtonClicked ? 'outlined' : 'text'}
      color={color}
      disabled={disabled}
    >
      {children}

    </Button>
  );
}
