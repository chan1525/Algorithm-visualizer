import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Slider, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  Grid
} from '@mui/material';
import { AlgorithmConfig } from '../../../services/db';
import { linearSearch, generateRandomArray, AnimationFrame } from '../../../algorithms/search/linearSearch';

interface SearchVisualizerProps {
  algorithm: AlgorithmConfig;
  onPerformanceUpdate?: (data: any) => void;
}

const SearchVisualizer: React.FC<SearchVisualizerProps> = ({ 
  algorithm,
  onPerformanceUpdate 
}) => {
  const [array, setArray] = useState<number[]>(generateRandomArray());
  const [target, setTarget] = useState<number>(50);
  const [animationFrames, setAnimationFrames] = useState<AnimationFrame[]>([]);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [arraySize, setArraySize] = useState<number>(15);
  const [animationSpeed, setAnimationSpeed] = useState<number>(500); // ms per frame
  const [arrayInput, setArrayInput] = useState<string>('');
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate a random array on mount
  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

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

  const generateNewArray = () => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    setArrayInput(newArray.join(', '));
    // Reset animation
    setAnimationFrames([]);
    setCurrentFrame(0);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setTarget(value);
    } else {
      setTarget(0);
    }
  };

  const handleArrayInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrayInput(e.target.value);
  };

  const handleSubmitArray = () => {
    try {
      const newArray = arrayInput.split(',').map(item => {
        const num = parseInt(item.trim());
        if (isNaN(num)) {
          throw new Error(`Invalid number: ${item.trim()}`);
        }
        return num;
      });
      
      if (newArray.length === 0) {
        throw new Error('Array cannot be empty');
      }
      
      setArray(newArray);
      // Reset animation
      setAnimationFrames([]);
      setCurrentFrame(0);
    } catch (error: any) {
      console.error('Error parsing array input:', error.message);
    }
  };

  const handleArraySizeChange = (event: Event, newValue: number | number[]) => {
    setArraySize(newValue as number);
  };

  const handleSpeedChange = (event: Event, newValue: number | number[]) => {
    setAnimationSpeed(1000 - (newValue as number));
  };

  const startSearch = () => {
    // Reset animation
    setCurrentFrame(0);
    
    // Initialize performance tracking
    const startTime = performance.now();
    
    // Generate animation frames based on algorithm
    let frames: AnimationFrame[] = [];
    
    if (algorithm.name.toLowerCase().includes('linear')) {
      frames = linearSearch(array, target);
    } else {
      // Default to linear search if algorithm not recognized
      frames = linearSearch(array, target);
    }
    
    setAnimationFrames(frames);
    
    // Calculate performance metrics
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    // Count comparisons (number of elements examined)
    const comparisons = frames.filter(frame => frame.currentIndex !== null).length;
    
    // Update performance metrics
    const newPerformanceData = {
      executionTime,
      memoryUsage: array.length * 4, // Rough estimate: 4 bytes per number
      comparisons,
      swaps: 0 // Search algorithms don't swap elements
    };
    
    console.log("Generated performance data:", newPerformanceData);
    
    // Pass performance data to parent component if callback provided
    if (onPerformanceUpdate) {
      onPerformanceUpdate(newPerformanceData);
    }
  };

  const startAnimation = () => {
    if (animationFrames.length === 0) {
      startSearch();
    }
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
    if (animationFrames.length === 0) {
      startSearch();
    } else if (currentFrame < animationFrames.length - 1) {
      setCurrentFrame(prev => prev + 1);
    }
  };

  const stepBackward = () => {
    if (currentFrame > 0) {
      setCurrentFrame(prev => prev - 1);
    }
  };

  const renderArray = () => {
    if (!animationFrames.length) {
      return (
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            mt: 2
          }}
        >
          {array.map((value, index) => (
            <Box
              key={index}
              sx={{
                width: '40px',
                height: '40px',
                m: 0.5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '4px',
                bgcolor: '#f5f5f5'
              }}
            >
              {value}
            </Box>
          ))}
        </Box>
      );
    }

    const frame = animationFrames[currentFrame];
    
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          mt: 2
        }}
      >
        {frame.array.map((value, index) => {
          let backgroundColor = '#f5f5f5';
          let borderColor = '#ccc';
          
          if (index === frame.currentIndex) {
            backgroundColor = '#ff9800'; // Current element being checked
            borderColor = '#f57c00';
          } else if (index === frame.foundIndex) {
            backgroundColor = '#4caf50'; // Found element
            borderColor = '#388e3c';
          }
          
          return (
            <Box
              key={index}
              sx={{
                width: '40px',
                height: '40px',
                m: 0.5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: `2px solid ${borderColor}`,
                borderRadius: '4px',
                bgcolor: backgroundColor,
                color: index === frame.currentIndex || index === frame.foundIndex ? 'white' : 'black',
                fontWeight: index === frame.foundIndex ? 'bold' : 'normal'
              }}
            >
              {value}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Enter Array (comma separated)"
            variant="outlined"
            value={arrayInput}
            onChange={handleArrayInput}
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSubmitArray}
            fullWidth
          >
            Set Array
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Button 
            variant="outlined"
            onClick={generateNewArray}
            fullWidth
          >
            Random Array
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            label="Target Value to Search"
            type="number"
            variant="outlined"
            value={target}
            onChange={handleTargetChange}
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 1 }}>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={startSearch}
            fullWidth
          >
            Search
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography id="array-size-slider" gutterBottom>
            Array Size: {arraySize}
          </Typography>
          <Slider
            value={arraySize}
            onChange={handleArraySizeChange}
            aria-labelledby="array-size-slider"
            min={5}
            max={50}
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
            max={900}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>
      
      <Paper elevation={3} sx={{ p: 2, mb: 2, minHeight: '200px' }}>
        {renderArray()}
      </Paper>
      
      {animationFrames.length > 0 && (
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
            disabled={currentFrame <= 0 || animationFrames.length === 0}
          >
            Previous
          </Button>
        </Grid>
        <Grid size="auto">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={isPlaying ? pauseAnimation : startAnimation}
            disabled={animationFrames.length === 0 && currentFrame === 0}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </Grid>
        <Grid size="auto">
          <Button 
            variant="outlined" 
            onClick={stepForward}
            disabled={(animationFrames.length > 0 && currentFrame >= animationFrames.length - 1) || (animationFrames.length === 0 && array.length === 0)}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid size="auto">
          <Chip 
            label="Current Element" 
            sx={{ bgcolor: '#ff9800', color: 'white' }} 
          />
        </Grid>
        <Grid size="auto">
          <Chip 
            label="Found Element" 
            sx={{ bgcolor: '#4caf50', color: 'white' }} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchVisualizer;