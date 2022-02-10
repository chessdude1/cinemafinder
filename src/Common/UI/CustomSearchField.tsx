import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, InputBase, styled } from '@mui/material';
import { Formik, Form, FormikProps } from 'formik';
import { Movie } from '../../redux/SearchPageRedux/SearchPageActions';

interface ICustomSearchFieldType {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  searchInput: string;
  searchResult: Movie[];
  placeholder: string;
  id: string;
}

export function CustomSearchField({ onChange, searchResult, searchInput, placeholder, id }: ICustomSearchFieldType) {
  const searchInputField = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchInputField.current?.focus();
  }, [searchInput, searchResult]);
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase key={id} inputRef={searchInputField} id={id} onChange={onChange} value={searchInput} placeholder={placeholder} inputProps={{ 'aria-label': 'search' }} />
    </Search>
  );
}
