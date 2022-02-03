import React from 'react';
import { CustomSlider } from '../../../Common/UI/CustomSlider';

export interface YearFilterType {
  setFilterOfYears: React.Dispatch<React.SetStateAction<number[]>>;
  filterOfYears: number[];
}
export function YearFilter({ setFilterOfYears, filterOfYears }: YearFilterType) {
  return (
    <section>
      <div className='filters__year'>
        <CustomSlider
          onChange={(value) => {
            setFilterOfYears(value as number[]);
          }}
          step={10}
          min={1900}
          max={2022}
          value={filterOfYears}
          title='year'
        />
      </div>
    </section>
  );
}
