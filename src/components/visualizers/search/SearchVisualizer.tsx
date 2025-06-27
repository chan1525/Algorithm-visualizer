// src/components/visualizers/search/SearchVisualizer.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { AlgorithmConfig } from '../../../services/db';

interface SearchVisualizerProps {
  algorithm: AlgorithmConfig;
}

const SearchVisualizer: React.FC<SearchVisualizerProps> = ({ algorithm }) => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        borderRadius: 1
      }}
    >
      <Typography variant="h6" color="text.secondary">
        Search Visualization Placeholder for {algorithm.name}
      </Typography>
    </Box>
  );
};

export default SearchVisualizer;