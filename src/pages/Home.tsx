// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SortIcon from '@mui/icons-material/Sort';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import SearchIcon from '@mui/icons-material/Search';

const algorithmCategories = [
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Visualize and compare sorting algorithms like Quicksort, Mergesort, and Heapsort.',
    icon: <SortIcon fontSize="large" />,
    examples: ['Quicksort', 'Mergesort', 'Heapsort', 'Bubble Sort'],
    color: '#6200ea' // Deep purple
  },
  {
    id: 'graph',
    title: 'Graph Algorithms',
    description: "Explore graph traversal and pathfinding algorithms like Dijkstra's, BFS, and DFS.",
    icon: <AccountTreeIcon fontSize="large" />,
    examples: ["Dijkstra's Algorithm", 'BFS', 'DFS'],
    color: '#2979ff' // Blue
  },
  {
    id: 'tree',
    title: 'Tree Structures',
    description: 'Learn about tree data structures including Binary Search Trees, AVL Trees.',
    icon: <StorageIcon fontSize="large" />,
    examples: ['Binary Search Tree', 'AVL Tree', 'Red-Black Tree'],
    color: '#00c853' // Green
  },
  {
    id: 'search',
    title: 'Search Algorithms',
    description: 'Visualize various search techniques and understand their efficiency.',
    icon: <SearchIcon fontSize="large" />,
    examples: ['Binary Search', 'Linear Search'],
    color: '#ff6d00' // Orange
  }
];

const Home: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 6 }}>
        <Paper 
          elevation={6} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            mb: 6, 
            borderRadius: '16px',
            background: `linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #5e35b1 100%)`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                          radial-gradient(circle at 40% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
              zIndex: 0,
            },
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                background: 'linear-gradient(45deg, #f3e5f5 0%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3
              }}
            >
              Interactive Algorithm Visualizer
            </Typography>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontWeight: 500,
                mb: 3,
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              Learn Data Structures and Algorithms through Interactive Visualizations
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                maxWidth: '800px', 
                lineHeight: 1.7,
                fontSize: '1.1rem',
                mb: 4,
                opacity: 0.9
              }}
            >
              This platform helps you understand complex algorithms through step-by-step 
              visualizations and real-time performance analysis. Perfect for students, 
              interview preparation, and algorithm enthusiasts.
            </Typography>
          </Box>
        </Paper>
        
        <Box id="algorithm-categories" sx={{ 
          scrollMarginTop: '80px', // For smooth scrolling with fixed header
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              mt: 8, 
              mb: 5, 
              fontWeight: 600,
              textAlign: 'center',
              position: 'relative',
              '&:after': {
                content: '""',
                display: 'block',
                width: '80px',
                height: '4px',
                background: 'linear-gradient(to right, #4a148c, #7b1fa2)',
                margin: '16px auto 0',
                borderRadius: '2px'
              }
            }}
          >
            Explore Algorithm Categories
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {algorithmCategories.map((category) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={category.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 8
                  }
                }}
              >
                <Box 
                  sx={{ 
                    p: 3, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    background: `linear-gradient(45deg, ${category.color} 30%, ${alpha(category.color, 0.8)} 90%)`,
                    color: 'white',
                    height: '120px'
                  }}
                >
                  <Box 
                    sx={{ 
                      transform: 'scale(1.5)',
                      transition: 'transform 0.3s ease',
                      '& > svg': { fontSize: '3rem' },
                      '.MuiSvgIcon-root': { 
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                      }
                    }}
                  >
                    {category.icon}
                  </Box>
                </Box>
                <CardContent 
                  sx={{ 
                    flexGrow: 1, 
                    p: 3,
                    bgcolor: alpha(theme.palette.background.paper, 0.9)
                  }}
                >
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: category.color
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {category.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.secondary
                      }}
                    >
                      Examples:
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontStyle: 'italic'
                      }}
                    >
                      {category.examples.join(', ')}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    padding: '16px',
                    width: '100%',
                    bgcolor: alpha(theme.palette.background.paper, 0.9)
                  }}
                >
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to={`/algorithm/${category.id}`}
                    sx={{ 
                      py: 1.5,
                      px: 4,
                      borderRadius: '30px',
                      background: `linear-gradient(45deg, ${category.color} 30%, ${alpha(category.color, 0.8)} 90%)`,
                      color: 'white',
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      boxShadow: `0 4px 20px ${alpha(category.color, 0.4)}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 6px 25px ${alpha(category.color, 0.6)}`,
                        transform: 'translateY(-3px)'
                      },
                      minWidth: '180px'
                    }}
                  >
                    Explore
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            mt: 8, 
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              textAlign: 'center',
              mb: 4,
              position: 'relative',
              '&:after': {
                content: '""',
                display: 'block',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(to right, #4a148c, #7b1fa2)',
                margin: '16px auto 0',
                borderRadius: '2px'
              }
            }}
          >
            Why Visualize Algorithms?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Enhanced Learning',
                description: 'Seeing algorithms in action helps you understand complex concepts more intuitively than text descriptions alone.',
                icon: '🧠',
              },
              {
                title: 'Compare Performance',
                description: 'Analyze real-time metrics to understand big O notation and performance tradeoffs between different algorithms.',
                icon: '📊',
              },
              {
                title: 'Interview Preparation',
                description: 'Strengthen your understanding of DSA fundamentals to excel in technical interviews at top companies.',
                icon: '💼',
              }
            ].map((item, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: '3rem', 
                      mb: 2,
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}
                  >
                    {item.icon}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: theme.palette.primary.main
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{
                      lineHeight: 1.7,
                      color: theme.palette.text.secondary
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;