import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './CustomSelectStyles.scss';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputLabel } from '@mui/material';

interface ICustomSingleSelect {
  variants: Array<string>;
  placeholder: string;
  checkedArray: string;
  handleSelect: (value: string) => void;
}

export function CustomSingleSelect({ variants, placeholder, checkedArray, handleSelect }: ICustomSingleSelect) {
  const [item, setItem] = React.useState<string>(checkedArray);
  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    const newItems = value;
    console.log(newItems);
    handleSelect(newItems as string);
    setItem(newItems as string);
  };
  const isChoose = item.length > 0;
  return (
    <div>
      <FormControl sx={{ m: 1, width: 150 }}>
        <Select
          input={<OutlinedInput className='custom-select' color={isChoose ? 'primary' : 'secondary'} defaultValue='test' />}
          value={checkedArray}
          renderValue={() => placeholder}
          onChange={(e: SelectChangeEvent<string>) => {
            handleChange(e);
          }}>
          {variants.map((variant) => (
            <MenuItem key={variant} value={variant}>
              <Checkbox checked={item.indexOf(variant) > -1} />
              <ListItemText primary={variant} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
