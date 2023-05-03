import { useMemo } from 'react';
import { COPYRIGHT_STRING } from '../utils/constants';
import Typography from '@mui/material/Typography';

function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer>
      <Typography variant="body2" color="text.secondary" align="center">  
          {`© ${currentYear} ${COPYRIGHT_STRING}`}
      </Typography>
    </footer>
  );
}

export default Footer;