import { divide } from 'lodash';
import React from 'react';
import { ADAPTIVE_BREAK_POINT } from '../../../Auxiliary/Constants';
import { Genres } from '../../../Auxiliary/TranslateGenre';
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
    const newNames = names.map((name) => Genres[name as keyof typeof Genres] as string);
    const allGenres = INIT_GENRES_STATE;
    const newArr = allGenres.map((obj) => {
      if (!newNames.includes(obj.name)) {
        return obj;
      }
      const { id, name } = obj;
      return { id, name, isApplied: true };
    });
    setFilterOfGenres(newArr);
  }
  return (
    <section>
      {windowSize > ADAPTIVE_BREAK_POINT ? (
        <CustomSelect
          isMultiple
          checkedArray={genreFilter.filter((genre) => genre.isApplied).map((genre) => Genres[genre.name as keyof typeof Genres])}
          variants={genreFilter.map((genre) => Genres[genre.name as keyof typeof Genres])}
          placeholder='Жанр'
          handleMultipleSelect={(value: string[]) => {
            updateFieldChanged(value);
          }}
        />
      ) : (
        <div className='search-page__checkbox-filter'>
          {genreFilter.map((genre) => (
            <CustomLabeledCheckbox key={genre.id} isDefaultChecked={genre.isApplied} label={genre.name} onChange={() => updateFieldChanged([genre.name])} />
          ))}
        </div>
      )}
    </section>
  );
}
