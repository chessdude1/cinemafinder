import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';

interface CustomRadioInputType {
  checkedValue: string;
  options: string[];
  onChange: (Ischecked: string) => void;
}

export function CustomRadioInput({ checkedValue, options, onChange }: CustomRadioInputType) {
  return (
    <FormControl>
      <RadioGroup aria-labelledby='demo-controlled-radio-buttons-group' name='controlled-radio-buttons-group' value={checkedValue} onChange={(e, value) => onChange(value)}>
        {options.map((value) => (
          <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomRadioInput;
