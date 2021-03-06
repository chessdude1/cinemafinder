import React, { SetStateAction } from 'react';
import { ADAPTIVE_BREAK_POINT } from '../../../Auxiliary/Constants';
import CustomRadioInput from '../../../Common/UI/CustomRadioInput';
import { CustomSelect } from '../../../Common/UI/CustomSelect/CustomSelect';
import { CustomSingleSelect } from '../../../Common/UI/CustomSelect/CustomSingleSelect';
import { SORT_ORDER } from '../SearchQueryTypes';

export interface SortOrderType {
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  sortsList: string[];
  windowSize: number;
}
export function SortOrder({ setSortOrder, sortOrder, sortsList, windowSize }: SortOrderType) {
  function getKeyName(value: string) {
    return Object.entries(SORT_ORDER).find(([key, val]) => val === value)?.[0];
  }
  function updateFieldChanged(name: string) {
    setSortOrder(getKeyName(name) as string);
  }
  return (
    <section>
      <div className='search-page__sort-options'>
        {windowSize > ADAPTIVE_BREAK_POINT ? (
          <CustomSingleSelect
            checkedItem={SORT_ORDER[sortOrder as keyof typeof SORT_ORDER]}
            variants={sortsList.map((order) => SORT_ORDER[order as keyof typeof SORT_ORDER])}
            placeholder='Сортировка'
            handleSelect={(value: string) => {
              updateFieldChanged(value);
            }}
          />
        ) : (
          <div>
            <CustomRadioInput
              onChange={(value: string) => {
                updateFieldChanged(value);
              }}
              checkedValue={SORT_ORDER[sortOrder as keyof typeof SORT_ORDER]}
              options={sortsList.map((order) => SORT_ORDER[order as keyof typeof SORT_ORDER])}
            />
          </div>
        )}
      </div>
    </section>
  );
}
