import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './CustomSelectStyles.scss';
import OutlinedInput from '@mui/material/OutlinedInput';

interface TCustomSelect {
  variants : Array<string>,
  placeholder : string,
  handleMultipleSelect: (value : Array<string>) => void
}

export function CustomSelect({ variants, placeholder, handleMultipleSelect } : TCustomSelect) {
  const [item, setItem] = React.useState<string[]>([]);

  function deleteDublicates(array : Array <string>) {
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
    handleMultipleSelect(deleteDublicates([...item, value[1]]));
    setItem(
      deleteDublicates([...item, value[1]]),
    );
  };
  const isChoose = item.length > 0;

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          input={<OutlinedInput className='custom-select' color={isChoose ? 'primary' : 'secondary'} defaultValue='test' />}
          multiple
          value={[placeholder]}
          onChange={(e) => { handleChange(e); }}
          renderValue={(selected) => selected.join(', ')}
        >
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
