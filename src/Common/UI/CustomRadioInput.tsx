import React from 'react';

interface CustomRadioInputType {
  label: string;
  name: string;
  onChange: (Ischecked: string) => void;
}

export function CustomRadioInput({ label, name, onChange }: CustomRadioInputType) {
  return (
    <div>
      <label htmlFor={label}>
        {label}
        <input
          type='radio'
          name={name}
          value={label}
          id={label}
          onClick={() => {
            onChange(label);
          }}
        />
      </label>
    </div>
  );
}

export default CustomRadioInput;
