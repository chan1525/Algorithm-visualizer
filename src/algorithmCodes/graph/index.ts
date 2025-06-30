import DijkstraCode from './dijkstraCode';
import DFSCode from './dfsCode';

// Create an object that maps algorithm names to their code implementations
const GraphCodes: Record<string, Record<string, string>> = {
  'Dijkstra\'s Algorithm': DijkstraCode,
  'Depth-First Search': DFSCode
};

export default GraphCodes;