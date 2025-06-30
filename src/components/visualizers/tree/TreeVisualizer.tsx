import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Slider, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField,
  Stack,
  Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { AlgorithmConfig } from '../../../services/db';
import { generateSampleTree as generateRBTree, RBNode, Color } from '../../../algorithms/tree/redBlackTree';
import { generateSampleTree as generateAVLTree, AVLNode } from '../../../algorithms/tree/avlTree';
import { generateSampleTree as generateBSTree, BSTNode } from '../../../algorithms/tree/binarySearchTree';

// Define a generic animation frame interface that works for both tree types
interface AnimationFrame {
  tree: any;
  highlightedNodes: number[];
  changedNodes: number[];
  rotationEdge?: { from: number; to: number };
  balanceFactor?: Record<number, number>;
  description?: string;
}

interface TreeVisualizerProps {
  algorithm: AlgorithmConfig;
  onPerformanceUpdate?: (data: any) => void;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ 
  algorithm,
  onPerformanceUpdate 
}) => {
  const [animationFrames, setAnimationFrames] = useState<AnimationFrame[]>([]);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('30, 20, 40, 10, 25, 35, 50');
  const [keysToInsert, setKeysToInsert] = useState<number[]>([30, 20, 40, 10, 25, 35, 50]);
  const [animationSpeed, setAnimationSpeed] = useState<number>(500); // ms per frame
  const [treeType, setTreeType] = useState<'rb' | 'avl' | 'bst'>('rb');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

 useEffect(() => {
  if (algorithm && algorithm.name) {
    if (algorithm.name.includes('AVL')) {
      setTreeType('avl');
    } else if (algorithm.name.includes('Binary Search')) {
      setTreeType('bst');
    } else {
      setTreeType('rb'); // Default to Red-Black Tree
    }
  }
}, [algorithm]);

  // Generate sample tree on mount
  useEffect(() => {
    try {
      generateAnimationFrames();
    } catch (err) {
      console.error('Error initializing tree visualizer:', err);
    }
  }, [treeType]);

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

  // Draw the tree whenever the current frame changes
  useEffect(() => {
    if (animationFrames.length > 0 && currentFrame < animationFrames.length) {
      drawTree(animationFrames[currentFrame]);
    }
  }, [currentFrame, animationFrames]);

  const generateAnimationFrames = () => {
  // Reset current frame
  setCurrentFrame(0);
  
  // Initialize performance tracking
  const startTime = performance.now();
  
  try {
    // Generate frames for the selected tree type
    let frames: AnimationFrame[];
    
    if (treeType === 'avl') {
      frames = generateAVLTree(keysToInsert);
    } else if (treeType === 'bst') {
      frames = generateBSTree(keysToInsert);
    } else {
      frames = generateRBTree(keysToInsert);
    }
    
    setAnimationFrames(frames);
      
      // Calculate performance metrics
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // Count operations
      let nodeComparisons = 0;
      let rotationsOrRecolorings = 0;
      
      for (const frame of frames) {
        // Count node comparisons
        if (frame.description?.includes('Comparing')) {
          nodeComparisons++;
        }
        
        // Count rotations and recolorings
        if (frame.description?.includes('rotation') || 
            frame.description?.includes('Recoloring')) {
          rotationsOrRecolorings++;
        }
      }
      
      // Estimate memory usage
      const memoryUsage = keysToInsert.length * 40 + frames.length * 100;
      
      // Update performance metrics
      const newPerformanceData = {
        executionTime,
        memoryUsage,
        comparisons: nodeComparisons,
        swaps: rotationsOrRecolorings
      };
      
      console.log("Generated performance data:", newPerformanceData);
      
      // Pass performance data to parent component if callback provided
      if (onPerformanceUpdate) {
        onPerformanceUpdate(newPerformanceData);
      }
    } catch (err) {
      console.error('Error generating animation frames:', err);
    }
  };

  const drawTree = (frame: AnimationFrame) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!frame.tree) {
      // Draw empty tree message
      ctx.fillStyle = '#000000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Empty Tree', canvas.width / 2, 30);
      return;
    }
    
    // Calculate tree dimensions
    const treeHeight = getTreeHeight(frame.tree);
    const nodeRadius = 20;
    const levelHeight = 70;
    const horizontalSpacing = canvas.width / Math.pow(2, treeHeight);
    
    // Draw the tree recursively
    drawNode(
      ctx, 
      frame.tree, 
      canvas.width / 2, 
      60, 
      horizontalSpacing, 
      levelHeight, 
      nodeRadius, 
      frame.highlightedNodes,
      frame.changedNodes,
      frame.rotationEdge,
      frame.balanceFactor
    );
  };

  // Get the height of the tree
  const getTreeHeight = (node: any): number => {
    if (node === null) return 0;
    return 1 + Math.max(
      getTreeHeight(node.left),
      getTreeHeight(node.right)
    );
  };

  // Draw a node and its children recursively
  const drawNode = (
    ctx: CanvasRenderingContext2D,
    node: any,
    x: number,
    y: number,
    horizontalSpacing: number,
    levelHeight: number,
    radius: number,
    highlightedNodes: number[],
    changedNodes: number[],
    rotationEdge?: { from: number, to: number },
    balanceFactor?: Record<number, number>
  ): void => {
    if (node === null) return;
    
    // Draw edges to children
    if (node.left) {
      const childX = x - horizontalSpacing / 2;
      const childY = y + levelHeight;
      
      ctx.beginPath();
      ctx.moveTo(x, y + radius);
      ctx.lineTo(childX, childY - radius);
      
      // Check if this edge is part of a rotation
      const isRotationEdge = rotationEdge && 
                            ((rotationEdge.from === node.key && rotationEdge.to === node.left.key) ||
                             (rotationEdge.from === node.left.key && rotationEdge.to === node.key));
      
      ctx.strokeStyle = isRotationEdge ? '#ff9800' : '#666666';
      ctx.lineWidth = isRotationEdge ? 3 : 1;
      ctx.stroke();
      
      // Recursively draw left subtree
      drawNode(
        ctx,
        node.left,
        childX,
        childY,
        horizontalSpacing / 2,
        levelHeight,
        radius,
        highlightedNodes,
        changedNodes,
        rotationEdge,
        balanceFactor
      );
    }
    
    if (node.right) {
      const childX = x + horizontalSpacing / 2;
      const childY = y + levelHeight;
      
      ctx.beginPath();
      ctx.moveTo(x, y + radius);
      ctx.lineTo(childX, childY - radius);
      
      // Check if this edge is part of a rotation
      const isRotationEdge = rotationEdge && 
                            ((rotationEdge.from === node.key && rotationEdge.to === node.right.key) ||
                             (rotationEdge.from === node.right.key && rotationEdge.to === node.key));
      
      ctx.strokeStyle = isRotationEdge ? '#ff9800' : '#666666';
      ctx.lineWidth = isRotationEdge ? 3 : 1;
      ctx.stroke();
      
      // Recursively draw right subtree
      drawNode(
        ctx,
        node.right,
        childX,
        childY,
        horizontalSpacing / 2,
        levelHeight,
        radius,
        highlightedNodes,
        changedNodes,
        rotationEdge,
        balanceFactor
      );
    }
    
    // Draw the node itself
    ctx.beginPath();
    
    // Determine node fill color
    // Determine node fill color
if (highlightedNodes.includes(node.key)) {
  ctx.fillStyle = '#ff9800'; // Highlighted node
} else if (changedNodes.includes(node.key)) {
  ctx.fillStyle = '#2196f3'; // Changed node
} else if (treeType === 'rb') {
  ctx.fillStyle = node.color === Color.RED ? '#f44336' : '#000000';
} else if (treeType === 'avl') {
  ctx.fillStyle = '#4caf50'; // Green for AVL nodes
} else {
  ctx.fillStyle = '#9c27b0'; // Purple for BST nodes
}
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw node key
    ctx.fillStyle = treeType === 'rb' && node.color === Color.BLACK ? '#ffffff' : '#ffffff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.key.toString(), x, y);
    
    // Draw balance factor for AVL trees
    if (treeType === 'avl' && balanceFactor && balanceFactor[node.key] !== undefined) {
      ctx.fillStyle = '#000000';
      ctx.font = '10px Arial';
      ctx.fillText(
        `BF: ${balanceFactor[node.key]}`, 
        x, 
        y + radius + 12
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmitKeys = () => {
    try {
      // Parse input into an array of numbers
      const keys = inputValue.split(',').map(item => {
        const num = Number(item.trim());
        if (isNaN(num)) {
          throw new Error(`Invalid number: ${item.trim()}`);
        }
        return num;
      });
      
      if (keys.length === 0) {
        throw new Error('No keys provided');
      }
      
      setKeysToInsert(keys);
      generateAnimationFrames();
    } catch (err: any) {
      console.error('Error parsing input:', err.message);
    }
  };

  const handleRandomKeys = () => {
    // Generate 7 random keys between 1 and 99
    const keys = Array.from({ length: 7 }, () => Math.floor(Math.random() * 99) + 1);
    setKeysToInsert(keys);
    setInputValue(keys.join(', '));
    generateAnimationFrames();
  };

  const handleSpeedChange = (event: Event, newValue: number | number[]) => {
    const speed = newValue as number;
    setAnimationSpeed(1000 - speed);
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

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            label="Enter keys to insert (comma separated)"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="e.g., 30, 20, 40, 10, 25, 35, 50"
            size="small"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSubmitKeys}
            fullWidth
          >
            Insert Keys
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Button 
            variant="outlined"
            onClick={handleRandomKeys}
            fullWidth
          >
            Random Keys
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12 }}>
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
            width: '100%', 
            height: '400px', 
            position: 'relative',
            bgcolor: '#f5f5f5',
            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={400} 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          />
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
        <Grid size="auto">
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={generateAnimationFrames}
          >
            Regenerate Tree
          </Button>
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
  {treeType === 'rb' ? (
    <>
      <Grid size="auto">
        <Chip 
          label="Red Node" 
          sx={{ bgcolor: '#f44336', color: 'white' }} 
        />
      </Grid>
      <Grid size="auto">
        <Chip 
          label="Black Node" 
          sx={{ bgcolor: '#000000', color: 'white' }} 
        />
      </Grid>
    </>
  ) : treeType === 'avl' ? (
    <Grid size="auto">
      <Chip 
        label="AVL Node" 
        sx={{ bgcolor: '#4caf50', color: 'white' }} 
      />
    </Grid>
  ) : (
    <Grid size="auto">
      <Chip 
        label="BST Node" 
        sx={{ bgcolor: '#9c27b0', color: 'white' }} 
      />
    </Grid>
  )}
        <Grid size="auto">
          <Chip 
            label="Highlighted Node" 
            sx={{ bgcolor: '#ff9800', color: 'white' }} 
          />
        </Grid>
        <Grid size="auto">
          <Chip 
            label="Changed Node" 
            sx={{ bgcolor: '#2196f3', color: 'white' }} 
          />
        </Grid>
        <Grid size="auto">
          <Chip 
            label="Rotation" 
            sx={{ bgcolor: '#ff9800', color: 'white', borderStyle: 'dashed', borderWidth: 2 }} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TreeVisualizer;