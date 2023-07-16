import { useCallback, useState, useEffect } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';
import { debounce } from 'lodash';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
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

  const ELASTIC_SEARCH_URL = process.env.REACT_APP_ELASTIC_SEARCH_URL;
  const SEARCH_INDEX_NAME = process.env.REACT_APP_SEARCH_INDEX_NAME;
  const USERNAME = process.env.REACT_APP_ELASTIC_USERNAME;
  const PASSWORD = process.env.REACT_APP_ELASTIC_PASSWORD;

  const axiosInstance = axios.create({
    baseURL: ELASTIC_SEARCH_URL,
    auth: {
      username: USERNAME,
      password: PASSWORD,
    },
  });

  const handleSearchSubmit = debounce(async (searchTerm) => {
    if (typeof searchTerm === 'string' && searchTerm.trim() !== '') {
      try {
        const response = await axiosInstance.get(`${ELASTIC_SEARCH_URL}/${SEARCH_INDEX_NAME}/_search`, {
          params: {
            q: searchTerm,
          },
        });

        const hits = response.data.hits.hits;
        const formattedResults = hits.map((hit) => ({
          title: hit._source.name,
          description: hit._source.description,
          link: hit._source.link,
          image: hit._source.image,
        }));
        setResults(formattedResults);
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      } catch (error) {
        console.error('Error searching documents:', error);
      }
    }
  }, 500);

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