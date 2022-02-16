import React from 'react';
import { CustomSelectRange } from '../../../Common/UI/CustomSelectRange/CustomSelectRange';
import { CustomSlider } from '../../../Common/UI/CustomSlider';

export interface RatingFilterType {
  setFilterOfRatings: React.Dispatch<React.SetStateAction<number[]>>;
  filterOfRatings: number[];
}
export function RatingFilter({ setFilterOfRatings, filterOfRatings }: RatingFilterType) {
  return (
    <section>
      <div className='filters__year'>
        <CustomSelectRange
          onChange={(value: number | number[]) => {
            setFilterOfRatings(value as number[]);
          }}
          placeholder='rating'
          defaultValue={0}
          value={filterOfRatings}
          step={1}
          min={0}
          max={10}
        />
        {/* <CustomSlider
          onChange={(value) => {
            setFilterOfRatings(value as number[]);
          }}
          step={1}
          min={0}
          max={10}
          value={filterOfRatings}
          title='Rating'
        /> */}
      </div>
    </section>
  );
}
