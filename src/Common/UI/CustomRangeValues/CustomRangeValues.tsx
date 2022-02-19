import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import './CustomRangeValuesStyles.scss';

interface ICustomRangeValues {
  step: number;
  min: number;
  max: number;
  curValue: number | Array<number>;
  onChange: (value: number | Array<number>) => void;
  isDisabled?: boolean;
  bottomRange: number;
  topRange: number;
}

export function CustomRangeValues({ step, min, max, curValue, onChange, bottomRange, topRange, isDisabled = false }: ICustomRangeValues) {
  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <div className='custom__range-value-filter'>
        <span className='range-value'>{bottomRange}</span>
        <Slider marks step={step} min={min} max={max} value={curValue} onChange={(e, value: number | number[]) => onChange(value)} valueLabelDisplay='auto' disableSwap />
        <span className='range-value'>{topRange}</span>
      </div>
    </FormControl>
  );
}
