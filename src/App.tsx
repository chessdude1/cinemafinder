import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StartPage } from './Views/MainPage/StartPage';
import { PageNotFound } from './Views/ErrorPage/PageNotFound';
import { RegistrationPage } from './Views/RegistrationPage/RegistrationPage';
import { AccountPage } from './Views/AccountPage/AccountPage';
import { AuthorizationPage } from './Views/AuthorizationPage/AuthorizationPage';
import { MoviePageAux } from './Views/MoviePage/MoviePageAux';
import Header from './Layouts/Header';
import { FavouritesPageAux } from './Views/FavouritesPage/FavouritesPageAux';
import { SettingsPage } from './Views/AccountPage/SettingsPage/SettingsPage';
import './App.scss';
import { SearchPageAux } from './Views/SearchPage/SearchPageAux';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Inter',
      textTransform: 'none',
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/search' element={<SearchPageAux />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/authorization' element={<AuthorizationPage />} />
        <Route path='/favourites' element={<FavouritesPageAux />} />
        <Route path='/account' element={<AccountPage />}>
          <Route path='settings' element={<SettingsPage />} />
        </Route>
        <Route path='/movie/:movieId' element={<MoviePageAux />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}
