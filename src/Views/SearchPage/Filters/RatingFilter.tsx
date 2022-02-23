import React from 'react';
import { ADAPTIVE_BREAK_POINT } from '../../../Auxiliary/Constants';
import { CustomRangeValues } from '../../../Common/UI/CustomRangeValues/CustomRangeValues';
import { CustomSelectRange } from '../../../Common/UI/CustomSelectRange/CustomSelectRange';
import { CustomSlider } from '../../../Common/UI/CustomSlider';

export interface RatingFilterType {
  setFilterOfRatings: React.Dispatch<React.SetStateAction<number[]>>;
  filterOfRatings: number[];
  windowSize: number;
}

export function RatingFilter({ setFilterOfRatings, filterOfRatings, windowSize }: RatingFilterType) {
  return (
    <div className='search-page__range-filter'>
      {windowSize > ADAPTIVE_BREAK_POINT ? (
        <CustomSelectRange
          onChange={(value: number | number[]) => {
            setFilterOfRatings(value as number[]);
          }}
          placeholder='Рейтинг'
          defaultValue={0}
          value={filterOfRatings}
          step={1}
          min={0}
          max={10}
          bottomRange={filterOfRatings[0].toString()}
          topRange={filterOfRatings[1].toString()}
        />
      ) : (
        <CustomRangeValues
          topRange={filterOfRatings[1]}
          bottomRange={filterOfRatings[0]}
          curValue={filterOfRatings}
          step={1}
          min={0}
          max={10}
          onChange={(value: number | number[]) => {
            setFilterOfRatings(value as number[]);
          }}
        />
      )}
    </div>
  );
}
