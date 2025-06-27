// src/components/visualizers/tree/TreeVisualizer.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { AlgorithmConfig } from '../../../services/db';

interface TreeVisualizerProps {
  algorithm: AlgorithmConfig;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ algorithm }) => {
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
        Tree Visualization Placeholder for {algorithm.name}
      </Typography>
    </Box>
  );
};

export default TreeVisualizer;