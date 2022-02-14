import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface CustomLabeledCheckboxType{
  label : string,
  onChange : (IsChecked : boolean) => void
}

export function CustomLabeledCheckbox({ label, onChange } :CustomLabeledCheckboxType) {
  return (
    <FormControlLabel
      control={<Checkbox defaultChecked onChange={(e) => { onChange(e.target.checked); }} />}
      label={label}
    />
  );
}

export default CustomLabeledCheckbox;
