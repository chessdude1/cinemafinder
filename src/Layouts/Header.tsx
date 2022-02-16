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
import { useDispatch } from 'react-redux';
import { SearchQueryAux } from '../Views/SearchPage/SearchQuery/QueryAux';
import './HeaderStyles.scss';
import Logo from '../Assets/img/header/Logo.png';
import { logout } from '../Services/Service';
import { AuthPageActions } from '../redux/AuthPageRedux/AuthPageActions';

const PAGES = ['Search', 'Account', 'Favourites'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const dispatch = useDispatch();
  const constructRoute = (page: string) => `/${page.toLowerCase()}`;

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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <img alt='logo' src={Logo} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {PAGES.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <NavLink className='navlink' to={constructRoute(page)}>{page}</NavLink>
              </Button>
            ))}
          </Box>
          <SearchQueryAux />
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <NavLink className='navlink' to='/authorization'>Sign In</NavLink>
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <NavLink className='navlink' to='/registration'>Sign Up</NavLink>
            </Button>
            <Button
              onClick={() => {
                logout();
                dispatch(AuthPageActions.SetIsLogin(false));
              }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
