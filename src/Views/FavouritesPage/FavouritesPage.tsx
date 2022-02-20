import { Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CustomLabeledCheckbox from '../../Common/UI/CustomLabeledCheckbox/CustomLabeledCheckbox';
import { CustomSlider } from '../../Common/UI/CustomSlider';
import { FavouriteFilm } from '../../redux/FavouritesPageRedux/FavouritePageActions';
import { FavoriteFilmCard } from './FavoriteFilmCard/FavoriteFilmCard';
import { genresType, optionsType } from './FavouritesPageAux';
import './FavouritePageStyles.scss';
import { CustomButton } from '../../Common/UI/CustomButton/CustomButton';
import { TemporaryDrawer } from '../../Common/UX/Drawer/Drawer';
import { UserNotAuthorizedCard } from '../../Common/UX/UserNotAuthorizedCard/UserNotAuthorizedCard';
import { EmptyFavouriteFilmsCard } from '../../Common/UX/EmptyFavouriteFilmsCard/EmptyFavouriteFilmsCard';

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
  checkboxsOptions : Array<Array<string>>,
  isDrawerOpen: boolean,
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>,
  isLogin: boolean;
}

export function FavouritesPage({
  isLogin,
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
  isDrawerOpen,
  setDrawer,
} : FavouritesPageType) {
  return (
    <main className='favourite-page'>
      { isLogin
        ? (
          <div>
            {
            favoriteFilms.length > 0
              ? (
                <>
                  <div className='favourite-page__head'>
                    <Typography sx={{ fontWeight: '600', marginTop: '4.7rem' }} variant='h2'>Избранное</Typography>
                    <CustomButton type='button' onClick={() => setDrawer(true)} variant='outlined'>Фильтры</CustomButton>
                  </div>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {favoriteFilms.map((favoriteFilm) => (
                      <FavoriteFilmCard
                        titleTranslated={favoriteFilm.titleTranslated}
                        key={favoriteFilm.id + Math.random()}
                        releaseDate={favoriteFilm.releaseDate}
                        watchProviders={favoriteFilm.watchProviders}
                        voteAverage={favoriteFilm.voteAverage}
                        genres={favoriteFilm.genres}
                        id={favoriteFilm.id}
                        posterPath={favoriteFilm.posterPath}
                        originalTitle={favoriteFilm.originalTitle}
                      />
                    ))}
                  </Box>
                  <TemporaryDrawer isDrawerOpen={isDrawerOpen} setDrawer={setDrawer}>
                    <div className='favourite-page__filters'>
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
                          title='Рейтинг'
                        />
                      </div>
                      <Divider />
                      <div className='filters__year-filter'>
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
                          title='Год'
                        />
                      </div>
                      <Divider />
                      <div className='filters__options'>
                        <Typography variant='h4' sx={{ fontWeight: '600', marginTop: '2rem', marginBottom: '0.5rem' }}>Доступность</Typography>
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
                      <Divider />
                      <div className='filter__genres'>
                        <Typography variant='h4' sx={{ fontWeight: '600', marginTop: '2rem', marginBottom: '0.5rem' }}>Жанр</Typography>
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
                  </TemporaryDrawer>
                </>
              ) : <EmptyFavouriteFilmsCard />
            }
          </div>
        ) : <UserNotAuthorizedCard />}
    </main>
  );
}
