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
import { dijkstra, generateSampleGraph, Graph, Node, Edge } from '../../../algorithms/graph/dijkstra';
import { dfs, bfs } from '../../../algorithms/graph';

// Update the AnimationFrame interface to include stack for DFS
// Update the AnimationFrame interface to include queue for BFS
interface AnimationFrame {
  graph: Graph;
  currentNode: number | null;
  visitedNodes: number[];
  distances?: Record<number, number>;
  previous?: Record<number, number | null>;
  path: number[];
  stack?: number[]; // For DFS
  queue?: number[]; // For BFS
  description?: string;
}

interface GraphVisualizerProps {
  algorithm: AlgorithmConfig;
  onPerformanceUpdate?: (data: any) => void;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ 
  algorithm,
  onPerformanceUpdate 
}) => {
  const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
  const [animationFrames, setAnimationFrames] = useState<AnimationFrame[]>([]);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [nodeCount, setNodeCount] = useState<number>(6);
  const [startNode, setStartNode] = useState<number>(0);
  const [endNode, setEndNode] = useState<number>(5);
  const [animationSpeed, setAnimationSpeed] = useState<number>(500); // ms per frame
  const [currentAlgorithm, setCurrentAlgorithm] = useState<'dijkstra' | 'dfs' | 'bfs'>('dijkstra');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate a sample graph on mount
  useEffect(() => {
    console.log("GraphVisualizer initialized with algorithm:", algorithm?.name);
    
    // Set the current algorithm based on name
    if (algorithm && algorithm.name) {
      if (algorithm.name.includes('Depth')) {
        setCurrentAlgorithm('dfs');
      } else {
        setCurrentAlgorithm('dijkstra');
      }
    }
    
    const newGraph = generateSampleGraph(nodeCount);
    setGraph(newGraph);
    setStartNode(0);
    setEndNode(Math.min(5, nodeCount - 1));
    
    // Generate initial animation frames with a slight delay to ensure components are ready
    setTimeout(() => {
      generateAnimationFrames(newGraph, 0, Math.min(5, nodeCount - 1));
    }, 500);
  }, [algorithm, nodeCount]);

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

  // Draw the graph whenever the current frame changes
  useEffect(() => {
    if (animationFrames.length > 0 && currentFrame < animationFrames.length) {
      drawGraph(animationFrames[currentFrame]);
    }
  }, [currentFrame, animationFrames, currentAlgorithm]);

  const generateAnimationFrames = (
  graphData: Graph, 
  start: number, 
  end: number
) => {
  // Reset current frame
  setCurrentFrame(0);
  
  // Initialize performance tracking
  const startTime = performance.now();
  
  // Run the appropriate algorithm
  try {
    let frames;
    
    if (algorithm && algorithm.name.includes('Depth')) {
      // Run DFS
      frames = dfs(graphData, start);
      setCurrentAlgorithm('dfs');
    } else if (algorithm && algorithm.name.includes('Breadth')) {
      // Run BFS
      frames = bfs(graphData, start);
      setCurrentAlgorithm('bfs');
    } else {
      // Run Dijkstra's by default
      frames = dijkstra(graphData, start, end);
      setCurrentAlgorithm('dijkstra');
    }
    
    setAnimationFrames(frames);
    
    // Calculate performance metrics
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    // Count operations
    let nodeVisits = 0;
    let operations = 0;
    
    for (const frame of frames) {
      if (frame.currentNode !== null) {
        nodeVisits++;
        // Count operations based on current algorithm
        if (currentAlgorithm === 'dijkstra' && frame.description?.includes('Updated distance')) {
          operations++;
        } else if (currentAlgorithm === 'dfs' && frame.description?.includes('Pushed unvisited neighbor')) {
          operations++;
        } else if (currentAlgorithm === 'bfs' && frame.description?.includes('Enqueued unvisited neighbor')) {
          operations++;
        }
      }
    }
    
    // Estimate memory usage
    const memoryUsage = graphData.nodes.length * 24 + 
                       graphData.edges.length * 12 + 
                       frames.length * 200;
    
    // Update performance metrics
    const newPerformanceData = {
      executionTime,
      memoryUsage,
      comparisons: nodeVisits,
      swaps: operations
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

 const drawGraph = (frame: AnimationFrame) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw edges
  frame.graph.edges.forEach(edge => {
    const sourceNode = frame.graph.nodes.find(n => n.id === edge.source);
    const targetNode = frame.graph.nodes.find(n => n.id === edge.target);
    
    if (sourceNode && targetNode) {
      let isInPath = false;
      
      // Different path checking for different algorithms
      if (currentAlgorithm === 'dijkstra') {
        isInPath = Boolean(
          frame.path && 
          frame.path.includes(edge.source) && 
          frame.path.includes(edge.target) &&
          frame.previous && 
          (frame.previous[edge.target] === edge.source || 
           frame.previous[edge.source] === edge.target)
        );
      } else if (currentAlgorithm === 'dfs') {
        // For DFS, highlight edges that connect sequential nodes in the path
        const sourceIndex = frame.path ? frame.path.indexOf(edge.source) : -1;
        const targetIndex = frame.path ? frame.path.indexOf(edge.target) : -1;
        isInPath = Boolean(
          sourceIndex !== -1 && 
          targetIndex !== -1 && 
          Math.abs(sourceIndex - targetIndex) === 1
        );
      }
      
      // Set edge style
      ctx.beginPath();
      ctx.lineWidth = isInPath ? 3 : 1;
      ctx.strokeStyle = isInPath ? '#f44336' : '#999999';
      
      // Draw the edge
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      ctx.stroke();
      
      // Draw the weight
      const midX = (sourceNode.x + targetNode.x) / 2;
      const midY = (sourceNode.y + targetNode.y) / 2;
      
      ctx.fillStyle = '#000000';
      ctx.font = '12px Arial';
      ctx.fillText(edge.weight.toString(), midX, midY);
    }
  });
  
  // Draw nodes
  frame.graph.nodes.forEach(node => {
    const isStart = node.id === startNode;
    const isEnd = currentAlgorithm === 'dijkstra' ? node.id === endNode : false;
    const isCurrent = node.id === frame.currentNode;
    const isVisited = Boolean(frame.visitedNodes && frame.visitedNodes.includes(node.id));
    const isInPath = Boolean(frame.path && frame.path.includes(node.id));
    
    // Set node style
    ctx.beginPath();
    
    if (isStart) {
      ctx.fillStyle = '#4caf50'; // Green for start
    } else if (isEnd) {
      ctx.fillStyle = '#f44336'; // Red for end
    } else if (isCurrent) {
      ctx.fillStyle = '#ff9800'; // Orange for current
    } else if (isInPath) {
      ctx.fillStyle = '#e91e63'; // Pink for path
    } else if (isVisited) {
      ctx.fillStyle = '#2196f3'; // Blue for visited
    } else {
      ctx.fillStyle = '#9e9e9e'; // Gray for unvisited
    }
    
    // Draw the node
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw node label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.label, node.x, node.y);
    
    // Draw additional info for Dijkstra's algorithm
    if (currentAlgorithm === 'dijkstra' && frame.distances && frame.distances[node.id] !== Infinity) {
      ctx.fillStyle = '#000000';
      ctx.font = '10px Arial';
      ctx.fillText(
        `d: ${frame.distances[node.id]}`, 
        node.x, 
        node.y + 25
      );
    }
  });
  
  // Draw stack for DFS if available
  if (currentAlgorithm === 'dfs' && frame.stack) {
    ctx.fillStyle = '#000000';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Stack: [${frame.stack.join(', ')}]`, 10, 20);
  }
  // Draw queue for BFS if available (similar to stack for DFS)
if (currentAlgorithm === 'bfs' && frame.queue) {
  ctx.fillStyle = '#000000';
  ctx.font = '14px Arial';
  ctx.textAlign = 'left';
  ctx.fillText(`Queue: [${frame.queue.join(', ')}]`, 10, 20);
}
};

  const regenerateGraph = () => {
    const newGraph = generateSampleGraph(nodeCount);
    setGraph(newGraph);
    generateAnimationFrames(newGraph, startNode, endNode);
  };

  const handleNodeCountChange = (event: Event, newValue: number | number[]) => {
    const count = newValue as number;
    setNodeCount(count);
  };

  const handleStartNodeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const node = event.target.value as number;
    setStartNode(node);
    generateAnimationFrames(graph, node, endNode);
  };

  const handleEndNodeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const node = event.target.value as number;
    setEndNode(node);
    generateAnimationFrames(graph, startNode, node);
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
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography id="node-count-slider" gutterBottom>
            Node Count: {nodeCount}
          </Typography>
          <Slider
            value={nodeCount}
            onChange={handleNodeCountChange}
            aria-labelledby="node-count-slider"
            min={3}
            max={15}
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

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="start-node-label">Start Node</InputLabel>
            <Select
              labelId="start-node-label"
              id="start-node"
              value={startNode}
              label="Start Node"
              onChange={handleStartNodeChange as any}
            >
              {graph.nodes.map(node => (
                <MenuItem key={node.id} value={node.id}>
                  Node {node.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {currentAlgorithm === 'dijkstra' && (
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="end-node-label">End Node</InputLabel>
              <Select
                labelId="end-node-label"
                id="end-node"
                value={endNode}
                label="End Node"
                onChange={handleEndNodeChange as any}
              >
                {graph.nodes.map(node => (
                  <MenuItem key={node.id} value={node.id}>
                    Node {node.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: currentAlgorithm === 'dijkstra' ? 4 : 8 }}>
          <Button 
            variant="outlined" 
            fullWidth
            onClick={regenerateGraph}
          >
            Regenerate Graph
          </Button>
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
            width={600} 
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
            onClick={() => {
              // Force recalculation of performance metrics
              const currentGraph = graph;
              const currentStart = startNode;
              const currentEnd = endNode;
              
              // Generate frames and calculate metrics
              generateAnimationFrames(currentGraph, currentStart, currentEnd);
            }}
          >
            Calculate Metrics
          </Button>
        </Grid>
      </Grid>
      
      <Grid container spacing={2}>
        <Grid size="auto">
          <Chip 
            label="Start Node" 
            sx={{ bgcolor: '#4caf50', color: 'white' }} 
          />
        </Grid>
        {currentAlgorithm === 'dijkstra' && (
          <Grid size="auto">
            <Chip 
              label="End Node" 
              sx={{ bgcolor: '#f44336', color: 'white' }} 
            />
          </Grid>
        )}
        <Grid size="auto">
          <Chip 
            label="Current Node" 
            sx={{ bgcolor: '#ff9800', color: 'white' }} 
          />
        </Grid>
        <Grid size="auto">
          <Chip 
            label="Visited Node" 
            sx={{ bgcolor: '#2196f3', color: 'white' }} 
          />
        </Grid>
        <Grid size="auto">
          <Chip 
            label="Path Node" 
            sx={{ bgcolor: '#e91e63', color: 'white' }} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GraphVisualizer;