import React, { SetStateAction } from 'react';
import CustomRadioInput from '../../../Common/UI/CustomRadioInput';
import { CustomSelect } from '../../../Common/UI/CustomSelect/CustomSelect';
import { CustomSingleSelect } from '../../../Common/UI/CustomSelect/CustomSingleSelect';
import { providerFilter, SORT_ORDER, watchProvider } from '../SearchQueryTypes';

export interface SortOrderType {
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  sortsList: string[];
}
export function SortOrder({ setSortOrder, sortOrder, sortsList }: SortOrderType) {
  function getKeyName(value: string) {
    return Object.entries(SORT_ORDER).find(([key, val]) => val === value)?.[0];
  }
  function updateFieldChanged(name: string) {
    setSortOrder(getKeyName(name) as string);
  }

  return (
    <section>
      <div className='sort-options'>
        <CustomSingleSelect
          checkedArray={SORT_ORDER[sortOrder as keyof typeof SORT_ORDER]}
          variants={sortsList.map((order) => SORT_ORDER[order as keyof typeof SORT_ORDER])}
          placeholder='order'
          handleSelect={(value: string) => {
            updateFieldChanged(value);
          }}
        />
      </div>
    </section>
  );
}
