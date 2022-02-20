import React, { MutableRefObject, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, InputBase, styled } from '@mui/material';
import { Movie } from '../../../redux/SearchPageRedux/SearchPageActions';

interface ICustomSearchFieldType {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  searchInput: string;
  searchResult: Movie[];
  placeholder: string;
  id: string;
  resultContainer: HTMLDivElement | MutableRefObject<null>;
  inputPaddings: number
}

export function CustomSearchField({ resultContainer, onChange, onKeyDown, searchResult, searchInput, placeholder, id, setFocus, inputPaddings }: ICustomSearchFieldType) {
  const searchInputField = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    setFocus(true);
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
    right: '0',
  }));
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#FAFAFA',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '100%',
    },
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(inputPaddings, inputPaddings, inputPaddings, 0),
      paddingLeft: `calc(1em + ${theme.spacing(1)})`,
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
      <StyledInputBase onKeyDown={onKeyDown} key={id} inputRef={searchInputField} id={id} onChange={onChange} value={searchInput} placeholder={placeholder} inputProps={{ 'aria-label': 'search' }} />
    </Search>
  );
}
