import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StartPage } from './Views/MainPage/StartPage';
import { SearchPage } from './Views/SearchPage/SearchPage';
import { PageNotFound } from './Views/ErrorPage/PageNotFound';
import { RegistrationPage } from './Views/RegistrationPage/RegistrationPage';
import { AccountPage } from './Views/AccountPage/AccountPage';
import { AuthorizationPage } from './Views/AuthorizationPage/AuthorizationPage';
import { MoviePageAux } from './Views/MoviePage/MoviePageAux';
import Header from './Layouts/Header';
import { FavouritesPageAux } from './Views/FavouritesPage/FavouritesPageAux';
import { SettingsPage } from './Views/AccountPage/SettingsPage/SettingsPage';
<<<<<<< HEAD
import './App.scss';

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/authorization' element={<AuthorizationPage />} />
        <Route path='/favourites' element={<FavouritesPageAux />} />
        <Route path='/account' element={<AccountPage />}>
=======
import { SearchPageAux } from './Views/SearchPage/SearchPageAux';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<StartPage />}>
        <Route path='search' element={<SearchPageAux />} />
        <Route path='registration' element={<RegistrationPage />} />
        <Route path='movie' element={<MoviePage />} />
        <Route path='favourites' element={<FavouritesPageAux />} />
        <Route path='account' element={<AccountPage />}>
>>>>>>> 150e56f... feat: build search redux structure
          <Route path='settings' element={<SettingsPage />} />
        </Route>
        <Route path='/movie/:movieId' element={<MoviePageAux />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}
