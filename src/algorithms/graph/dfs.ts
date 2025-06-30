import { Graph, Node, Edge } from './dijkstra'; // Reuse the Graph interface

// Interface for animation frames
interface AnimationFrame {
  graph: Graph;
  currentNode: number | null;
  visitedNodes: number[];
  stack: number[];
  path: number[];
  description?: string;
}

export const dfs = (graph: Graph, startNodeId: number): AnimationFrame[] => {
  const frames: AnimationFrame[] = [];
  const nodes = graph.nodes;
  const edges = graph.edges;
  
  // Create an adjacency list for faster neighbor lookups
  const adjacencyList: Record<number, number[]> = {};
  
  // Initialize visited nodes set
  const visited = new Set<number>();
  
  // Initialize stack for DFS
  const stack: number[] = [];
  
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
    stack: [],
    path: [],
    description: `Starting DFS from node ${startNodeId}`
  });
  
  // Push the start node to the stack
  stack.push(startNodeId);
  
  frames.push({
    graph: { ...graph },
    currentNode: null,
    visitedNodes: [],
    stack: [...stack],
    path: [],
    description: `Pushed start node ${startNodeId} to the stack`
  });
  
  // Main DFS loop
  while (stack.length > 0) {
    // Pop a node from the stack
    const currentNode = stack.pop()!;
    
    frames.push({
      graph: { ...graph },
      currentNode,
      visitedNodes: Array.from(visited),
      stack: [...stack],
      path: [...path],
      description: `Popped node ${currentNode} from stack`
    });
    
    // Skip if already visited
    if (visited.has(currentNode)) {
      frames.push({
        graph: { ...graph },
        currentNode,
        visitedNodes: Array.from(visited),
        stack: [...stack],
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
      stack: [...stack],
      path: [...path],
      description: `Marked node ${currentNode} as visited`
    });
    
    // Get neighbors
    const neighbors = adjacencyList[currentNode];
    
    // Push neighbors to stack in reverse order so they're processed in the correct order
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        
        frames.push({
          graph: { ...graph },
          currentNode,
          visitedNodes: Array.from(visited),
          stack: [...stack],
          path: [...path],
          description: `Pushed unvisited neighbor ${neighbor} to stack`
        });
      } else {
        frames.push({
          graph: { ...graph },
          currentNode,
          visitedNodes: Array.from(visited),
          stack: [...stack],
          path: [...path],
          description: `Neighbor ${neighbor} has already been visited, not pushing to stack`
        });
      }
    }
    
    if (stack.length === 0) {
      frames.push({
        graph: { ...graph },
        currentNode: null,
        visitedNodes: Array.from(visited),
        stack: [],
        path: [...path],
        description: `DFS traversal complete! All reachable nodes have been visited.`
      });
    }
  }
  
  return frames;
};