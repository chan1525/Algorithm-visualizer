// src/components/common/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, alpha } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import AlgorithmIcon from '@mui/icons-material/Analytics';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5e35b1 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Toolbar sx={{ position: 'relative', zIndex: 1, minHeight: '80px', py: 2 }}>
        <Box 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            alignItems: 'center',
            gap: 2
          }}
        >
          <AlgorithmIcon 
            sx={{ 
              fontSize: '2rem',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              animation: 'pulse 2s infinite'
            }} 
          />
          <Typography 
            variant="h6" 
            component="div"
            sx={{
              fontWeight: 700,
              fontSize: '1.4rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              background: 'linear-gradient(45deg, #ffffff 0%, #e8eaf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '& a': {
                color: 'inherit',
                textDecoration: 'none'
              }
            }}
          >
            <Link to="/">
              Algorithm Visualizer
            </Link>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {currentUser ? (
            <Button 
              color="inherit" 
              onClick={handleLogout}
              sx={{
                px: 3,
                py: 1,
                borderRadius: '25px',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.6)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: '25px',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.5s',
                  },
                  '&:hover::before': {
                    left: '100%'
                  }
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/register"
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: '25px',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;