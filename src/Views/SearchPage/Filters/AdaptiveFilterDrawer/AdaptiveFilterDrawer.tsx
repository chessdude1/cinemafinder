import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { useState } from 'react';
import { CustomButton } from '../../../../Common/UI/CustomButton/CustomButton';

interface IAdaptiveDrawer {
  children: React.ReactNode;
  name: string;
  // isDrawerOpen: boolean;
  // setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AdaptiveDrawer({ children, name }: IAdaptiveDrawer) {
  const [isDrawerOpen, setDrawer] = useState(false);
  return (
    <>
      <button onClick={() => setDrawer(true)}>{name}</button>
      <div>
        <Drawer anchor='left' open={isDrawerOpen} onClose={() => setDrawer(false)}>
          <Box role='presentation' onKeyDown={() => setDrawer(false)}>
            <List>
              <CustomButton type='button' onClick={() => setDrawer(false)} variant='contained'>
                Назад
              </CustomButton>
              {children}
            </List>
          </Box>
        </Drawer>
      </div>
    </>
  );
}
