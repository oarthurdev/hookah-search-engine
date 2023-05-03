import { useState, useCallback } from 'react';
import { Button, Modal, Box, TextField, Typography, IconButton, Grid } from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';

function Header(props) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOpen = useCallback(() => {
        setOpen(true);
      }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = () => {
    // Lógica de autenticação aqui
    handleClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLoginSubmit();
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const loginButtonStyle = {
    position: 'fixed',
    top: '12px',
    right: '12px',
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} sx={loginButtonStyle}>
        Login
      </Button>
      <Modal open={open} onClose={handleClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={style}>
        <Typography variant="h6">Login</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                label="Email"
                size="medium"
                value={email}
                onChange={handleEmailChange}
                fullWidth
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                label="Password"
                size="medium"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onKeyPress={handleKeyPress}
                fullWidth
            />
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" onClick={handleLoginSubmit} fullWidth>
                Login
            </Button>
            </Grid>
            <Grid item xs={12}>
            <Button variant="outlined" onClick={handleLoginSubmit} fullWidth>
                Register
            </Button>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">
                Or login with:
            </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton color="primary" aria-label="Google login">
                <Google />
            </IconButton>
            <IconButton color="primary" aria-label="Facebook login">
                <Facebook />
            </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default Header;