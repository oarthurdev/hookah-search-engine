import { Box, Grid } from '@mui/material';
import Footer from './Footer';
import SearchBar from './SearchBar';

function Home() {
  const handleSearch = (searchTerm) => {
    console.log(`Searching for ${searchTerm}`);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px - 56px)' }}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <SearchBar onSearch={handleSearch} />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}

export default Home;