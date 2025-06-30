// Interface for animation frames
interface AnimationFrame {
  graph: Graph;
  currentNode: number | null;
  visitedNodes: number[];
  distances: Record<number, number>;
  previous: Record<number, number | null>;
  path: number[];
  description?: string;
}

// Graph data structure
export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

// Node in the graph
export interface Node {
  id: number;
  label: string;
  x: number;
  y: number;
}

// Edge between nodes
export interface Edge {
  source: number;
  target: number;
  weight: number;
}

export const dijkstra = (graph: Graph, startNodeId: number, endNodeId: number): AnimationFrame[] => {
  const frames: AnimationFrame[] = [];
  const nodes = graph.nodes;
  const edges = graph.edges;
  
  // Initialize distances and previous nodes
  const distances: Record<number, number> = {};
  const previous: Record<number, number | null> = {};
  const unvisited = new Set<number>();
  
  // Initialize all distances as Infinity and previous as null
  nodes.forEach(node => {
    distances[node.id] = node.id === startNodeId ? 0 : Infinity;
    previous[node.id] = null;
    unvisited.add(node.id);
  });
  
  // Add initial frame
  frames.push({
    graph: { ...graph },
    currentNode: null,
    visitedNodes: [],
    distances: { ...distances },
    previous: { ...previous },
    path: [],
    description: `Starting Dijkstra's algorithm from node ${startNodeId}`
  });
  
  // Main algorithm loop
  while (unvisited.size > 0) {
    // Find the unvisited node with the smallest distance
    let current: number | null = null;
    let minDistance = Infinity;
    
    unvisited.forEach(nodeId => {
      if (distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        current = nodeId;
      }
    });
    
    // If no node found or reached the end node
    if (current === null || current === endNodeId || minDistance === Infinity) {
      break;
    }
    
    // Mark current node as visited
    unvisited.delete(current);
    const visitedNodes = nodes
      .filter(node => !unvisited.has(node.id))
      .map(node => node.id);
    
    frames.push({
      graph: { ...graph },
      currentNode: current,
      visitedNodes: [...visitedNodes],
      distances: { ...distances },
      previous: { ...previous },
      path: reconstructPath(previous, current),
      description: `Visiting node ${current} with current distance ${distances[current]}`
    });
    
    // Get all edges from current node
    const neighbors = edges
      .filter(edge => edge.source === current)
      .map(edge => ({
        id: edge.target,
        weight: edge.weight
      }));
    
    // Update distances to neighbors
    for (const neighbor of neighbors) {
      const newDistance = distances[current!] + neighbor.weight;
      
      frames.push({
        graph: { ...graph },
        currentNode: current,
        visitedNodes: [...visitedNodes],
        distances: { ...distances },
        previous: { ...previous },
        path: reconstructPath(previous, current),
        description: `Checking neighbor ${neighbor.id}, current distance: ${distances[neighbor.id]}, new potential distance: ${newDistance}`
      });
      
      if (newDistance < distances[neighbor.id]) {
        distances[neighbor.id] = newDistance;
        previous[neighbor.id] = current;
        
        frames.push({
          graph: { ...graph },
          currentNode: current,
          visitedNodes: [...visitedNodes],
          distances: { ...distances },
          previous: { ...previous },
          path: reconstructPath(previous, neighbor.id),
          description: `Updated distance to node ${neighbor.id} to ${newDistance}`
        });
      }
    }
  }
  
  // Add final frame with the shortest path
  const finalPath = reconstructPath(previous, endNodeId);
  frames.push({
    graph: { ...graph },
    currentNode: null,
    visitedNodes: nodes.filter(node => !unvisited.has(node.id)).map(node => node.id),
    distances: { ...distances },
    previous: { ...previous },
    path: finalPath,
    description: finalPath.length > 0 
      ? `Found shortest path with distance ${distances[endNodeId]}`
      : `No path found to node ${endNodeId}`
  });
  
  return frames;
};

// Helper function to reconstruct the path from start to current node
// Helper function to reconstruct the path from start to current node
const reconstructPath = (previous: Record<number, number | null>, currentId: number): number[] => {
  const path: number[] = [];
  let current: number | null = currentId;
  
  while (current !== null) {
    path.unshift(current);
    // TypeScript needs assurance that current is a number when used as an index
    current = previous[current as number];
  }
  
  return path;
};

// Generate a sample graph for testing
export const generateSampleGraph = (nodeCount = 6, edgeDensity = 0.4): Graph => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  // Create nodes in a circular layout
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * 2 * Math.PI;
    const radius = 150;
    nodes.push({
      id: i,
      label: `${i}`,
      x: Math.cos(angle) * radius + radius + 50,
      y: Math.sin(angle) * radius + radius + 50
    });
  }
  
  // Create edges with some randomness
  for (let i = 0; i < nodeCount; i++) {
    for (let j = 0; j < nodeCount; j++) {
      if (i !== j && Math.random() < edgeDensity) {
        // Calculate Euclidean distance as weight and round to integer
        const weight = Math.round(
          Math.sqrt(
            Math.pow(nodes[i].x - nodes[j].x, 2) + 
            Math.pow(nodes[i].y - nodes[j].y, 2)
          ) / 10
        );
        
        edges.push({
          source: i,
          target: j,
          weight
        });
      }
    }
  }
  
  // Ensure the graph is connected
  for (let i = 0; i < nodeCount - 1; i++) {
    const hasEdge = edges.some(
      edge => (edge.source === i && edge.target === i + 1) || 
              (edge.source === i + 1 && edge.target === i)
    );
    
    if (!hasEdge) {
      const weight = Math.round(
        Math.sqrt(
          Math.pow(nodes[i].x - nodes[i + 1].x, 2) + 
          Math.pow(nodes[i].y - nodes[i + 1].y, 2)
        ) / 10
      );
      
      edges.push({
        source: i,
        target: i + 1,
        weight
      });
    }
  }
  
  return { nodes, edges };
};