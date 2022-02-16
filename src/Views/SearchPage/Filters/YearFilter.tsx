import React from 'react';
import { CustomSelectRange } from '../../../Common/UI/CustomSelectRange/CustomSelectRange';
import { CustomSlider } from '../../../Common/UI/CustomSlider';

export interface YearFilterType {
  setFilterOfYears: React.Dispatch<React.SetStateAction<number[]>>;
  filterOfYears: number[];
}
export function YearFilter({ setFilterOfYears, filterOfYears }: YearFilterType) {
  return (
    <section>
      <div className='filters__year'>
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
        />
        {/* <CustomSlider
          onChange={(value) => {
            setFilterOfYears(value as number[]);
          }}
          step={10}
          min={1900}
          max={2022}
          value={filterOfYears}
          title='year'
        /> */}
      </div>
    </section>
  );
}
