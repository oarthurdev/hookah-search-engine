import { useState } from 'react';
import { TextField, Stack, IconButton, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box sx={{
         width: "100%"
      }} >
      <TextField label="Pesquisar" value={searchTerm} onChange={handleSearchChange} />
      </Box>
      <IconButton color="primary" aria-label="Enviar" sx={{
          '&:hover': {
            backgroundColor: '#453421',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease-in',
        }} onClick={handleSearchSubmit}>
        <SendIcon />
      </IconButton>
    </Stack>
  );
}

export default SearchBar;