// src/components/visualizers/sorting/SortingVisualizer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Alert, TextField, Slider, Paper, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { AlgorithmConfig } from '../../../services/db';
import { bubbleSort, quickSort, mergeSort, heapSort } from '../../../algorithms/sorting';

// Define PerformanceData interface
interface PerformanceData {
  executionTime: number;
  memoryUsage: number;
  comparisons: number;
  swaps: number;
}

// Update the props interface to include onPerformanceUpdate callback
interface SortingVisualizerProps {
  algorithm: AlgorithmConfig;
  onPerformanceUpdate?: (data: PerformanceData) => void;
}

// Interface for animation frames
interface AnimationFrame {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  description?: string;
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ 
  algorithm,
  onPerformanceUpdate 
}) => {
  const [array, setArray] = useState<number[]>([]);
  const [animationFrames, setAnimationFrames] = useState<AnimationFrame[]>([]);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [arrayInput, setArrayInput] = useState<string>('');
  const [arraySize, setArraySize] = useState<number>(20);
  const [animationSpeed, setAnimationSpeed] = useState<number>(500); // ms per frame
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate random array on mount
  useEffect(() => {
    try {
      generateRandomArray(arraySize);
    } catch (err) {
      console.error('Error initializing sorting visualizer:', err);
      setError('Failed to initialize sorting visualization');
    }
  }, [algorithm]);

  // Animation loop
  useEffect(() => {
    if (isPlaying && currentFrame < animationFrames.length - 1) {
      animationTimeoutRef.current = setTimeout(() => {
        setCurrentFrame(prev => prev + 1);
      }, animationSpeed);
    } else if (currentFrame >= animationFrames.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isPlaying, currentFrame, animationFrames.length, animationSpeed]);

  const generateRandomArray = (size = 20) => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 5); // Random values between 5 and 104
    }
    setArray(newArray);
    setArrayInput(newArray.join(', '));
    
    // Also generate animation frames for the sorting algorithm
    generateAnimationFrames(newArray);
  };

  const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrayInput(e.target.value);
  };

  const handleSubmitArray = () => {
    try {
      // Parse input into an array of numbers
      const inputArray = arrayInput.split(',').map(item => {
        const num = Number(item.trim());
        if (isNaN(num)) {
          throw new Error(`Invalid number: ${item.trim()}`);
        }
        return num;
      });
      
      if (inputArray.length === 0) {
        throw new Error('Array cannot be empty');
      }
      
      if (inputArray.length > 100) {
        throw new Error('Array size cannot exceed 100 elements');
      }
      
      setArray(inputArray);
      generateAnimationFrames(inputArray);
      setError(null);
    } catch (err: any) {
      setError(`Invalid input: ${err.message}`);
    }
  };

  const handleArraySizeChange = (event: Event, newValue: number | number[]) => {
    const size = newValue as number;
    setArraySize(size);
    generateRandomArray(size);
  };

  const handleSpeedChange = (event: Event, newValue: number | number[]) => {
    const speed = newValue as number;
    setAnimationSpeed(1000 - speed); // Invert so higher = faster
  };

  const generateAnimationFrames = (inputArray: number[]) => {
    // Reset current frame
    setCurrentFrame(0);
    
    // Initialize performance tracking
    const startTime = performance.now();
    let comparisons = 0;
    let swaps = 0;
    
    // Call the appropriate sorting algorithm based on the algorithm name
    let sortSteps: AnimationFrame[] = [];
    
    try {
      if (!algorithm || !algorithm.name) {
        // Default to bubble sort if no algorithm is provided
        sortSteps = bubbleSort([...inputArray]);
      } else {
        switch (algorithm.name.toLowerCase()) {
          case 'quick sort':
            sortSteps = quickSort([...inputArray]);
            break;
          case 'bubble sort':
            sortSteps = bubbleSort([...inputArray]);
            break;
          case 'merge sort':
            sortSteps = mergeSort([...inputArray]);
            break;
          case 'heap sort':
            sortSteps = heapSort([...inputArray]);
            break;
          default:
            // Default to bubble sort if algorithm not recognized
            sortSteps = bubbleSort([...inputArray]);
        }
      }
      
      // Calculate performance metrics
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // Count comparisons and swaps from animation frames
      for (const frame of sortSteps) {
        if (frame.comparingIndices && frame.comparingIndices.length > 0) {
          comparisons++;
        }
        if (frame.swappedIndices && frame.swappedIndices.length > 0) {
          swaps++;
        }
      }
      
      // Estimate memory usage (this is a rough estimate)
      // Each number in JavaScript is typically 8 bytes
      const memoryUsage = inputArray.length * 8 * 3; // Original array + 2 copies during sorting
      
      // Update performance metrics
      const newPerformanceData: PerformanceData = {
        executionTime,
        memoryUsage,
        comparisons,
        swaps
      };
      
      // Pass performance data to parent component if callback provided
      if (onPerformanceUpdate) {
        onPerformanceUpdate(newPerformanceData);
      }
      
      // Add initial frame
      const initialFrame: AnimationFrame = { 
        array: [...inputArray], 
        comparingIndices: [], 
        swappedIndices: [],
        description: 'Initial array before sorting'
      };
      
      setAnimationFrames([initialFrame, ...sortSteps]);
      setError(null);
    } catch (err) {
      console.error('Error generating animation frames:', err);
      setError('Failed to generate animation frames for the algorithm');
    }
  };

  const startAnimation = () => {
    setIsPlaying(true);
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentFrame(0);
  };

  const stepForward = () => {
    if (currentFrame < animationFrames.length - 1) {
      setCurrentFrame(prev => prev + 1);
    }
  };

  const stepBackward = () => {
    if (currentFrame > 0) {
      setCurrentFrame(prev => prev - 1);
    }
  };

  // Render the current state of the array as bars
  const renderBars = () => {
    if (!animationFrames.length || currentFrame >= animationFrames.length) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography color="text.secondary">No data to visualize</Typography>
        </Box>
      );
    }

    const frame = animationFrames[currentFrame];
    const maxValue = Math.max(...frame.array);
    
    return frame.array.map((value, index) => {
      const height = `${(value / maxValue) * 100}%`;
      const width = `${90 / frame.array.length}%`;
      const isComparing = frame.comparingIndices.includes(index);
      const isSwapped = frame.swappedIndices.includes(index);
      
      let backgroundColor = '#3f51b5'; // Default
      if (isComparing) backgroundColor = '#ff9800'; // Orange for comparing
      if (isSwapped) backgroundColor = '#f44336'; // Red for swapped
      
      return (
        <Box
          key={index}
          sx={{
            position: 'relative',
            height,
            width,
            backgroundColor,
            display: 'inline-flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            margin: '0 1px',
            transition: 'height 0.3s ease-in-out',
          }}
        >
          {frame.array.length <= 30 && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
                mb: 0.5
              }}
            >
              {value}
            </Typography>
          )}
        </Box>
      );
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Enter array (comma separated)"
            variant="outlined"
            value={arrayInput}
            onChange={handleArrayInput}
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} container spacing={1}>
          <Grid size="auto">
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmitArray}
              size="small"
            >
              Use This Array
            </Button>
          </Grid>
          <Grid size="auto">
            <Button 
              variant="outlined" 
              onClick={() => generateRandomArray(arraySize)}
              size="small"
            >
              Random Array
            </Button>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography id="size-slider" gutterBottom>
            Array Size: {arraySize}
          </Typography>
          <Slider
            value={arraySize}
            onChange={handleArraySizeChange}
            aria-labelledby="size-slider"
            min={5}
            max={100}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography id="speed-slider" gutterBottom>
            Animation Speed
          </Typography>
          <Slider
            value={1000 - animationSpeed}
            onChange={handleSpeedChange}
            aria-labelledby="speed-slider"
            min={100}
            max={990}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
      
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box 
          sx={{ 
            height: '300px', 
            display: 'flex', 
            alignItems: 'flex-end', 
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
            padding: 2,
            borderRadius: 1
          }}
        >
          {renderBars()}
        </Box>
      </Paper>
      
      {animationFrames.length > 0 && animationFrames[currentFrame]?.description && (
        <Paper elevation={1} sx={{ p: 2, mb: 2, bgcolor: '#f9f9f9' }}>
          <Typography variant="body2" color="text.secondary">
            Step {currentFrame + 1} of {animationFrames.length}:
          </Typography>
          <Typography variant="body1">
            {animationFrames[currentFrame].description}
          </Typography>
        </Paper>
      )}
      
      <Grid container justifyContent="center" spacing={2} sx={{ mb: 2 }}>
        <Grid size="auto">
          <Button 
            variant="outlined" 
            onClick={resetAnimation}
          >
            Reset
          </Button>
        </Grid>
        <Grid size="auto">
          <Button 
            variant="outlined" 
            onClick={stepBackward}
            disabled={currentFrame <= 0}
          >
            Previous
          </Button>
        </Grid>
        <Grid size="auto">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={isPlaying ? pauseAnimation : startAnimation}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </Grid>
        <Grid size="auto">
          <Button 
            variant="outlined" 
            onClick={stepForward}
            disabled={currentFrame >= animationFrames.length - 1}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid size="auto">
          <Chip 
            label="Comparing" 
            sx={{ bgcolor: '#ff9800', color: 'white' }} 
          />
        </Grid>
        <Grid size="auto">
          <Chip 
            label="Swapped" 
            sx={{ bgcolor: '#f44336', color: 'white' }} 
          />
        </Grid>
        <Grid size="auto">
          <Chip 
            label="Regular" 
            sx={{ bgcolor: '#3f51b5', color: 'white' }} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SortingVisualizer;