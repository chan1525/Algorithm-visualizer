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
  // Get algorithm specific labels and complexity information
  const getMetricsInfo = () => {
    if (algorithm.type === 'sorting') {
      return {
        comparisonLabel: 'Comparisons:',
        operationLabel: 'Swaps:',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        bestCase: 'O(n log n)',
        worstCase: 'O(n²)',
        comparisonChartLabels: ['Quick Sort', 'Merge Sort', 'Heap Sort', 'Bubble Sort'],
        comparisonChartData: [
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
        ]
      };
    } else if (algorithm.type === 'graph') {
      // Different metrics for graph algorithms
      const isShortestPath = algorithm.name.includes('Dijkstra');
      const isBFS = algorithm.name.includes('Breadth');
      const isDFS = algorithm.name.includes('Depth');
      
      let timeComplexity = 'O(V + E)'; // Default for traversal
      let spaceComplexity = 'O(V)';
      let bestCase = 'O(V + E)';
      let worstCase = 'O(V + E)';
      
      if (isShortestPath) {
        timeComplexity = 'O(E log V)';
        bestCase = 'O(E + V log V)';
        worstCase = 'O(V²)';
      }
      
      return {
        comparisonLabel: 'Edge Examinations:',
        operationLabel: 'Distance Updates:',
        timeComplexity,
        spaceComplexity,
        bestCase,
        worstCase,
        comparisonChartLabels: ['Dijkstra\'s', 'BFS', 'DFS', 'A*'],
        comparisonChartData: [
          {
            label: 'Execution Time (ms)',
            data: [22, 12, 10, 25],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            label: 'Memory Usage (KB)',
            data: [28, 20, 15, 30],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ]
      };
    } else if (algorithm.type === 'search') {
      return {
        comparisonLabel: 'Comparisons:',
        operationLabel: 'Iterations:',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        bestCase: 'O(1)',
        worstCase: 'O(log n)',
        comparisonChartLabels: ['Binary Search', 'Linear Search'],
        comparisonChartData: [
          {
            label: 'Execution Time (ms)',
            data: [5, 25],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            label: 'Memory Usage (KB)',
            data: [10, 8],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ]
      };
    } else if (algorithm.type === 'tree') {
      return {
        comparisonLabel: 'Node Visits:',
        operationLabel: 'Rebalancing:',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(n)',
        bestCase: 'O(log n)',
        worstCase: 'O(n)',
        comparisonChartLabels: ['BST', 'AVL Tree', 'Red-Black', 'B-Tree'],
        comparisonChartData: [
          {
            label: 'Execution Time (ms)',
            data: [15, 18, 20, 25],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            label: 'Memory Usage (KB)',
            data: [20, 25, 22, 30],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ]
      };
    }
    
    // Default values
    return {
      comparisonLabel: 'Comparisons:',
      operationLabel: 'Operations:',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      bestCase: 'O(n)',
      worstCase: 'O(n)',
      comparisonChartLabels: ['Algorithm 1', 'Algorithm 2', 'Algorithm 3', 'Algorithm 4'],
      comparisonChartData: [
        {
          label: 'Execution Time (ms)',
          data: [10, 15, 20, 25],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'Memory Usage (KB)',
          data: [15, 20, 25, 30],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ]
    };
  };

  const metricsInfo = getMetricsInfo();

  // Set up the comparison chart data
  const comparisonData = {
    labels: metricsInfo.comparisonChartLabels,
    datasets: metricsInfo.comparisonChartData,
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

  // For debugging
  useEffect(() => {
    console.log("Performance data:", performanceData);
  }, [performanceData]);

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
                <Typography variant="body2" color="text.secondary">{metricsInfo.comparisonLabel}</Typography>
                <Typography variant="body1">{performanceData.comparisons}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">{metricsInfo.operationLabel}</Typography>
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
                <Typography variant="body1">{metricsInfo.timeComplexity}</Typography>
              </Grid>
              <Grid size={6}>
                <Typography variant="body2" color="text.secondary">Space Complexity:</Typography>
                <Typography variant="body1">{metricsInfo.spaceComplexity}</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="body2" color="text.secondary">Best Case:</Typography>
                <Typography variant="body1">{metricsInfo.bestCase}</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="body2" color="text.secondary">Worst Case:</Typography>
                <Typography variant="body1">{metricsInfo.worstCase}</Typography>
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