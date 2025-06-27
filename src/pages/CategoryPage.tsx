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
  Alert
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { getAlgorithmsByType, AlgorithmConfig } from '../services/db';

const CategoryPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [algorithms, setAlgorithms] = useState<AlgorithmConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          setAlgorithms(algorithmsData);
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

  const getTypeTitle = (typeStr: string) => {
    switch (typeStr) {
      case 'sorting':
        return 'Sorting Algorithms';
      case 'graph':
        return 'Graph Algorithms';
      case 'tree':
        return 'Tree Data Structures';
      case 'search':
        return 'Search Algorithms';
      default:
        return typeStr.charAt(0).toUpperCase() + typeStr.slice(1) + ' Algorithms';
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ my: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {getTypeTitle(type!)}
        </Typography>
        
        <Typography variant="body1" paragraph>
          Select an algorithm to visualize and learn about its implementation and performance characteristics.
        </Typography>
        
        <Grid container spacing={3}>
          {algorithms.map((algorithm) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={algorithm.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {algorithm.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {algorithm.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    component={Link} 
                    to={`/algorithm/${type}/${algorithm.id}`}
                    color="primary"
                  >
                    Visualize
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CategoryPage;