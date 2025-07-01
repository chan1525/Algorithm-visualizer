// src/pages/Algorithm.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Button,
  Divider,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  alpha,
  useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { getAlgorithm, getAlgorithmsByType, AlgorithmConfig } from '../services/db';
import { useAuth } from '../context/AuthContext';

// Import icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';
import InfoIcon from '@mui/icons-material/Info';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SpeedIcon from '@mui/icons-material/Speed';
import MemoryIcon from '@mui/icons-material/Memory';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TimelineIcon from '@mui/icons-material/Timeline';

// Import visualizers
import SortingVisualizer from '../components/visualizers/sorting/SortingVisualizer';
import GraphVisualizer from '../components/visualizers/graph/GraphVisualizer';
import TreeVisualizer from '../components/visualizers/tree/TreeVisualizer';
import SearchVisualizer from '../components/visualizers/search/SearchVisualizer';

import SortingCodes from '../algorithmCodes/sorting';
import GraphCodes from '../algorithmCodes/graph';
import TreeCodes from '../algorithmCodes/tree';
import SearchCodes from '../algorithmCodes/search';

import SortingExplanations from '../algorithmExplanations/sorting';
import GraphExplanations from '../algorithmExplanations/graph';
import TreeExplanations from '../algorithmExplanations/tree';
import SearchExplanations from '../algorithmExplanations/search';

import SortingRelatedAlgorithms from '../algorithmRelated/sorting';
import GraphRelatedAlgorithms from '../algorithmRelated/graph';
import TreeRelatedAlgorithms from '../algorithmRelated/tree';
import SearchRelatedAlgorithms from '../algorithmRelated/search';

// Import performance components
import PerformanceMetrics from '../components/analytics/PerformanceMetrics';
import AlgorithmControls from '../components/common/AlgorithmControls';

