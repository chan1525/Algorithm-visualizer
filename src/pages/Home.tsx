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
  Paper
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
    examples: ['Quicksort', 'Mergesort', 'Heapsort', 'Bubble Sort']
  },
  {
    id: 'graph',
    title: 'Graph Algorithms',
    description: "Explore graph traversal and pathfinding algorithms like Dijkstra's, A*, BFS, and DFS.",
    icon: <AccountTreeIcon fontSize="large" />,
    examples: ["Dijkstra's Algorithm", 'A* Search', 'BFS', 'DFS']
  },
  {
    id: 'tree',
    title: 'Tree Structures',
    description: 'Learn about tree data structures including Binary Search Trees, AVL Trees, and Heaps.',
    icon: <StorageIcon fontSize="large" />,
    examples: ['Binary Search Tree', 'AVL Tree', 'Red-Black Tree', 'Binary Heap']
  },
  {
    id: 'search',
    title: 'Search Algorithms',
    description: 'Visualize various search techniques and understand their efficiency.',
    icon: <SearchIcon fontSize="large" />,
    examples: ['Binary Search', 'Linear Search', 'Jump Search', 'Interpolation Search']
  }
];

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 4, 
            backgroundImage: 'linear-gradient(to right, #4a148c, #7b1fa2)',
            color: 'white'
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Interactive Algorithm Visualizer
          </Typography>
          <Typography variant="h5" gutterBottom>
            Learn Data Structures and Algorithms through Interactive Visualizations
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: '800px' }}>
            This platform helps you understand complex algorithms through step-by-step 
            visualizations and real-time performance analysis. Perfect for students, 
            interview preparation, and algorithm enthusiasts.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="secondary" 
              component={Link} 
              to="/algorithm/sorting/quicksort"
              size="large"
              sx={{ mr: 2 }}
            >
              Start Visualizing
            </Button>
            <Button 
              variant="outlined" 
              color="inherit" 
              component={Link} 
              to="/register"
              size="large"
            >
              Create Account
            </Button>
          </Box>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 3 }}>
          Explore Algorithm Categories
        </Typography>
        
        <Grid container spacing={4}>
          {algorithmCategories.map((category) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={category.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ 
                  p: 2, 
                  display: 'flex', 
                  justifyContent: 'center', 
                  bgcolor: 'primary.light',
                  color: 'white'
                }}>
                  {category.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {category.title}
                  </Typography>
                  <Typography>
                    {category.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="primary">
                      Examples:
                    </Typography>
                    <Typography variant="body2">
                      {category.examples.join(', ')}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to={`/algorithm/${category.id}`}
                  >
                    Explore
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ p: 4, mt: 6, bgcolor: 'background.paper' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Why Visualize Algorithms?
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                Enhanced Learning
              </Typography>
              <Typography variant="body1">
                Seeing algorithms in action helps you understand complex concepts more intuitively than text descriptions alone.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                Compare Performance
              </Typography>
              <Typography variant="body1">
                Analyze real-time metrics to understand big O notation and performance tradeoffs between different algorithms.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                Interview Preparation
              </Typography>
              <Typography variant="body1">
                Strengthen your understanding of DSA fundamentals to excel in technical interviews at top companies.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;