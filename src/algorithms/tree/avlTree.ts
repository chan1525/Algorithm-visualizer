// Define AVL Tree node
export interface AVLNode {
  key: number;
  height: number;
  left: AVLNode | null;
  right: AVLNode | null;
  parent: AVLNode | null;
}

// Frame for animation
export interface AnimationFrame {
  tree: AVLNode | null;
  highlightedNodes: number[];
  changedNodes: number[];
  rotationEdge?: { from: number; to: number };
  balanceFactor?: Record<number, number>;
  description?: string;
}

// Create a new AVL Tree node
export function createNode(key: number): AVLNode {
  return {
    key,
    height: 1,  // New node is added at leaf with height 1
    left: null,
    right: null,
    parent: null
  };
}

// Deep clone an AVL Tree
export function cloneTree(node: AVLNode | null): AVLNode | null {
  if (node === null) return null;
  
  const clone: AVLNode = {
    key: node.key,
    height: node.height,
    left: null,
    right: null,
    parent: null
  };
  
  if (node.left) {
    clone.left = cloneTree(node.left);
    clone.left!.parent = clone;
  }
  
  if (node.right) {
    clone.right = cloneTree(node.right);
    clone.right!.parent = clone;
  }
  
  return clone;
}

// Get height of a node
function getHeight(node: AVLNode | null): number {
  return node ? node.height : 0;
}

// Calculate balance factor for a node
function getBalanceFactor(node: AVLNode): number {
  return getHeight(node.left) - getHeight(node.right);
}

