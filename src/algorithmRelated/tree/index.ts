// Define a type for related algorithm information
export interface RelatedAlgorithm {
  name: string;
  type?: string;
  description?: string;
}

// Create an object mapping algorithm names to their related algorithms
const TreeRelatedAlgorithms: Record<string, RelatedAlgorithm[]> = {
  'Red-Black Tree': [
    { name: 'AVL Tree', type: 'tree', description: 'Another self-balancing binary search tree with stricter balance' },
    { name: 'B-Tree', description: 'A self-balancing tree data structure that maintains sorted data for databases and file systems' },
    { name: 'Binary Search Tree', type: 'tree', description: 'A simple binary tree without balancing properties' }
  ],
  'AVL Tree': [
    { name: 'Red-Black Tree', type: 'tree' },
    { name: 'Binary Search Tree', type: 'tree', description: 'A simple binary tree without balancing properties' },
    { name: '2-3 Tree', description: 'A self-balancing tree where each node can have 2 or 3 children' }
  ],
  'Binary Search Tree': [
    { name: 'Red-Black Tree', type: 'tree', description: 'A self-balancing BST with relaxed balance' },
    { name: 'AVL Tree', type: 'tree', description: 'A self-balancing BST with strict balance' },
    { name: 'Heap', description: 'A specialized tree-based data structure for priority queues' }
  ]
};

export default TreeRelatedAlgorithms;