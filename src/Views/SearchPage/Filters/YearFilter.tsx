import { FormControl, Slider } from '@mui/material';
import React from 'react';
import { ADAPTIVE_BREAK_POINT } from '../../../Auxiliary/Constants';
import { CustomRangeValues } from '../../../Common/UI/CustomRangeValues/CustomRangeValues';
import { CustomSelectRange } from '../../../Common/UI/CustomSelectRange/CustomSelectRange';
import { CustomSlider } from '../../../Common/UI/CustomSlider';

export interface YearFilterType {
  setFilterOfYears: React.Dispatch<React.SetStateAction<number[]>>;
  filterOfYears: number[];
  windowSize: number;
}
export function YearFilter({ setFilterOfYears, filterOfYears, windowSize }: YearFilterType) {
  return (
    <section>
      <div>
        {windowSize > ADAPTIVE_BREAK_POINT ? (
          <CustomSelectRange
            onChange={(value: number | number[]) => {
              setFilterOfYears(value as number[]);
            }}
            placeholder='year'
            defaultValue={0}
            step={10}
            min={1900}
            max={2022}
            value={filterOfYears}
            bottomRange={filterOfYears[0].toString()}
            topRange={filterOfYears[1].toString()}
          />
        ) : (
          <CustomRangeValues
            topRange={filterOfYears[1]}
            bottomRange={filterOfYears[0]}
            onChange={(value: number | number[]) => {
              setFilterOfYears(value as number[]);
            }}
            step={10}
            min={1900}
            max={2022}
            curValue={filterOfYears}
          />
        )}
      </div>
    </section>
  );
}
