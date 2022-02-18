import * as React from 'react';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './CustomSelectStyles.scss';
import OutlinedInput from '@mui/material/OutlinedInput';
import { IGenre } from '../../../Views/SearchPage/SearchQueryTypes';

type selectableTypes = string;

interface TCustomSelect {
  variants: Array<string>;
  placeholder: string;
  checkedArray: string[];
  handleMultipleSelect: (value: Array<string>) => void;
  isMultiple: boolean;
}

export function CustomSelect({ variants, placeholder, checkedArray, handleMultipleSelect, isMultiple }: TCustomSelect) {
  const [item, setItem] = useState(checkedArray);
  useEffect(() => setItem(checkedArray), [checkedArray]);
  function deleteDublicates(array: Array<selectableTypes>) {
    let dublicateName = '';
    for (let i = 0; i < array.length; i += 1) {
      if (array.indexOf(array[i]) !== array.lastIndexOf(array[i])) {
        dublicateName = array[i];
      }
    }
    return array.filter((elem) => elem !== dublicateName);
  }

  const handleChange = (event: SelectChangeEvent<typeof item>) => {
    const {
      target: { value },
    } = event;
    const newItems = deleteDublicates([...item, value[1]]);
    handleMultipleSelect(newItems);
    setItem(newItems);
  };
  const isChoose = item.length > 0;
  return (
    <div>
      <FormControl sx={{ m: 1, width: 150 }}>
        <Select
          input={<OutlinedInput className='custom-select' color={isChoose ? 'primary' : 'secondary'} defaultValue='test' />}
          multiple
          value={[placeholder]}
          onChange={(e) => {
            handleChange(e);
          }}
          renderValue={(selected) => selected.join(', ')}>
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
