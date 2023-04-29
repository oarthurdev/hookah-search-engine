import { Typography } from '@mui/material';

function Footer() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      © {new Date().getFullYear()} Hookah Finder. Todos os direitos reservados.
    </Typography>
  );
}

export default Footer;