import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { StartPage } from './Views/MainPage/StartPage';
import { SearchPage } from './Views/SearchPage/SearchPage';

import './App.scss';

export function App() {
  return (
    <>
      <header>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/search'>Search</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='*' element={<SearchPage />} />
      </Routes>
    </>
  );
}
