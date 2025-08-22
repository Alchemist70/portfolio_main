import React from 'react';
import { Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, md: 6 },
          borderRadius: 6,
          background: 'linear-gradient(120deg, #7c3aed 0%, #00bcd4 100%)',
          color: '#fff',
          boxShadow: '0 8px 32px 0 rgba(60, 72, 88, 0.18)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 900, letterSpacing: 2, textShadow: '0 2px 16px rgba(0,0,0,0.18)' }}>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="#e0e0e0" paragraph align="center" sx={{ mb: 4, maxWidth: 500 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/')}
          sx={{ borderRadius: 8, fontWeight: 700, px: 4, py: 1.5, fontSize: '1.1rem', background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)' }}
        >
          Go to Homepage
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound; 