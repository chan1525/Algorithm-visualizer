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
  Alert
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { getAlgorithm, getAlgorithmsByType, AlgorithmConfig } from '../services/db';
import { useAuth } from '../context/AuthContext';

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
  const { currentUser } = useAuth();
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

  // Render loading state
  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Render error state
  if (error || !algorithm) {
    return (
      <Container>
        <Alert severity="error" sx={{ my: 4 }}>
          {error || 'Failed to load algorithm'}
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
        return <SearchVisualizer algorithm={algorithm} />;
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

    // Add similar code for other algorithm types when implemented

    return [];
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {algorithm.name}
        </Typography>

        <Typography variant="body1" paragraph>
          {algorithm.description}
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <AlgorithmControls algorithm={algorithm} />
              <Box sx={{ mt: 2, minHeight: '400px' }}>
                {renderVisualizer()}
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Performance" />
                <Tab label="Code" />
                <Tab label="Explanation" />
              </Tabs>
              <Divider />
              <Box sx={{ p: 2 }}>
                {tabValue === 0 && <PerformanceMetrics
                  algorithm={algorithm}
                  performanceData={performanceData}
                />}
                {tabValue === 1 && (
                  <Box sx={{ width: '100%' }}>
                    <Tabs
                      value={codeLanguage}
                      onChange={(e, newValue) => setCodeLanguage(newValue)}
                      sx={{ mb: 2 }}
                    >
                      <Tab label="JavaScript" value="javascript" />
                      <Tab label="Python" value="python" />
                      <Tab label="Java" value="java" />
                      <Tab label="C++" value="cpp" />
                    </Tabs>

                    <Box component="pre" sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, overflow: 'auto' }}>
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
                  </Box>
                )}
                {tabValue === 2 && (
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body1" component="div">
                      {getAlgorithmExplanation()}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Algorithm Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                <strong>Category:</strong> {algorithm.type.charAt(0).toUpperCase() + algorithm.type.slice(1)}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Time Complexity:</strong> O(n log n) {/* This would be specific to the algorithm */}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Space Complexity:</strong> O(n) {/* This would be specific to the algorithm */}
              </Typography>
              {currentUser && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Save to Favorites
                </Button>
              )}
            </Paper>

            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Related Algorithms
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box component="ul" sx={{ pl: 2 }}>
                {getRelatedAlgorithms().map((relatedAlgo, index) => (
                  <Box component="li" sx={{ mb: 1 }} key={index}>
                    <Typography variant="body2">
                      {relatedAlgo.type ? (
                        <Link to={`/algorithm/${relatedAlgo.type}/${relatedAlgo.name.replace(/\s+/g, '-').toLowerCase()}`}>
                          {relatedAlgo.name}
                        </Link>
                      ) : (
                        <strong>{relatedAlgo.name}</strong>
                      )}
                      {relatedAlgo.description && ` - ${relatedAlgo.description}`}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Algorithm;