import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Slider from '@mui/material/Slider';
import './CustomSelectRangeStyles.scss';

interface TCustomSelect {
  placeholder : string;
  defaultValue: number,
  step: number
  min: number;
  max: number;
  value: number;
  onChange: (value: number | Array<number>) => void;
  isDisabled?: boolean; // use if you want disable button force for example using reset button
}

export function CustomSelectRange({ placeholder, defaultValue, step, min, max, value, onChange, isDisabled = false } : TCustomSelect) {
  const [valueSliderControlIsSliderChoose, setValueSliderControlIsSliderChoose] = useState<number | Array<number> | null>(null);
  const isChoose = valueSliderControlIsSliderChoose !== null && !isDisabled;

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          input={<OutlinedInput className='custom-select' color={isChoose ? 'primary' : 'secondary'} />}
          multiple
          value={[placeholder]}
          renderValue={(selected) => selected.join(', ')}
        >
          <MenuItem>
            <Slider
              sx={{ marginTop: '20px' }}
              defaultValue={defaultValue}
              step={step}
              marks
              value={value}
              min={min}
              max={max}
              onChange={(e, valueSlider) => {
                setValueSliderControlIsSliderChoose(valueSlider);
                onChange(valueSlider);
              }}
              valueLabelDisplay='auto'
            />
          </MenuItem>

        </Select>
      </FormControl>
    </div>
  );
}
