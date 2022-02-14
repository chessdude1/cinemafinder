import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './CustomSelectRangeStyles.scss';
import OutlinedInput from '@mui/material/OutlinedInput';
import Slider from '@mui/material/Slider';

interface TCustomSelect {
  variants : Array<string>,
  placeholder : string
}

export function CustomSelectRange({ variants, placeholder } : TCustomSelect) {
  const [item, setItem] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof item>) => {
    const {
      target: { value },
    } = event;

    function deleteDublicates(array : Array <string>) {
      let dublicateName = '';
      for (let i = 0; i < array.length; i += 1) {
        if (array.indexOf(array[i]) !== array.lastIndexOf(array[i])) {
          dublicateName = array[i];
        }
      }
      return array.filter((elem) => elem !== dublicateName);
    }

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
              <Slider
                aria-label='Small steps'
                defaultValue={0.00000005}
                step={0.00000001}
                marks
                min={-0.00000005}
                max={0.0000001}
                valueLabelDisplay='auto'
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
