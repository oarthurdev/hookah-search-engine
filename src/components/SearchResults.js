import { Box, Typography, Button, Link, Grid, Card, CardContent, CardMedia } from '@mui/material';

function SearchResults(props) {
  const { results } = props;

  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Box maxWidth="800px">
        {results.length > 0 ? (
          <>
            <Grid container spacing={2}>
              {results.map((result, index) => (
                <Grid item xs={12} key={result.id}>
                  <Card variant="outlined" sx={{ maxWidth: '1500px', width: '800px' }}>
                    <Box display="flex" alignItems="center" justifyContent="center" p={2}>
                      {result.image && (
                        <CardMedia
                          component="img"
                          image={result.image}
                          alt={result.title}
                          style={{
                            width: '200px',
                            height: '150px',
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      <Box ml={2}>
                        <CardContent>
                          <Link href={result.link} variant="subtitle1" underline="hover">
                            {result.title}
                          </Link>
                          <Typography variant="body2" sx={{ color: '#555555', mt: 1 }}>
                            {result.description}
                          </Typography>
                          <Box
                            display="flex"
                            alignItems="center"
                            color="#888888"
                            fontSize="12px"
                            fontWeight="bold"
                            mt={2}
                            justifyContent="center"
                          >
                            <Typography>{result.date}</Typography>
                            <Typography ml={1}>{result.author}</Typography>
                          </Box>
                        </CardContent>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" color="primary">
                Carregar mais resultados
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="h6" justifyContent="center" gutterBottom>
            Nenhum resultado encontrado
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default SearchResults;
