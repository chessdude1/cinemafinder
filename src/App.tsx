import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StartPage } from './Views/MainPage/StartPage';
import { SearchPage } from './Views/SearchPage/SearchPage';
import { PageNotFound } from './Views/ErrorPage/PageNotFound';
import { RegistrationPage } from './Views/RegistrationPage/RegistrationPage';
import { AccountPage } from './Views/AccountPage/AccountPage';

import './App.scss';
import { FavouritesPage } from './Views/FavouritesPage/FavouritesPage';
import { MoviePage } from './Views/MoviePage/MoviePage';
import { SettingsPage } from './Views/AccountPage/SettingsPage/SettingsPage';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<StartPage />}>
        <Route path='search' element={<SearchPage />} />
        <Route path='registration' element={<RegistrationPage />} />
        <Route path='movie' element={<MoviePage />} />
        <Route path='favourites' element={<FavouritesPage />} />
        <Route path='account' element={<AccountPage />}>
          <Route path='settings' element={<SettingsPage />} />
        </Route>
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}
