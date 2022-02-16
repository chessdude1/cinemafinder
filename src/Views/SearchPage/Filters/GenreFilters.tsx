import React from 'react';
import CustomLabeledCheckbox from '../../../Common/UI/CustomLabeledCheckbox';
import { CustomSelect } from '../../../Common/UI/CustomSelect/CustomSelect';
import { IGenre } from '../SearchQueryTypes';
import { INIT_GENRES_STATE } from './InitialStates';

export interface GenreFiltersType {
  setFilterOfGenres: React.Dispatch<React.SetStateAction<IGenre[]>>;
  genreFilter: IGenre[];
}
export function GenreFilters({ setFilterOfGenres, genreFilter }: GenreFiltersType) {
  function updateFieldChanged(names: string[]) {
    const allGenres = INIT_GENRES_STATE;
    const newArr = allGenres.map((obj) => {
      if (!names.includes(obj.name)) {
        return obj;
      }
      const { id, name } = obj;
      return { id, name, isApplied: true };
    });
    setFilterOfGenres(newArr);
  }
  return (
    <section>
      <div className='filters__genre'>
        <CustomSelect
          isMultiple
          checkedArray={genreFilter.filter((genre) => genre.isApplied).map((genre) => genre.name)}
          variants={genreFilter.map((genre) => genre.name)}
          placeholder='genres'
          handleMultipleSelect={(value: string[]) => {
            updateFieldChanged(value);
          }}
        />
        {/* // <div key={filter.id}>
          //   {filter.name}
          //   <input
          //     type='checkbox'
          //     checked={filter.isApplied}
          //     onChange={(e) => {
          //       updateFieldChanged(genreFilter, filter.id, e.target.checked);
          //     }}
          //   />
          // </div> */}
      </div>
    </section>
  );
}
