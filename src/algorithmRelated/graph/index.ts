// Define a type for related algorithm information
export interface RelatedAlgorithm {
  name: string;
  type?: string;
  description?: string;
}

// Create an object mapping algorithm names to their related algorithms
const GraphRelatedAlgorithms: Record<string, RelatedAlgorithm[]> = {
  'Dijkstra\'s Algorithm': [
    { name: 'Breadth-First Search', type: 'graph', description: 'Finds the shortest path in unweighted graphs' },
    { name: 'A* Search', description: 'An extension of Dijkstra that uses heuristics to improve performance' },
    { name: 'Bellman-Ford', description: 'Can handle graphs with negative edge weights, unlike Dijkstra' }
  ],
  'Breadth-First Search': [
    { name: 'Depth-First Search', type: 'graph' },
    { name: 'Dijkstra\'s Algorithm', type: 'graph', description: 'Extends BFS to handle weighted edges' },
    { name: 'Prim\'s Algorithm', description: 'Uses a similar approach to find minimum spanning trees' }
  ],
  'Depth-First Search': [
    { name: 'Breadth-First Search', type: 'graph' },
    { name: 'Topological Sort', description: 'Uses DFS to sort nodes in a directed acyclic graph' },
    { name: 'Strongly Connected Components', description: 'Uses DFS to find strongly connected components in a graph' }
  ]
};

export default GraphRelatedAlgorithms;