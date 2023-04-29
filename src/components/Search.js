import { useState } from 'react';
import { Grid, TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Define o valor inicial do state searchTerm com base no 'q' na URL
  useState(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('q')) {
      setSearchTerm(decodeURIComponent(params.get('q')));
    }
  }, [location]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      // Redireciona para a rota de resultados de pesquisa
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <img src="/narg-logo.png" alt="Google Logo" height={62} width={62} />
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
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Search;