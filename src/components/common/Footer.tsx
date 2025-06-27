// src/components/common/Footer.tsx
import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: (theme) => theme.palette.grey[200] 
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          Algorithm Visualizer - Learn DSA Interactively
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <Link color="inherit" href="https://github.com/yourusername">
            Your Name
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;