import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './CustomButtonStyles.scss';
import filter from '../../../Assets/img/Button/filter.png';

interface IButtonType {
  type: 'button' | 'reset' | 'submit' | undefined,
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined,
  disabled: boolean,
  children: React.ReactNode;
  variant?: 'outlined' | 'contained' | 'text'
}

export function CustomButton({
  type, color, disabled, children, variant = 'contained',
}: IButtonType) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  return (
    <Button
      sx={{ textTransform: 'none' }}
      className='custom-button'
      onClick={() => { setIsButtonClicked(!isButtonClicked); }}
      type={type}
      variant={variant}
      color={color}
      disabled={disabled}
    >
      {children}
      {variant === 'outlined' ? <img className='filter' alt='filter' src={filter} /> : '' }
    </Button>
  );
}
