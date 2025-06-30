import { Graph, Node, Edge } from './dijkstra'; // Reuse the Graph interface

// Interface for animation frames
interface AnimationFrame {
  graph: Graph;
  currentNode: number | null;
  visitedNodes: number[];
  queue: number[];
  path: number[];
  description?: string;
}

export const bfs = (graph: Graph, startNodeId: number): AnimationFrame[] => {
  const frames: AnimationFrame[] = [];
  const nodes = graph.nodes;
  const edges = graph.edges;
  
  // Create an adjacency list for faster neighbor lookups
  const adjacencyList: Record<number, number[]> = {};
  
  // Initialize visited nodes set
  const visited = new Set<number>();
  
  // Initialize queue for BFS
  const queue: number[] = [];
  
  // Initialize path to record the traversal order
  const path: number[] = [];
  
  // Build adjacency list
  nodes.forEach(node => {
    adjacencyList[node.id] = [];
  });
  
  edges.forEach(edge => {
    adjacencyList[edge.source].push(edge.target);
  });
  
  // Add initial frame
  frames.push({
    graph: { ...graph },
    currentNode: null,
    visitedNodes: [],
    queue: [],
    path: [],
    description: `Starting BFS from node ${startNodeId}`
  });
  
  // Enqueue the start node
  queue.push(startNodeId);
  
  frames.push({
    graph: { ...graph },
    currentNode: null,
    visitedNodes: [],
    queue: [...queue],
    path: [],
    description: `Enqueued start node ${startNodeId}`
  });
  
  // Main BFS loop
  while (queue.length > 0) {
    // Dequeue a node
    const currentNode = queue.shift()!;
    
    frames.push({
      graph: { ...graph },
      currentNode,
      visitedNodes: Array.from(visited),
      queue: [...queue],
      path: [...path],
      description: `Dequeued node ${currentNode}`
    });
    
    // Skip if already visited
    if (visited.has(currentNode)) {
      frames.push({
        graph: { ...graph },
        currentNode,
        visitedNodes: Array.from(visited),
        queue: [...queue],
        path: [...path],
        description: `Node ${currentNode} has already been visited, skipping`
      });
      continue;
    }
    
    // Mark as visited
    visited.add(currentNode);
    path.push(currentNode);
    
    frames.push({
      graph: { ...graph },
      currentNode,
      visitedNodes: Array.from(visited),
      queue: [...queue],
      path: [...path],
      description: `Marked node ${currentNode} as visited`
    });
    
    // Get neighbors
    const neighbors = adjacencyList[currentNode];
    
    // Enqueue unvisited neighbors
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && !queue.includes(neighbor)) {
        queue.push(neighbor);
        
        frames.push({
          graph: { ...graph },
          currentNode,
          visitedNodes: Array.from(visited),
          queue: [...queue],
          path: [...path],
          description: `Enqueued unvisited neighbor ${neighbor}`
        });
      } else {
        frames.push({
          graph: { ...graph },
          currentNode,
          visitedNodes: Array.from(visited),
          queue: [...queue],
          path: [...path],
          description: `Neighbor ${neighbor} has already been ${visited.has(neighbor) ? 'visited' : 'enqueued'}, not enqueueing`
        });
      }
    }
    
    if (queue.length === 0) {
      frames.push({
        graph: { ...graph },
        currentNode: null,
        visitedNodes: Array.from(visited),
        queue: [],
        path: [...path],
        description: `BFS traversal complete! All reachable nodes have been visited.`
      });
    }
  }
  
  return frames;
};