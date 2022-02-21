import { divide } from 'lodash';
import React from 'react';
import { ADAPTIVE_BREAK_POINT } from '../../../Auxiliary/Constants';
import { GENRES_TRANSLATION } from '../../../Auxiliary/TranslateGenre';
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
  function getKeyName(value: string) {
    return Object.entries(GENRES_TRANSLATION).find(([key, val]) => val === value)?.[0];
  }
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
      {windowSize > ADAPTIVE_BREAK_POINT ? (
        <CustomSelect
          isMultiple
          checkedArray={genreFilter.filter((genre) => genre.isApplied).map((genre) => GENRES_TRANSLATION[genre.name as keyof typeof GENRES_TRANSLATION] as string)}
          variants={genreFilter.map((genre) => GENRES_TRANSLATION[genre.name as keyof typeof GENRES_TRANSLATION] as string)}
          placeholder='Жанр'
          handleMultipleSelect={(value: string[]) => {
            updateFieldChanged(value.map((name) => getKeyName(name) as string));
          }}
        />
      ) : (
        <div className='search-page__checkbox-filter'>
          {genreFilter.map((genre) => (
            <CustomLabeledCheckbox
              key={genre.id}
              isDefaultChecked={genre.isApplied}
              label={GENRES_TRANSLATION[genre.name as keyof typeof GENRES_TRANSLATION]}
              onChange={() => updateFieldChanged([genre.name])}
            />
          ))}
        </div>
      )}
    </section>
  );
}
