import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export function StartPage() {
  return (
    <div>
      <h1>START PAGE</h1>
      <header>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/search'>Search</NavLink>
          <NavLink to='/account'>Account</NavLink>
          <NavLink to='/registration'>Sign Up</NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
