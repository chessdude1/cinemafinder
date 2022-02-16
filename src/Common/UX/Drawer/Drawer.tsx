import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

interface ITemporaryDrawer {
  children: React.ReactNode;
  isDrawerOpen: boolean;
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TemporaryDrawer({ children, isDrawerOpen, setDrawer } : ITemporaryDrawer) {
  return (
    <div>
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setDrawer(false)}
      >
        <Box
          role='presentation'
          onKeyDown={() => setDrawer(false)}
        >
          <List>
            {children}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
