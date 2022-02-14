import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export function AccountPage() {
  return (
    <div>

      <h2>User Account</h2>
      <nav>
        <NavLink to='settings'>Settings</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
