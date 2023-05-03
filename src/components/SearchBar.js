import { useState, useCallback , useMemo} from 'react';
import { TextField, Stack, Box } from '@mui/material';
import SearchButton from './SearchButton';
import Logo from './Logo';
import Header from './Header';
// import './SearchBar.scss';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchQuery = useMemo(() => `?q=${encodeURIComponent(searchTerm)}`, [searchTerm]);

  const handleSearchSubmit = useCallback(() => {
    if (searchTerm.trim() !== '') {
      window.location.href = `/search${searchQuery}`
    }
  }, [searchTerm]);

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
      <Header />
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
          sx={{
            width: '1000px',
            flexGrow: 1,
            maxWidth: { sm: '600px', md: '1000px' },
          }}
          fullWidth
        />
        <SearchButton onClick={handleSearchSubmit} />
      </Stack>
    </div>
  );
}

export default SearchBar;