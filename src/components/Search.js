import { useCallback, useState, useEffect, useMemo } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';
import { debounce } from 'lodash';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Define o valor inicial do state searchTerm com base no 'q' na URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('q')) {
      setSearchTerm(decodeURIComponent(params.get('q')));
    }
  }, [location]);

  const validatedSearchTerm = useMemo(() => searchTerm.replace(/[^\w\s]/gi, ''), [searchTerm])
  
  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);
  
  const handleSearchSubmit = useCallback(
    debounce(() => {
      if (validatedSearchTerm.trim() !== '') {
        navigate(`/search?q=${encodeURIComponent(validatedSearchTerm)}`);
      }
    }, 500),
    [searchTerm, navigate]
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <img src="/narg-logo.png" alt="Google Logo" height={62} width={62} 
             onClick={() => window.location.href = "/"}
             style={{
              cursor: "pointer",
              '&:hover': { cursor: "pointer" }
             }}
        />
        <Box ml={2} flexGrow={1}>
          <TextField
            id="search-input"
            placeholder="Pesquisar no Google"
            sx={{
              width: "40%"
            }}
            variant="outlined"
            size="medium"
            value={searchTerm}
            onKeyPress={(event) => event.key === 'Enter' && handleSearchSubmit()}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearchSubmit}>
                  <SearchIcon />
                </IconButton>
              ),
              inputProps: {
                maxLength: 100 // example value
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Search;