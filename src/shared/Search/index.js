import SearchIcon from '@mui/icons-material/Search';

import {
  Search,
  StyledInputBase,
  SearchIconWrapper,
  SearchSmall,
} from './styles';

const SearchNav = ({ variant, onInputHandler }) => {
  const onChangeHandler = (event) => {
    onInputHandler(event.target.value);
  };
  if (variant === 'small') {
    return (
      <SearchSmall>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </SearchSmall>
    );
  }
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={onChangeHandler}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchNav;
