import React from 'react';
import Slider from '@mui/material/Slider';

interface CustomSliderType {
  value: number | Array<number>; // if Slider get 1 number it has 1 thumbnail [1, 2] => 2 thumbnails
  step: number;
  min: number;
  max: number;
  title: string;
  onChange: (value: number | Array<number>) => void;
}

export function CustomSlider({
  step,
  min,
  max,
  title,
  onChange,
  value,
}: CustomSliderType) {
  return (
    <>
      <h2>{title}</h2>
      <Slider
        step={step}
        marks
        min={min}
        max={max}
        onChange={(e, valueSlider) => {
          onChange(valueSlider);
        }}
        value={value}
        valueLabelDisplay='auto'
        disableSwap
      />
    </>
  );
}
