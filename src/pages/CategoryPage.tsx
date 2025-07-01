// src/pages/CategoryPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  CircularProgress, 
  Alert,
  Paper,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { getAlgorithmsByType, AlgorithmConfig } from '../services/db';
import SortIcon from '@mui/icons-material/Sort';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TimelineIcon from '@mui/icons-material/Timeline';
import SpeedIcon from '@mui/icons-material/Speed';

const CategoryPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [algorithms, setAlgorithms] = useState<AlgorithmConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  // In src/pages/CategoryPage.tsx - update the useEffect hook
  useEffect(() => {
    const fetchAlgorithms = async () => {
      if (!type) {
        setError('Invalid category type');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const algorithmsData = await getAlgorithmsByType(type);
        
        if (algorithmsData && algorithmsData.length > 0) {
          // Filter out duplicates based on algorithm name
          const uniqueAlgorithms = [];
          const algorithmNames = new Set();
          
          for (const algo of algorithmsData) {
            if (!algorithmNames.has(algo.name)) {
              algorithmNames.add(algo.name);
              uniqueAlgorithms.push(algo);
            }
          }
          
          setAlgorithms(uniqueAlgorithms);
          setError(null);
        } else {
          setError('No algorithms found for this category');
        }
      } catch (err) {
        console.error('Error fetching algorithms:', err);
        setError('Failed to load algorithms');
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithms();
  }, [type]);

  const getCategoryConfig = (typeStr: string) => {
    switch (typeStr) {
      case 'sorting':
        return {
          title: 'Sorting Algorithms',
          icon: <SortIcon fontSize="large" />,
          color: '#6200ea',
          description: 'Explore different sorting techniques and their performance characteristics',
          gradient: 'linear-gradient(135deg, #6200ea 0%, #9c27b0 100%)'
        };
      case 'graph':
        return {
          title: 'Graph Algorithms',
          icon: <AccountTreeIcon fontSize="large" />,
          color: '#2979ff',
          description: 'Navigate through graph traversal and pathfinding algorithms',
          gradient: 'linear-gradient(135deg, #2979ff 0%, #3f51b5 100%)'
        };
      case 'tree':
        return {
          title: 'Tree Data Structures',
          icon: <StorageIcon fontSize="large" />,
          color: '#00c853',
          description: 'Learn about hierarchical data structures and tree operations',
          gradient: 'linear-gradient(135deg, #00c853 0%, #4caf50 100%)'
        };
      case 'search':
        return {
          title: 'Search Algorithms',
          icon: <SearchIcon fontSize="large" />,
          color: '#ff6d00',
          description: 'Discover various search techniques and optimization strategies',
          gradient: 'linear-gradient(135deg, #ff6d00 0%, #ff9800 100%)'
        };
      default:
        return {
          title: typeStr.charAt(0).toUpperCase() + typeStr.slice(1) + ' Algorithms',
          icon: <TimelineIcon fontSize="large" />,
          color: '#1976d2',
          description: 'Explore algorithm implementations and visualizations',
          gradient: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)'
        };
    }
  };

  const categoryConfig = getCategoryConfig(type || '');

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        <CircularProgress 
          size={60} 
          sx={{ 
            color: categoryConfig.color,
            mb: 3
          }} 
        />
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary',
            textAlign: 'center'
          }}
        >
          Loading algorithms...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(244, 67, 54, 0.1)',
            '& .MuiAlert-icon': {
              fontSize: '2rem'
            }
          }}
        >
          <Typography variant="h6" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1">
            {error}
          </Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 80%, ${alpha(categoryConfig.color, 0.1)} 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, ${alpha(categoryConfig.color, 0.05)} 0%, transparent 50%)`,
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: 6 }}>
          {/* Header Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 6 }, 
              mb: 6, 
              borderRadius: '24px',
              background: categoryConfig.gradient,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `0 20px 40px ${alpha(categoryConfig.color, 0.3)}`,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 70% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
                pointerEvents: 'none'
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box 
                  sx={{ 
                    p: 2,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {categoryConfig.icon}
                </Box>
                <Box>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      fontSize: { xs: '2rem', md: '3rem' }
                    }}
                  >
                    {categoryConfig.title}
                  </Typography>
                  <Chip 
                    label={`${algorithms.length} Algorithms Available`}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}
                  />
                </Box>
              </Box>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  opacity: 0.95,
                  lineHeight: 1.6,
                  maxWidth: '800px'
                }}
              >
                {categoryConfig.description}
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  opacity: 0.9,
                  lineHeight: 1.7,
                  maxWidth: '700px'
                }}
              >
                Click on any algorithm below to see step-by-step visualizations, analyze performance metrics, 
                and understand the underlying concepts through interactive demonstrations.
              </Typography>
            </Box>
          </Paper>
          
          {/* Algorithms Grid */}
          <Grid container spacing={4}>
            {algorithms.map((algorithm, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={algorithm.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: categoryConfig.gradient,
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease'
                    },
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: `0 20px 60px ${alpha(categoryConfig.color, 0.2)}`,
                      '&::before': {
                        transform: 'scaleX(1)'
                      }
                    },
                    animation: `slideUp 0.6s ease forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                    transform: 'translateY(30px)'
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          p: 1.5,
                          borderRadius: '12px',
                          background: alpha(categoryConfig.color, 0.1),
                          mr: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <SpeedIcon sx={{ color: categoryConfig.color, fontSize: '1.5rem' }} />
                      </Box>
                      <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="h2"
                        sx={{
                          fontWeight: 700,
                          color: categoryConfig.color,
                          mb: 0
                        }}
                      >
                        {algorithm.name}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        mb: 2
                      }}
                    >
                      {algorithm.description}
                    </Typography>

                    {/* Mock complexity info */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip 
                        label="Interactive"
                        size="small"
                        sx={{
                          backgroundColor: alpha(categoryConfig.color, 0.1),
                          color: categoryConfig.color,
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                      <Chip 
                        label="Step-by-step"
                        size="small"
                        sx={{
                          backgroundColor: alpha('#4caf50', 0.1),
                          color: '#4caf50',
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button 
                      component={Link} 
                      to={`/algorithm/${type}/${algorithm.id}`}
                      variant="contained"
                      fullWidth
                      startIcon={<PlayArrowIcon />}
                      sx={{ 
                        py: 1.5,
                        borderRadius: '12px',
                        background: categoryConfig.gradient,
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: `0 4px 20px ${alpha(categoryConfig.color, 0.3)}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 8px 30px ${alpha(categoryConfig.color, 0.4)}`,
                          background: categoryConfig.gradient
                        }
                      }}
                    >
                      Start Visualization
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Empty State */}
          {algorithms.length === 0 && !loading && !error && (
            <Paper 
              sx={{ 
                p: 6, 
                textAlign: 'center',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Box 
                sx={{ 
                  fontSize: '4rem',
                  mb: 2,
                  opacity: 0.5
                }}
              >
                🔍
              </Box>
              <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary' }}>
                No algorithms found
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                This category is currently being developed. Check back soon for new algorithms!
              </Typography>
            </Paper>
          )}
        </Box>
      </Container>

      <style>
        {`
          @keyframes slideUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default CategoryPage;