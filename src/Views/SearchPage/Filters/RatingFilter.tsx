import React from 'react';
import { CustomSlider } from '../../../Common/UI/CustomSlider';

export interface RatingFilterType {
  setFilterOfRatings: React.Dispatch<React.SetStateAction<number[]>>;
  filterOfRatings: number[];
}
export function RatingFilter({ setFilterOfRatings, filterOfRatings }: RatingFilterType) {
  return (
    <section>
      <div className='filters__year'>
        <CustomSlider
          onChange={(value) => {
            setFilterOfRatings(value as number[]);
          }}
          step={1}
          min={0}
          max={10}
          value={filterOfRatings}
          title='Rating'
        />
      </div>
    </section>
  );
}
