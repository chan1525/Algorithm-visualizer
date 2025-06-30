import React from 'react';
import DijkstraExplanation from './dijkstraExplanation';

// Create an object that maps algorithm names to their explanation components
const GraphExplanations: Record<string, React.ComponentType> = {
  'Dijkstra\'s Algorithm': DijkstraExplanation
};

export default GraphExplanations;