import DijkstraCode from './dijkstraCode';

// Create an object that maps algorithm names to their code implementations
const GraphCodes: Record<string, Record<string, string>> = {
  'Dijkstra\'s Algorithm': DijkstraCode,
};

export default GraphCodes;