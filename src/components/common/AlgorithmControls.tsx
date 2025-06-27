// src/components/common/AlgorithmControls.tsx
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Slider, 
  Typography, 
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import Grid from '@mui/material/Grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { AlgorithmConfig } from '../../services/db';

interface AlgorithmControlsProps {
  algorithm: AlgorithmConfig;
}

const AlgorithmControls: React.FC<AlgorithmControlsProps> = ({ algorithm }) => {
  const [speed, setSpeed] = useState<number>(50);
  const [size, setSize] = useState<number>(50);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [algorithmVariant, setAlgorithmVariant] = useState<string>('default');

  const handleSpeedChange = (event: Event, newValue: number | number[]) => {
    setSpeed(newValue as number);
  };

  const handleSizeChange = (event: Event, newValue: number | number[]) => {
    setSize(newValue as number);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    // Trigger algorithm execution in the parent component
  };

  const handlePause = () => {
    setIsPlaying(false);
    // Pause algorithm execution
  };

  const handleStop = () => {
    setIsPlaying(false);
    // Stop and reset algorithm execution
  };

  const handleStepForward = () => {
    // Trigger a single step in the algorithm execution
  };

  const handleShuffle = () => {
    // Shuffle or randomize the data
  };

  const handleVariantChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAlgorithmVariant(event.target.value as string);
  };

  return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid size="auto">
          {!isPlaying ? (
            <Tooltip title="Play">
              <IconButton color="primary" onClick={handlePlay}>
                <PlayArrowIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Pause">
              <IconButton color="primary" onClick={handlePause}>
                <PauseIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
        <Grid size="auto">
          <Tooltip title="Stop">
            <IconButton onClick={handleStop}>
              <StopIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid size="auto">
          <Tooltip title="Step Forward">
            <IconButton onClick={handleStepForward}>
              <SkipNextIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid size="auto">
          <Tooltip title="Randomize Data">
            <IconButton onClick={handleShuffle}>
              <ShuffleIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        
        <Grid size="grow">
          <Box sx={{ px: 2 }}>
            <Typography id="speed-slider" gutterBottom>
              Speed
            </Typography>
            <Slider
              value={speed}
              onChange={handleSpeedChange}
              aria-labelledby="speed-slider"
              min={1}
              max={100}
            />
          </Box>
        </Grid>
        
        <Grid size="grow">
          <Box sx={{ px: 2 }}>
            <Typography id="size-slider" gutterBottom>
              Data Size
            </Typography>
            <Slider
              value={size}
              onChange={handleSizeChange}
              aria-labelledby="size-slider"
              min={10}
              max={100}
            />
          </Box>
        </Grid>
        
        {algorithm.type === 'sorting' && (
          <Grid size={{ xs: 12, sm: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="algorithm-variant-label">Variant</InputLabel>
              <Select
                labelId="algorithm-variant-label"
                id="algorithm-variant"
                value={algorithmVariant}
                label="Variant"
                onChange={handleVariantChange as any}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="optimized">Optimized</MenuItem>
                {/* Add other variants specific to the algorithm */}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AlgorithmControls;