import React, { memo } from 'react';
import { Box, Grid } from '@mui/material';
import Footer from './Footer';
import SearchBar from './SearchBar';

const MemoizedFooter = memo(Footer);
const MemoizedSearchBar = memo(SearchBar);

function SearchPage() {
  const handleSearch = (searchTerm) => {
    console.log(`Searching for ${searchTerm}`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px - 56px)' }}>
        <Grid container direction="column" alignItems="center" >
          <Grid item>
            <MemoizedSearchBar onSearch={handleSearch} />
          </Grid>
        </Grid>
      </Box>
      <MemoizedFooter />
    </>
  );
}

export default SearchPage;