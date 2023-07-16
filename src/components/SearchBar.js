import { useState, useCallback , useMemo} from 'react';
import { TextField, Stack, Box } from '@mui/material';
import SearchButton from './SearchButton';
import Logo from './Logo';
import { SearchBarStyle } from './styles/SearchBar';
import { useNavigate } from 'react-router-dom';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const classes = SearchBarStyle()
  const searchQuery = useMemo(() => `?q=${encodeURIComponent(searchTerm)}`, [searchTerm]);
  const navigate = useNavigate();

  const handleSearchSubmit = useCallback(() => {
    if (searchTerm.trim() !== '') {
      navigate(`/search${searchQuery}`);
    }
  }, [searchTerm, navigate]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div style={{ paddingTop: '0px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '20px' }}>
        <Logo />
      </Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ marginTop: '100px' }}
      >
        <TextField
          variant="outlined"
          type="search"
          size="larger"
          label="Search for a narguile product"
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          value={searchTerm}
          className={classes.inputSearch}
          fullWidth
        />
        <SearchButton onClick={handleSearchSubmit} />
      </Stack>
    </div>
  );
}

export default SearchBar;