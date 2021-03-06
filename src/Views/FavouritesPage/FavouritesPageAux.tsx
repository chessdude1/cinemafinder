import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { AuthPageActions } from '../../redux/AuthPageRedux/AuthPageActions';
import { FavouriteFilm } from '../../redux/FavouritesPageRedux/FavouritePageActions';
import { FavouritePageSagaTypes } from '../../redux/Sages/FavoritePageSaga';
import { fetchUser } from '../../Services/Service';
import { FavouritesPage } from './FavouritesPage';

export interface optionsType {
 [ ads : string] : boolean,
  flatrate : boolean,
  buy : boolean,
  rend : boolean
}

export interface genresType {
 [ Adventure: string ]: boolean,
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
  const isLogin = useTypedSelector((store) => store.AuthPageReducer.isLogin);

  const [ratingFilterValue, setRatingFilterValue] = useState<number[] | number>(5);
  const [yearFilterValue, setYearFilterValue] = useState<Array<number> | number>([1900, 2022]);
  const [options, setOptions] = useState<optionsType>(initialOptions);
  const [genres, setGenres] = useState<genresType>(initialGenres);
  const [isDrawerOpen, setDrawer] = useState<boolean>(false);

  const dispatch = useDispatch();
  const CheckboxsOptions = [['buy', '????????????'], ['ads', '?? ????????????????'], ['flatrate', '?????????????????? ???? ????????????????'], ['rend', '????????????']];
  const CheckboxsGenres = [['Action', '??????????'],
    ['Adventure', '??????????????????????'],
    ['Animation', '??????????????????????'],
    ['Comedy', '??????????????'],
    ['Crime', '????????????????'],
    ['Documentary', '????????????????????????????'],
    ['Drama', '??????????'],
    ['Family', '????????????????'],
    ['Fantasy', '????????????????????'],
    ['History', '????????????????????????'],
    ['Horror', '??????????'],
    ['Music', '????????????'],
    ['Mystery', '??????????????'],
    ['Romance', '??????????????????'],
    ['Science Fiction', '?????????????? ????????????????????'],
    ['Thriller', '??????????????'],
    ['War', '??????????????'],
    ['Western', '??????????????'],
  ];

  function AddFavouriteFilm() {
    dispatch({ type: FavouritePageSagaTypes.ADDFAVOURITESAGA });
  } // init saga worker

  function filterfilms(favoriteFilmsToFilter : Array<FavouriteFilm>) {
    let filteredFilms = [...favoriteFilmsToFilter];
    filteredFilms = filteredFilms.filter(
      (film) => Math.floor(Number(film.voteAverage)) > ratingFilterValue,
    );

    if (Array.isArray(yearFilterValue)) {
      filteredFilms = filteredFilms.filter((film) => yearFilterValue[0] <= Number(film.releaseDate.split('-')[0]));
      filteredFilms = filteredFilms.filter((film) => yearFilterValue[1] >= Number(film.releaseDate.split('-')[0]));
    }

    filteredFilms = filteredFilms.filter((film) => { // filter on genre
      const result : Array<boolean> = [];
      film.genres.forEach((genre) => {
        result.push(genres[genre.name]);
      });
      return result.includes(true); // if film has one valid genre => film valid
    });

    filteredFilms = filteredFilms.filter((film) => {
      const result: Array<boolean> = [];
      const currentFilmWatchTypes = Object.keys(film.watchProviders);
      if (currentFilmWatchTypes.length === 0) {
        result.push(true);
      }
      currentFilmWatchTypes.forEach((watchProviderType) => {
        result.push(options[watchProviderType]);
      });
      return result.includes(true);
    });

    return filteredFilms;
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUser().then((userResponse) => dispatch(AuthPageActions.SetUser(userResponse))).then(() => AddFavouriteFilm());
    }
    // read favourite user films
  }, []);

  return (
    <FavouritesPage
      isDrawerOpen={isDrawerOpen}
      genres={genres}
      setGenres={setGenres}
      ratingFilterValue={ratingFilterValue}
      setRatingFilterValue={setRatingFilterValue}
      favoriteFilms={filterfilms(films)}
      yearFilterValue={yearFilterValue}
      setYearFilterValue={setYearFilterValue}
      options={options}
      setOptions={setOptions}
      checkboxsOptions={CheckboxsOptions}
      checkboxsGenres={CheckboxsGenres}
      setDrawer={setDrawer}
      isLogin={isLogin}
    />
  );
}
