// src/components/common/Footer.tsx
import React from 'react';
import { Box, Typography, Container, Link, IconButton, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 'auto',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 20%, rgba(94, 53, 177, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(57, 73, 171, 0.1) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: 6 }}>
          {/* Main Footer Content */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 4,
              mb: 4
            }}
          >
            {/* Brand Section */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(45deg, #5e35b1 0%, #3949ab 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '1.5rem'
                }}
              >
                Algorithm Visualizer
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 2,
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: '300px',
                  lineHeight: 1.6
                }}
              >
                Learn Data Structures and Algorithms through Interactive Visualizations
              </Typography>
              
              {/* Social Links */}
              <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <IconButton 
                  component={Link}
                  href="https://github.com/chan1525/Algorithm-visualizer"
                  target="_blank"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#fff',
                      borderColor: '#5e35b1',
                      backgroundColor: 'rgba(94, 53, 177, 0.2)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton 
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#fff',
                      borderColor: '#0077b5',
                      backgroundColor: 'rgba(0, 119, 181, 0.2)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#fff',
                      borderColor: '#ea4335',
                      backgroundColor: 'rgba(234, 67, 53, 0.2)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  <EmailIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Quick Links */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Sorting Algorithms', 'Graph Algorithms', 'Tree Structures', 'Search Algorithms'].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                      '&:hover': {
                        color: '#5e35b1',
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </Box>
            </Box>

            {/* Features */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                  color: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                Features
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Interactive Visualizations', 'Performance Analysis', 'Step-by-step Execution', 'Algorithm Comparison'].map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#3949ab'
                      }
                    }}
                  >
                    • {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />

          {/* Copyright Section */}
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              © {new Date().getFullYear()} Algorithm Visualizer. All rights reserved.
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: 'rgba(255, 255, 255, 0.6)'
              }}
            >
              <Typography variant="body2">
                Made with
              </Typography>
              <FavoriteIcon 
                sx={{ 
                  fontSize: '1rem', 
                  color: '#ff4757',
                  animation: 'heartbeat 1.5s infinite'
                }} 
              />
              <Typography variant="body2">
                by{' '}
                <Link 
                  href="https://github.com/chan1525/Algorithm-visualizer"
                  target="_blank"
                  sx={{
                    color: '#5e35b1',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#3949ab',
                      textShadow: '0 0 8px rgba(94, 53, 177, 0.5)'
                    }
                  }}
                >
                  Chann
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Add keyframe animations */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.2); }
            50% { transform: scale(1); }
            75% { transform: scale(1.1); }
          }
        `}
      </style>
    </Box>
  );
};

export default Footer;