const Algorithm: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [algorithm, setAlgorithm] = useState<AlgorithmConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [codeLanguage, setCodeLanguage] = useState<'javascript' | 'python' | 'java' | 'cpp'>('javascript');
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser } = useAuth();
  const theme = useTheme();
  const [performanceData, setPerformanceData] = useState({
    executionTime: 0,
    memoryUsage: 0,
    comparisons: 0,
    swaps: 0
  });

  useEffect(() => {
    const fetchAlgorithm = async () => {
      try {
        setLoading(true);

        let algorithmData;

        if (id) {
          // Fetch specific algorithm by ID
          algorithmData = await getAlgorithm(id);
        } else if (type) {
          // If no ID but type is provided, fetch first algorithm of that type
          const algorithms = await getAlgorithmsByType(type as string);
          if (algorithms && algorithms.length > 0) {
            algorithmData = algorithms[0];
          }
        }

        if (algorithmData) {
          setAlgorithm(algorithmData);
        } else {
          setError('Algorithm not found');
        }
      } catch (err) {
        console.error('Error fetching algorithm:', err);
        setError('Failed to load algorithm data');
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithm();
  }, [id, type]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getCategoryConfig = (typeStr: string) => {
    switch (typeStr) {
      case 'sorting':
        return { color: '#6200ea', gradient: 'linear-gradient(135deg, #6200ea 0%, #9c27b0 100%)' };
      case 'graph':
        return { color: '#2979ff', gradient: 'linear-gradient(135deg, #2979ff 0%, #3f51b5 100%)' };
      case 'tree':
        return { color: '#00c853', gradient: 'linear-gradient(135deg, #00c853 0%, #4caf50 100%)' };
      case 'search':
        return { color: '#ff6d00', gradient: 'linear-gradient(135deg, #ff6d00 0%, #ff9800 100%)' };
      default:
        return { color: '#1976d2', gradient: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)' };
    }
  };

  const categoryConfig = getCategoryConfig(type || '');

  // Render loading state
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
          Loading algorithm...
        </Typography>
      </Box>
    );
  }

  // Render error state
  if (error || !algorithm) {
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
            Algorithm Not Found
          </Typography>
          <Typography variant="body1">
            {error || 'The requested algorithm could not be loaded.'}
          </Typography>
        </Alert>
      </Container>
    );
  }

  // Render the appropriate visualizer based on algorithm type
  const renderVisualizer = () => {
    const handlePerformanceUpdate = (metrics: any) => {
      setPerformanceData(metrics);
    };

    switch (type) {
      case 'sorting':
        return <SortingVisualizer
          algorithm={algorithm}
          onPerformanceUpdate={handlePerformanceUpdate}
        />;
      case 'graph':
        return <GraphVisualizer 
          algorithm={algorithm} 
          onPerformanceUpdate={handlePerformanceUpdate}
        />;
      case 'tree':
        return <TreeVisualizer 
          algorithm={algorithm}
          onPerformanceUpdate={handlePerformanceUpdate}
        />;
      case 'search':
        return <SearchVisualizer algorithm={algorithm}
          onPerformanceUpdate={handlePerformanceUpdate} />;
      default:
        return <Typography color="error">Unsupported algorithm type</Typography>;
    }
  };

  const getAlgorithmExplanation = () => {
    if (!algorithm) return null;

    if (algorithm.type === 'sorting' && SortingExplanations[algorithm.name]) {
      const ExplanationComponent = SortingExplanations[algorithm.name];
      return <ExplanationComponent />;
    }

    if (algorithm.type === 'graph' && GraphExplanations[algorithm.name]) {
      const ExplanationComponent = GraphExplanations[algorithm.name];
      return <ExplanationComponent />;
    }

    if (algorithm.type === 'tree' && TreeExplanations[algorithm.name]) {
      const ExplanationComponent = TreeExplanations[algorithm.name];
      return <ExplanationComponent />;
    }

    if (algorithm.type === 'search' && SearchExplanations[algorithm.name]) {
      const ExplanationComponent = SearchExplanations[algorithm.name];
      return <ExplanationComponent />;
    }

    return <p>No detailed explanation available for this algorithm.</p>;
  };

  const getRelatedAlgorithms = () => {
    if (!algorithm) return [];

    if (algorithm.type === 'sorting') {
      return SortingRelatedAlgorithms[algorithm.name] || [];
    }

    if (algorithm.type === 'graph' && algorithm.name in GraphRelatedAlgorithms) {
      return GraphRelatedAlgorithms[algorithm.name] || [];
    }

    if (algorithm.type === 'tree' && algorithm.name in TreeRelatedAlgorithms) {
      return TreeRelatedAlgorithms[algorithm.name] || [];
    }

    if (algorithm.type === 'search' && algorithm.name in SearchRelatedAlgorithms) {
      return SearchRelatedAlgorithms[algorithm.name] || [];
    }

    return [];
  };

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
                      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: 4 }}>
          {/* Header Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, md: 4 }, 
              mb: 4, 
              borderRadius: '20px',
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
                background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                pointerEvents: 'none'
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Chip 
                      label={algorithm.type.toUpperCase()}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: 600,
                        mr: 2
                      }}
                    />
                    <TimelineIcon sx={{ mr: 1 }} />
                  </Box>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      fontSize: { xs: '2rem', md: '3rem' }
                    }}
                  >
                    {algorithm.name}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      opacity: 0.95,
                      lineHeight: 1.6,
                      maxWidth: '800px'
                    }}
                  >
                    {algorithm.description}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                  <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                    <IconButton
                      onClick={() => setIsFavorite(!isFavorite)}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share algorithm">
                    <IconButton
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          transform: 'scale(1.1)'
                        }
                      }}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Paper>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              {/* Visualizer Section */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  mb: 4, 
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: categoryConfig.gradient,
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PlayArrowIcon sx={{ mr: 2, color: categoryConfig.color, fontSize: '2rem' }} />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 600,
                      color: categoryConfig.color
                    }}
                  >
                    Live Visualization
                  </Typography>
                </Box>
                <Box sx={{ minHeight: '400px', position: 'relative' }}>
                  {renderVisualizer()}
                </Box>
              </Paper>

              {/* Tabs Section */}
              <Paper 
                elevation={0}
                sx={{ 
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden'
                }}
              >
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange}
                  sx={{
                    background: alpha(categoryConfig.color, 0.05),
                    '& .MuiTab-root': {
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      minHeight: '60px',
                      '&.Mui-selected': {
                        color: categoryConfig.color
                      }
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: categoryConfig.color,
                      height: '3px'
                    }
                  }}
                >
                  <Tab 
                    icon={<AnalyticsIcon />} 
                    label="Performance" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<CodeIcon />} 
                    label="Code" 
                    iconPosition="start"
                  />
                  <Tab 
                    icon={<InfoIcon />} 
                    label="Explanation" 
                    iconPosition="start"
                  />
                </Tabs>
                
                <Box sx={{ p: 3 }}>
                  {tabValue === 0 && (
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ color: categoryConfig.color, fontWeight: 600 }}>
                        Performance Analytics
                      </Typography>
                      <PerformanceMetrics
                        algorithm={algorithm}
                        performanceData={performanceData}
                      />
                    </Box>
                  )}
                  
                  {tabValue === 1 && (
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ color: categoryConfig.color, fontWeight: 600, mb: 3 }}>
                        Implementation Code
                      </Typography>
                      <Tabs
                        value={codeLanguage}
                        onChange={(e, newValue) => setCodeLanguage(newValue)}
                        sx={{ 
                          mb: 3,
                          '& .MuiTab-root': {
                            minHeight: '40px',
                            textTransform: 'none',
                            fontWeight: 500
                          }
                        }}
                      >
                        <Tab label="JavaScript" value="javascript" />
                        <Tab label="Python" value="python" />
                        <Tab label="Java" value="java" />
                        <Tab label="C++" value="cpp" />
                      </Tabs>

                      <Paper 
                        sx={{ 
                          p: 3, 
                          backgroundColor: '#1e1e1e',
                          borderRadius: '12px',
                          overflow: 'auto',
                          border: `2px solid ${alpha(categoryConfig.color, 0.3)}`
                        }}
                      >
                        <Box 
                          component="pre" 
                          sx={{ 
                            margin: 0,
                            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                            fontSize: '0.9rem',
                            lineHeight: 1.6,
                            color: '#f8f8f2'
                          }}
                        >
                          <code>
                            {algorithm.type === 'sorting' && SortingCodes[algorithm.name] &&
                              SortingCodes[algorithm.name][codeLanguage]}

                            {algorithm.type === 'graph' && GraphCodes[algorithm.name] &&
                              GraphCodes[algorithm.name][codeLanguage]}

                            {algorithm.type === 'tree' && TreeCodes[algorithm.name] &&
                              TreeCodes[algorithm.name][codeLanguage]}

                            {algorithm.type === 'search' && SearchCodes[algorithm.name] &&
                              SearchCodes[algorithm.name][codeLanguage]}
                          </code>
                        </Box>
                      </Paper>
                    </Box>
                  )}
                  
                  {tabValue === 2 && (
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ color: categoryConfig.color, fontWeight: 600, mb: 3 }}>
                        Algorithm Explanation
                      </Typography>
                      <Typography variant="body1" component="div" sx={{ lineHeight: 1.8 }}>
                        {getAlgorithmExplanation()}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Algorithm;