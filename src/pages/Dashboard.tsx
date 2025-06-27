// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Tabs, 
  Tab, 
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import Grid from '@mui/material/Grid';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../context/AuthContext';
import { getAlgorithmsByType, getUserPerformanceHistory, AlgorithmConfig, PerformanceResult } from '../services/db';

// Component for the history tab
const HistoryTab: React.FC<{ history: PerformanceResult[] }> = ({ history }) => {
  if (history.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">
          No algorithm execution history yet. Try running some algorithms!
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      {history.map((result) => (
        <ListItem key={result.id} divider>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText 
            primary={`Algorithm: ${result.algorithmId}`} 
            secondary={`Execution Time: ${result.executionTimeMs}ms • Memory: ${(result.memoryUsageBytes / 1024).toFixed(2)} KB • ${new Date(result.timestamp).toLocaleDateString()}`} 
          />
          <Button 
            variant="outlined" 
            size="small"
            component={Link}
            to={`/algorithm/${result.algorithmId}`}
          >
            View
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

// Component for favorites tab
const FavoritesTab: React.FC = () => {
  // In a real app, you would load favorites from Firestore
  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography color="text.secondary">
        You haven't saved any algorithms as favorites yet.
      </Typography>
    </Box>
  );
};

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [recentAlgorithms, setRecentAlgorithms] = useState<AlgorithmConfig[]>([]);
  const [history, setHistory] = useState<PerformanceResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get some algorithms to display
        const sortingAlgorithms = await getAlgorithmsByType('sorting');
        const graphAlgorithms = await getAlgorithmsByType('graph');
        
        // Combine and take first few
        const allAlgorithms = [...sortingAlgorithms, ...graphAlgorithms];
        setRecentAlgorithms(allAlgorithms.slice(0, 4));
        
        // Get user history if logged in
        if (currentUser) {
          const userHistory = await getUserPerformanceHistory(currentUser.uid);
          setHistory(userHistory);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentUser]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Dashboard
        </Typography>
        
        <Typography variant="body1" paragraph>
          Welcome back{currentUser?.email ? `, ${currentUser.email}` : ''}! 
          Track your progress, view your algorithm execution history, and continue learning.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={2}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="History" />
                <Tab label="Favorites" />
              </Tabs>
              <Divider />
              <Box sx={{ p: 2 }}>
                {tabValue === 0 && <HistoryTab history={history} />}
                {tabValue === 1 && <FavoritesTab />}
              </Box>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Stats
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                Algorithms Executed: {history.length}
              </Typography>
              <Typography variant="body2" paragraph>
                Favorite Algorithms: 0
              </Typography>
              <Typography variant="body2">
                Account Created: {currentUser?.metadata.creationTime ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : 'N/A'}
              </Typography>
            </Paper>
            
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Continue Learning
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                {recentAlgorithms.map((algo) => (
                  <ListItem key={algo.id} divider>
                    <ListItemText 
                      primary={algo.name} 
                      secondary={`Category: ${algo.type}`} 
                    />
                    <Button 
                      variant="outlined" 
                      size="small" 
                      component={Link} 
                      to={`/algorithm/${algo.type}/${algo.id}`}
                    >
                      View
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;