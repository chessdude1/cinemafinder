import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import './CustomLabaledCheckBoxStyles.scss';

interface CustomLabeledCheckboxType {
  label: string;
  onChange: (IsChecked: boolean) => void;
  isDefaultChecked?: boolean;
  isChecked?: boolean;
}

export function CustomLabeledCheckbox({ label, onChange, isDefaultChecked = true, isChecked = true }: CustomLabeledCheckboxType) {
  return (
    <FormControlLabel
      sx={{ fontSize: '1.2rem' }}
      control={(
        <Checkbox
          defaultChecked={isDefaultChecked}
          onChange={(e) => {
            onChange(e.target.checked);
          }}
        />
      )}
      label={label}
    />
  );
}

export default CustomLabeledCheckbox;
