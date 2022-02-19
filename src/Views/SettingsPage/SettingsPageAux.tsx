import React from 'react';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SettingsPage } from './SettingsPage';

export function SettingsPageAux() {
  const user = useTypedSelector((store) => store.AuthPageReducer.user);
  const isLogin = useTypedSelector((store) => store.AuthPageReducer.isLogin);

  return (
    <div>
      {isLogin ? (
        <SettingsPage user={user} />
      ) : ''}
    </div>

  );
}
