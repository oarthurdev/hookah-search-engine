import { Box, Container, Grid } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import SearchBar from './SearchBar';

function Home() {
  const handleSearch = (searchTerm) => {
    console.log(`Searching for ${searchTerm}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px - 56px)' }}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <SearchBar onSearch={handleSearch} />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}

export default Home;