// Update height of a node based on its children's heights
function updateHeight(node: AVLNode): void {
  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

// Calculate balance factors for all nodes
function calculateBalanceFactors(node: AVLNode | null): Record<number, number> {
  const factors: Record<number, number> = {};
  
  function traverse(current: AVLNode | null) {
    if (current === null) return;
    
    factors[current.key] = getBalanceFactor(current);
    traverse(current.left);
    traverse(current.right);
  }
  
  traverse(node);
  return factors;
}

// Right rotation
function rightRotate(node: AVLNode): AVLNode {
  const x = node.left!; // We know left exists because this is called only when left subtree is taller
  const T2 = x.right;
  
  // Perform rotation
  x.right = node;
  node.left = T2;
  
  // Update parent references
  x.parent = node.parent;
  node.parent = x;
  if (T2) T2.parent = node;
  
  // Update heights
  updateHeight(node);
  updateHeight(x);
  
  // Return new root
  return x;
}

// Left rotation
function leftRotate(node: AVLNode): AVLNode {
  const y = node.right!; // We know right exists because this is called only when right subtree is taller
  const T2 = y.left;
  
  // Perform rotation
  y.left = node;
  node.right = T2;
  
  // Update parent references
  y.parent = node.parent;
  node.parent = y;
  if (T2) T2.parent = node;
  
  // Update heights
  updateHeight(node);
  updateHeight(y);
  
  // Return new root
  return y;
}

// Rebalance the tree and return the new root
function rebalance(node: AVLNode, frames: AnimationFrame[]): AVLNode {
  // Update height of current node
  updateHeight(node);
  
  // Calculate balance factor
  const balanceFactor = getBalanceFactor(node);
  const balanceFactors = calculateBalanceFactors(node);
  
  // Show the balance factors
  frames.push({
    tree: cloneTree(node),
    highlightedNodes: [node.key],
    changedNodes: [],
    balanceFactor: balanceFactors,
    description: `Checking balance at node ${node.key}. Balance factor: ${balanceFactor}`
  });
  
  // Left-Left Case: Right rotation
  if (balanceFactor > 1 && getBalanceFactor(node.left!) >= 0) {
    frames.push({
      tree: cloneTree(node),
      highlightedNodes: [node.key, node.left!.key],
      changedNodes: [],
      balanceFactor: balanceFactors,
      description: `Left-Left Case: Performing right rotation at node ${node.key}`
    });
    
    const newRoot = rightRotate(node);
    
    frames.push({
      tree: cloneTree(newRoot),
      highlightedNodes: [],
      changedNodes: [newRoot.key, newRoot.right!.key],
      rotationEdge: { from: node.key, to: node.left!.key },
      balanceFactor: calculateBalanceFactors(newRoot),
      description: `Completed right rotation. ${newRoot.key} is now the parent of ${newRoot.right!.key}`
    });
    
    return newRoot;
  }
  
  // Right-Right Case: Left rotation
  if (balanceFactor < -1 && getBalanceFactor(node.right!) <= 0) {
    frames.push({
      tree: cloneTree(node),
      highlightedNodes: [node.key, node.right!.key],
      changedNodes: [],
      balanceFactor: balanceFactors,
      description: `Right-Right Case: Performing left rotation at node ${node.key}`
    });
    
    const newRoot = leftRotate(node);
    
    frames.push({
      tree: cloneTree(newRoot),
      highlightedNodes: [],
      changedNodes: [newRoot.key, newRoot.left!.key],
      rotationEdge: { from: node.key, to: node.right!.key },
      balanceFactor: calculateBalanceFactors(newRoot),
      description: `Completed left rotation. ${newRoot.key} is now the parent of ${newRoot.left!.key}`
    });
    
    return newRoot;
  }
  
  // Left-Right Case: Left rotation then right rotation
  if (balanceFactor > 1 && getBalanceFactor(node.left!) < 0) {
    frames.push({
      tree: cloneTree(node),
      highlightedNodes: [node.key, node.left!.key, node.left!.right!.key],
      changedNodes: [],
      balanceFactor: balanceFactors,
      description: `Left-Right Case: First performing left rotation at node ${node.left!.key}`
    });
    
    node.left = leftRotate(node.left!);
    node.left.parent = node;
    
    frames.push({
      tree: cloneTree(node),
      highlightedNodes: [node.key, node.left!.key],
      changedNodes: [node.left!.key, node.left!.left!.key],
      rotationEdge: { from: node.left!.left!.key, to: node.left!.key },
      balanceFactor: calculateBalanceFactors(node),
      description: `Then performing right rotation at node ${node.key}`
    });
    
    const newRoot = rightRotate(node);
    
    frames.push({
      tree: cloneTree(newRoot),
      highlightedNodes: [],
      changedNodes: [newRoot.key, newRoot.right!.key],
      rotationEdge: { from: node.key, to: newRoot.key },
      balanceFactor: calculateBalanceFactors(newRoot),
      description: `Completed left-right rotations. Tree is now balanced.`
    });
    
    return newRoot;
  }
  
  // Right-Left Case: Right rotation then left rotation
  if (balanceFactor < -1 && getBalanceFactor(node.right!) > 0) {
    frames.push({
      tree: cloneTree(node),
      highlightedNodes: [node.key, node.right!.key, node.right!.left!.key],
      changedNodes: [],
      balanceFactor: balanceFactors,
      description: `Right-Left Case: First performing right rotation at node ${node.right!.key}`
    });
    
    node.right = rightRotate(node.right!);
    node.right.parent = node;
    
    frames.push({
      tree: cloneTree(node),
      highlightedNodes: [node.key, node.right!.key],
      changedNodes: [node.right!.key, node.right!.right!.key],
      rotationEdge: { from: node.right!.right!.key, to: node.right!.key },
      balanceFactor: calculateBalanceFactors(node),
      description: `Then performing left rotation at node ${node.key}`
    });
    
    const newRoot = leftRotate(node);
    
    frames.push({
      tree: cloneTree(newRoot),
      highlightedNodes: [],
      changedNodes: [newRoot.key, newRoot.left!.key],
      rotationEdge: { from: node.key, to: newRoot.key },
      balanceFactor: calculateBalanceFactors(newRoot),
      description: `Completed right-left rotations. Tree is now balanced.`
    });
    
    return newRoot;
  }
  
  // No rotation needed
  return node;
}

// Insert a key into the AVL Tree
export function insertKey(root: AVLNode | null, key: number): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  
  // First frame showing the initial tree
  frames.push({
    tree: cloneTree(root),
    highlightedNodes: [],
    changedNodes: [],
    balanceFactor: root ? calculateBalanceFactors(root) : {},
    description: `Starting insertion of key ${key}`
  });
  
  // If tree is empty, create a new root
  if (root === null) {
    const newRoot = createNode(key);
    
    frames.push({
      tree: cloneTree(newRoot),
      highlightedNodes: [],
      changedNodes: [key],
      balanceFactor: { [key]: 0 },
      description: `Inserted ${key} as the root of an empty tree`
    });
    
    return frames;
  }
  
  // Function to recursively insert and rebalance
  function insertRecursive(node: AVLNode, insertKey: number): AVLNode {
    // Standard BST insertion
    frames.push({
      tree: cloneTree(root),
      highlightedNodes: [node.key],
      changedNodes: [],
      balanceFactor: calculateBalanceFactors(root),
      description: `Comparing ${insertKey} with ${node.key}`
    });
    
    if (insertKey < node.key) {
      frames.push({
        tree: cloneTree(root),
        highlightedNodes: [node.key],
        changedNodes: [],
        balanceFactor: calculateBalanceFactors(root),
        description: `${insertKey} is less than ${node.key}, going left`
      });
      
      if (node.left === null) {
        // Insert new node
        const newNode = createNode(insertKey);
        newNode.parent = node;
        node.left = newNode;
        
        frames.push({
          tree: cloneTree(root),
          highlightedNodes: [],
          changedNodes: [insertKey],
          balanceFactor: calculateBalanceFactors(root),
          description: `Inserted ${insertKey} as left child of ${node.key}`
        });
      } else {
        node.left = insertRecursive(node.left, insertKey);
        node.left.parent = node;
      }
    } else if (insertKey > node.key) {
      frames.push({
        tree: cloneTree(root),
        highlightedNodes: [node.key],
        changedNodes: [],
        balanceFactor: calculateBalanceFactors(root),
        description: `${insertKey} is greater than ${node.key}, going right`
      });
      
      if (node.right === null) {
        // Insert new node
        const newNode = createNode(insertKey);
        newNode.parent = node;
        node.right = newNode;
        
        frames.push({
          tree: cloneTree(root),
          highlightedNodes: [],
          changedNodes: [insertKey],
          balanceFactor: calculateBalanceFactors(root),
          description: `Inserted ${insertKey} as right child of ${node.key}`
        });
      } else {
        node.right = insertRecursive(node.right, insertKey);
        node.right.parent = node;
      }
    } else {
      // Key already exists
      frames.push({
        tree: cloneTree(root),
        highlightedNodes: [node.key],
        changedNodes: [],
        balanceFactor: calculateBalanceFactors(root),
        description: `Key ${insertKey} already exists in the tree, no insertion needed`
      });
      
      return node;
    }
    
    // Rebalance the tree after insertion
    return rebalance(node, frames);
  }
  
  // Start the recursive insertion
  const newRoot = insertRecursive(root, key);
  
  // Final frame showing the balanced tree
  frames.push({
    tree: cloneTree(newRoot),
    highlightedNodes: [],
    changedNodes: [],
    balanceFactor: calculateBalanceFactors(newRoot),
    description: `Insertion complete. Tree is balanced.`
  });
  
  return frames;
}

// Generate a sample AVL Tree with inserted keys
export function generateSampleTree(keys: number[] = [30, 20, 40, 10, 25, 35, 50]): AnimationFrame[] {
  let root: AVLNode | null = null;
  const frames: AnimationFrame[] = [];
  
  // Add initial frame
  frames.push({
    tree: null,
    highlightedNodes: [],
    changedNodes: [],
    description: 'Starting with an empty AVL Tree'
  });
  
  // Insert keys one by one
  for (const key of keys) {
    const insertFrames = insertKey(root, key);
    
    // Update the root after each insertion
    if (insertFrames.length > 0) {
      root = insertFrames[insertFrames.length - 1].tree;
    }
    
    frames.push(...insertFrames);
  }
  
  // Add final state
  frames.push({
    tree: cloneTree(root),
    highlightedNodes: [],
    changedNodes: [],
    balanceFactor: root ? calculateBalanceFactors(root) : {},
    description: 'AVL Tree construction complete'
  });
  
  return frames;
}