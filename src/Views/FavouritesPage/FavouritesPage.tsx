import React from 'react';
import CustomLabeledCheckbox from '../../Common/UI/CustomLabeledCheckbox';
import { CustomSlider } from '../../Common/UI/CustomSlider';
import { FavouriteFilm } from '../../redux/FavouritesPageRedux/FavouritePageActions';
import { FavoriteFilmCard } from './FavoriteFilmCard/FavoriteFilmCard';
import './FavouritePageStyles.scss';
import { genresType, optionsType } from './FavouritesPageAux';

interface FavouritesPageType {
  favoriteFilms : Array<FavouriteFilm>,
  ratingFilterValue : number | number[],
  yearFilterValue: number | number[],
  setRatingFilterValue : React.Dispatch<React.SetStateAction<number | number[]>>
  setYearFilterValue : React.Dispatch<React.SetStateAction<number | number[]>>
  setOptions : React.Dispatch<React.SetStateAction<optionsType>>
  options : optionsType,
  genres : genresType,
  setGenres : React.Dispatch<React.SetStateAction<genresType>>,
  checkboxsGenres : Array<Array<string>>,
  checkboxsOptions : Array<Array<string>>
}

export function FavouritesPage({
  favoriteFilms,
  ratingFilterValue,
  setRatingFilterValue,
  yearFilterValue,
  setYearFilterValue,
  setOptions,
  options,
  setGenres,
  genres,
  checkboxsOptions,
  checkboxsGenres,
} : FavouritesPageType) {
  return (
    <main className='favourite-page'>
      <section className='films-list'>
        {favoriteFilms.map((favoriteFilm) => (
          <FavoriteFilmCard
            key={favoriteFilm.id + Math.random()}
            id={favoriteFilm.id}
            posterPath={favoriteFilm.posterPath}
            originalTitle={favoriteFilm.originalTitle}
          />
        ))}
      </section>
      <div className='filters'>
        <div className='filters__rating-filter'>
          <CustomSlider
            onChange={(value) => {
              setRatingFilterValue(
                value,
              );
            }}
            step={1}
            min={1}
            max={10}
            value={ratingFilterValue}
            title='Rating'
          />
        </div>
        <CustomSlider
          onChange={(value) => {
            setYearFilterValue(
              value,
            );
          }}
          step={10}
          min={1900}
          max={2022}
          value={yearFilterValue}
          title='year'
        />
        <div className='filters__options'>
          { checkboxsOptions.map((checkbox) => (
            <CustomLabeledCheckbox
              key={checkbox[0]}
              label={`${checkbox[1]}`}
              onChange={(isChecked) => {
                setOptions({
                  ...options,
                  [checkbox[0]]: isChecked,
                });
              }}
            />
          ))}
        </div>
        <div className='filter__genres'>
          {checkboxsGenres.map((checkbox) => (
            <CustomLabeledCheckbox
              key={checkbox[0]}
              label={`${checkbox[1]}`}
              onChange={(isChecked) => {
                setGenres({
                  ...genres,
                  [checkbox[0]]: isChecked,
                });
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
