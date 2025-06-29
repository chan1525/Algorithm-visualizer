// src/components/analytics/PerformanceMetrics.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';

import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { AlgorithmConfig } from '../../services/db';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PerformanceMetricsProps {
  algorithm: AlgorithmConfig;
  performanceData?: {
    executionTime: number;
    memoryUsage: number;
    comparisons: number;
    swaps: number;
  };
}
interface PerformanceData {
  executionTime: number;
  memoryUsage: number;
  comparisons: number;
  swaps: number;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ 
  algorithm, 
  performanceData = {
    executionTime: 0,
    memoryUsage: 0,
    comparisons: 0,
    swaps: 0
  }
}) => {

  // Sample data for comparison chart
  const comparisonData = {
    labels: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Bubble Sort'],
    datasets: [
      {
        label: 'Execution Time (ms)',
        data: [12, 19, 15, 45],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Memory Usage (KB)',
        data: [22, 29, 20, 15],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Algorithm Comparison',
      },
    },
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Execution Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">Execution Time:</Typography>
                <Typography variant="body1">{performanceData.executionTime.toFixed(2)} ms</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">Memory Usage:</Typography>
                <Typography variant="body1">{(performanceData.memoryUsage / 1024).toFixed(2)} KB</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">Comparisons:</Typography>
                <Typography variant="body1">{performanceData.comparisons}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">Swaps/Operations:</Typography>
                <Typography variant="body1">{performanceData.swaps}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Big O Analysis
            </Typography>
            <Grid container spacing={2}>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">Time Complexity:</Typography>
                <Typography variant="body1">O(n log n)</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">Space Complexity:</Typography>
                <Typography variant="body1">O(n)</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="body2" color="text.secondary">Best Case:</Typography>
                <Typography variant="body1">O(n log n)</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="body2" color="text.secondary">Worst Case:</Typography>
                <Typography variant="body1">O(n²)</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid size={12}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Box sx={{ height: 300 }}>
              <Bar options={options} data={comparisonData} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PerformanceMetrics;