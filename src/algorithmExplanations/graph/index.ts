import React from 'react';
import DijkstraExplanation from './dijkstraExplanation';
import DFSExplanation from './dfsExplanation';

// Create an object that maps algorithm names to their explanation components
const GraphExplanations: Record<string, React.ComponentType> = {
  'Dijkstra\'s Algorithm': DijkstraExplanation,
  'Depth-First Search': DFSExplanation
};

export default GraphExplanations;