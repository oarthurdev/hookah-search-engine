import { useCallback, useState, useEffect } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';
import { debounce } from 'lodash';
import ElasticSearch from './SearchElastic';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('q')) {
      setSearchTerm(decodeURIComponent(params.get('q')));
    }
  }, [location]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSearchSubmit = debounce((searchTerm) => {
    if (typeof searchTerm === 'string' && searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  }, 500);

  const results = ElasticSearch({ searchTerm });

  return (
    <Box sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <a href="/">
          <img
            src="/narg-logo.png"
            alt="Hookah Finder Logo"
            height={62}
            width={62}
          />
        </a>
        <Box ml={2} flexGrow={1}>
          <TextField
            id="search-input"
            placeholder="Pesquisar no Hookah Finder"
            sx={{
              width: '40%',
            }}
            variant="outlined"
            size="medium"
            value={searchTerm}
            onKeyPress={(event) =>
              event.key === 'Enter' && handleSearchSubmit(searchTerm)
            }
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => handleSearchSubmit(searchTerm)}>
                  <SearchIcon />
                </IconButton>
              ),
              inputProps: {
                maxLength: 100,
              },
            }}
          />
        </Box>
      </Box>
      <SearchResults results={results} />
    </Box>
  );
}

export default Search;