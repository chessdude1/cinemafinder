import React from 'react';
import CustomRadioInput from '../../../Common/UI/CustomRadioInput';
import { providerFilter, watchProvider } from '../SearchQueryTypes';

export interface SortOrderType {
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: string;
  sortsList: string[];
}
export function SortOrder({ setSortOrder, sortOrder, sortsList }: SortOrderType) {
  return (
    <section>
      <h2>Sort Order</h2>
      <div className='sort-options'>
        {sortsList.map((sort) => (
          <CustomRadioInput key={sort} label={sort} name='sort' onChange={setSortOrder} />
        ))}
      </div>
    </section>
  );
}
