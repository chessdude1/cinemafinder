import React from 'react';
import CustomRadioInput from '../../../Common/UI/CustomRadioInput';
import { CustomSelect } from '../../../Common/UI/CustomSelect/CustomSelect';
import { providerFilter, watchProvider } from '../SearchQueryTypes';

export interface SortOrderType {
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  sortsList: string[];
}
export function SortOrder({ setSortOrder, sortOrder, sortsList }: SortOrderType) {
  function updateFieldChanged(names: string[]) {
    setSortOrder(names[0]);
  }
  return (
    <section>
      <div className='sort-options'>
        <CustomSelect
          isMultiple={false}
          checkedArray={[sortOrder]}
          variants={sortsList.map((order) => order)}
          placeholder='order'
          handleMultipleSelect={(value: string[]) => {
            updateFieldChanged(value);
          }}
        />
        {/* {sortsList.map((sort) => (
          <CustomRadioInput key={sort} label={sort} name='sort' onChange={setSortOrder} />
        ))} */}
      </div>
    </section>
  );
}
