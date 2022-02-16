import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

interface ITemporaryDrawer {
  isDrawerOpen: boolean;
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export function TemporaryDrawer({ isDrawerOpen, setDrawer, children } : ITemporaryDrawer) {
  return (
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

  );
}
