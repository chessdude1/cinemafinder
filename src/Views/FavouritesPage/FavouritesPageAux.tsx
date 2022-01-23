import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { FavouriteFilm } from '../../redux/FavouritesPageRedux/FavouritePageActions';
import { FavouritePageSagaTypes } from '../../redux/Sages/FavoritePageSaga';
import { FavouritesPage } from './FavouritesPage';

export interface optionsType {
  ads ?: boolean,
  flatrate ?: boolean,
  buy ?: boolean,
  rend ?: boolean
}

export interface genresType {
  Adventure: boolean,
  Animation: boolean,
  Comedy: boolean,
  Crime: boolean,
  Documentary: boolean,
  Drama:boolean,
  Family: boolean,
  Fantasy: boolean,
  History: boolean,
  Horror: boolean,
  Music: boolean,
  Mystery: boolean,
  Romance: boolean,
  Science: boolean,
  Thriller: boolean,
  War: boolean,
  Western: boolean,
}

export function FavouritesPageAux() {
  const initialOptions = {
    ads: true,
    flatrate: true,
    buy: true,
    rend: true,
  };

  const initialGenres = {
    Adventure: true,
    Animation: true,
    Comedy: true,
    Crime: true,
    Documentary: true,
    Drama: true,
    Family: true,
    Fantasy: true,
    History: true,
    Horror: true,
    Music: true,
    Mystery: true,
    Romance: true,
    Science: true,
    Thriller: true,
    War: true,
    Western: true,
  };

  const films = useTypedSelector((store) => store.FavouritesPageReducer.films);
  const [ratingFilterValue, setRatingFilterValue] = useState<number[] | number>(5);
  const [yearFilterValue, setYearFilterValue] = useState<Array<number> | number>([1900, 2022]);
  const [options, setOptions] = useState<optionsType>(initialOptions);
  const [genres, setGenres] = useState<genresType>(initialGenres);

  const dispatch = useDispatch();

  function AddFavouriteFilm() {
    dispatch({ type: FavouritePageSagaTypes.ADDFAVOURITESAGA });
  } // init saga worker

  function filterfilms(favoriteFilmsToFilter : Array<FavouriteFilm>) {
    let filteredFilms = [...favoriteFilmsToFilter];
    filteredFilms = filteredFilms.filter(
      (film) => Math.floor(Number(film.voteAverage)) > ratingFilterValue,
    );

    if (Array.isArray(yearFilterValue)) {
      filteredFilms = filteredFilms.filter((film) => yearFilterValue[0] < Number(film.releaseDate.split('-')[0]));
      filteredFilms = filteredFilms.filter((film) => yearFilterValue[1] > Number(film.releaseDate.split('-')[0]));
    }

    return filteredFilms;
  }

  console.log(filterfilms(films));
  useEffect(() => {
    AddFavouriteFilm();
  }, []);

  return (
    <FavouritesPage
      genres={genres}
      setGenres={setGenres}
      ratingFilterValue={ratingFilterValue}
      setRatingFilterValue={setRatingFilterValue}
      favoriteFilms={filterfilms(films)}
      yearFilterValue={yearFilterValue}
      setYearFilterValue={setYearFilterValue}
      options={options}
      setOptions={setOptions}
    />
  );
}
