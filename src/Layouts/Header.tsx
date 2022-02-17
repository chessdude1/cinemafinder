import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import { useDispatch } from 'react-redux';

import { SearchQueryAux } from '../Views/SearchPage/SearchQuery/QueryAux';
import { logout } from '../Services/Service';
import { AuthPageActions } from '../redux/AuthPageRedux/AuthPageActions';
import { useTypedSelector } from '../Hooks/useTypedSelector';

import './HeaderStyles.scss';
import Logo from '../Assets/img/header/Logo.png';

const PAGESTRANSLATED: IPageTranslated = {
  Поиск: 'search',
  Избранные: 'favourites',
  Настройки: 'settings',
  Выход: 'logout',
};

interface IPageTranslated {
  [key: string]: string;
}

const PAGES = ['Поиск', 'Избранные'];
const settings = ['Настройки', 'Выход'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const isLogin = useTypedSelector((store) => store.AuthPageReducer.isLogin);
  const picture = useTypedSelector((store) => store.AuthPageReducer.user.picture);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const constructRoute = (page: string) => {
    let translatedLink = '';
    if (PAGESTRANSLATED[page]) {
      translatedLink = PAGESTRANSLATED[page];
    } else {
      translatedLink = page;
    }
    return `/${translatedLink.toLowerCase()}`;
  };

  const userStatus = isLogin ? (
    <Box sx={{ flexGrow: 0, display: 'flex' }}>
      <Tooltip title='Открыть настройки'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {picture ? <Avatar alt='user image' src={`http://localhost:5000/${picture}`} /> : <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (setting !== 'Выход' ? (
          <NavLink to={constructRoute(setting)}>
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign='center'>{setting}</Typography>
            </MenuItem>
          </NavLink>
        ) : (
          <MenuItem
            onClick={() => {
              logout();
              handleCloseUserMenu();
              dispatch(AuthPageActions.SetIsLogin(false));
            }}
            key={setting}
          >
            <Typography textAlign='center'>{setting}</Typography>
          </MenuItem>
        )))}
      </Menu>
    </Box>
  ) : (
    <Box sx={{ flexGrow: 0, display: 'flex' }}>
      <Button sx={{ my: 2, color: 'white', display: 'block' }}>
        <NavLink className='navlink' to='/authorization'>
          Логин
        </NavLink>
      </Button>
      <Button sx={{ my: 2, color: 'white', display: 'block' }}>
        <NavLink className='navlink' to='/registration'>
          Регистрация
        </NavLink>
      </Button>
    </Box>
  );

  const userStatus = isLogin ? (
    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          setting !== 'Logout' ? (
            <NavLink to={constructRoute(setting)}>
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign='center'>{setting}</Typography>
              </MenuItem>
            </NavLink>
          ) : (
            <MenuItem
              onClick={() => {
                logout();
                handleCloseUserMenu();
                dispatch(AuthPageActions.SetIsLogin(false));
              }}
              key={setting}
            >
              <Typography textAlign='center'>{setting}</Typography>
            </MenuItem>
          )
        ))}
      </Menu>
    </Box>
  ) : (
    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
      <Button sx={{ my: 2, color: 'white', display: 'block' }}>
        <NavLink className='navlink' to='/authorization'>Sign In</NavLink>
      </Button>
      <Button sx={{ my: 2, color: 'white', display: 'block' }}>
        <NavLink className='navlink' to='/registration'>Sign Up</NavLink>
      </Button>
    </Box>
  );

  return (
    <AppBar color='default' position='static'>
      <Container sx={{ maxWidth: '1280px' }}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {PAGES.map((page) => (
                <NavLink className='navlink' key={page} to={constructRoute(page)}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
            <NavLink to='/'>
              <img alt='logo' src={Logo} />
            </NavLink>
          </Box>

          <Box sx={{ alignItems: 'center', gap: '20px', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLink to='/'>
              <img alt='logo' src={Logo} />
            </NavLink>
            {PAGES.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <NavLink className='navlink' to={constructRoute(page)}>
                  {page}
                </NavLink>
              </Button>
            ))}
            <div className='search-field__hidden'>
              <SearchQueryAux inputPaddings={1} />
            </div>
          </Box>
          {userStatus}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
