import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, InputBase, styled } from '@mui/material';
import { Movie } from '../../redux/SearchPageRedux/SearchPageActions';

interface ICustomSearchFieldType {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  searchInput: string;
  searchResult: Movie[];
  placeholder: string;
  id: string;
}

export function CustomSearchField({ onChange, searchResult, searchInput, placeholder, id, setFocus }: ICustomSearchFieldType) {
  const searchInputField = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFocus(true);
    searchInputField.current?.focus();
  }, [searchInput, searchResult]);
  function handleKeyDownEvent(e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (e.key === 'Enter') {
      return navigate('/query');
    }
    return 1;
  }

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
      <StyledInputBase
        onKeyDown={(e) => handleKeyDownEvent(e)}
        key={id}
        inputRef={searchInputField}
        onBlur={() => setFocus(false)}
        id={id}
        onChange={onChange}
        value={searchInput}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}
