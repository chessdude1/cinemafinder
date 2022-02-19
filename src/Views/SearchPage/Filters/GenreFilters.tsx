import { divide } from 'lodash';
import React from 'react';
import { ADAPTIVE_BREAK_POINT } from '../../../Auxiliary/Constants';
import CustomLabeledCheckbox from '../../../Common/UI/CustomLabeledCheckbox/CustomLabeledCheckbox';
import { CustomSelect } from '../../../Common/UI/CustomSelect/CustomSelect';
import { IGenre } from '../SearchQueryTypes';
import { INIT_GENRES_STATE } from './InitialStates';

export interface GenreFiltersType {
  setFilterOfGenres: React.Dispatch<React.SetStateAction<IGenre[]>>;
  genreFilter: IGenre[];
  windowSize: number;
}
export function GenreFilters({ setFilterOfGenres, genreFilter, windowSize }: GenreFiltersType) {
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
        {windowSize > ADAPTIVE_BREAK_POINT ? (
          <CustomSelect
            isMultiple
            checkedArray={genreFilter.filter((genre) => genre.isApplied).map((genre) => genre.name)}
            variants={genreFilter.map((genre) => genre.name)}
            placeholder='genres'
            handleMultipleSelect={(value: string[]) => {
              updateFieldChanged(value);
            }}
          />
        ) : (
          <div>
            {genreFilter.map((genre) => (
              <CustomLabeledCheckbox key={genre.id} isDefaultChecked={genre.isApplied} label={genre.name} onChange={() => updateFieldChanged([genre.name])} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
