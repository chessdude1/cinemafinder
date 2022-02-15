import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { StartPage } from './Views/MainPage/StartPage';
import { PageNotFound } from './Views/ErrorPage/PageNotFound';
import { RegistrationPage } from './Views/RegistrationPage/RegistrationPage';
import { AccountPage } from './Views/AccountPage/AccountPage';
import { AuthorizationPage } from './Views/AuthorizationPage/AuthorizationPage';
import { MoviePageAux } from './Views/MoviePage/MoviePageAux';
import Header from './Layouts/Header';
import { FavouritesPageAux } from './Views/FavouritesPage/FavouritesPageAux';
import { SettingsPage } from './Views/AccountPage/SettingsPage/SettingsPage';
import { SearchPageAux } from './Views/SearchPage/SearchPageAux';
import { QueryPageAux } from './Views/SearchPage/SearchQuery/QueryPage/QueryPage';
import { IAuthResponse } from './Services/ServiceTypes';
import { API_URL } from './Services/Interceptors';
import { AuthPageActions } from './redux/AuthPageRedux/AuthPageActions';
import './App.scss';
import { fetchUser } from './Services/Service';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Inter',
      textTransform: 'none',
    },
  },
});

export function App() {
  const dispatch = useDispatch();
  async function checkAuth() {
    try {
      const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      dispatch(AuthPageActions.SetIsLogin(true));
      const user = await fetchUser();
      console.log(user);
      dispatch(AuthPageActions.SetUser(user));
    } catch (e: any) {
      dispatch(AuthPageActions.SetIsLogin(false));
      console.log(123);
      console.log(e.response?.data?.message);
    }
  }

  useEffect(() => {
    checkAuth();
  });

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/search' element={<SearchPageAux />} />
        <Route path='/query' element={<QueryPageAux />} />
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
