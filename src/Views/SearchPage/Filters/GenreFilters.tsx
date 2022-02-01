import React from 'react';
import CustomLabeledCheckbox from '../../../Common/UI/CustomLabeledCheckbox';
import { genre } from '../SearchQueryTypes';

export interface GenreFiltersType {
  setFilterOfGenres: React.Dispatch<React.SetStateAction<genre[]>>;
  genreFilter: genre[];
}
export function GenreFilters({
  setFilterOfGenres,
  genreFilter,
}: GenreFiltersType) {
  function updateFieldChanged(prev: genre[], id: number, applied: boolean) {
    const newArr = prev.map((obj) => {
      if (obj.id !== id) {
        return obj;
      }
      const { name } = obj;
      return { id, name, applied };
    });
    setFilterOfGenres(newArr);
  }
  return (
    <section>
      <h2>search</h2>
      <div className='filters__genre'>
        {genreFilter.map((filter) => (
          <div key={filter.id}>
            {filter.name}
            <input
              type='checkbox'
              checked={filter.applied}
              onChange={(e) => {
                updateFieldChanged(genreFilter, filter.id, e.target.checked);
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
