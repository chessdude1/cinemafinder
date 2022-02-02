import React from 'react';
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
      <div className='sort'>
        {sortsList.map((sort) => (
          <div key={sort}>
            <label htmlFor={sort}>
              {sort}
              <input type='radio' name='sort' value={sort} id={sort} onClick={() => setSortOrder(sort)} />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
