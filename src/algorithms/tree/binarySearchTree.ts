// Define Binary Search Tree node
export interface BSTNode {
  key: number;
  left: BSTNode | null;
  right: BSTNode | null;
  parent: BSTNode | null;
}

// Frame for animation
export interface AnimationFrame {
  tree: BSTNode | null;
  highlightedNodes: number[];
  changedNodes: number[];
  description?: string;
}

// Create a new BST node
export function createNode(key: number): BSTNode {
  return {
    key,
    left: null,
    right: null,
    parent: null
  };
}

// Deep clone a BST
export function cloneTree(node: BSTNode | null): BSTNode | null {
  if (node === null) return null;
  
  const clone: BSTNode = {
    key: node.key,
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

// Insert a key into the BST
export function insertKey(root: BSTNode | null, key: number): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  
  // First frame showing the initial tree
  frames.push({
    tree: cloneTree(root),
    highlightedNodes: [],
    changedNodes: [],
    description: `Starting insertion of key ${key}`
  });
  
  // If tree is empty, create a new root
  if (root === null) {
    const newRoot = createNode(key);
    
    frames.push({
      tree: cloneTree(newRoot),
      highlightedNodes: [],
      changedNodes: [key],
      description: `Inserted ${key} as the root of an empty tree`
    });
    
    return frames;
  }
  
  // Function to recursively insert
  function insertRecursive(node: BSTNode, insertKey: number): BSTNode {
    // Compare with current node
    frames.push({
      tree: cloneTree(root),
      highlightedNodes: [node.key],
      changedNodes: [],
      description: `Comparing ${insertKey} with ${node.key}`
    });
    
    if (insertKey < node.key) {
      frames.push({
        tree: cloneTree(root),
        highlightedNodes: [node.key],
        changedNodes: [],
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
        description: `Key ${insertKey} already exists in the tree, no insertion needed`
      });
    }
    
    return node;
  }
  
  // Start the recursive insertion
  const newRoot = insertRecursive(root, key);
  
  // Final frame showing the updated tree
  frames.push({
    tree: cloneTree(newRoot),
    highlightedNodes: [],
    changedNodes: [],
    description: `Insertion complete`
  });
  
  return frames;
}

// Search for a key in the BST
export function searchKey(root: BSTNode | null, key: number): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  
  // First frame showing the initial tree
  frames.push({
    tree: cloneTree(root),
    highlightedNodes: [],
    changedNodes: [],
    description: `Starting search for key ${key}`
  });
  
  // If tree is empty, search fails
  if (root === null) {
    frames.push({
      tree: null,
      highlightedNodes: [],
      changedNodes: [],
      description: `Tree is empty, search failed`
    });
    
    return frames;
  }
  
  // Function to recursively search
  function searchRecursive(node: BSTNode | null, searchKey: number): boolean {
    if (node === null) {
      frames.push({
        tree: cloneTree(root),
        highlightedNodes: [],
        changedNodes: [],
        description: `Reached a null node, key ${searchKey} not found`
      });
      
      return false;
    }
    
    // Compare with current node
    frames.push({
      tree: cloneTree(root),
      highlightedNodes: [node.key],
      changedNodes: [],
      description: `Comparing ${searchKey} with ${node.key}`
    });
    
    if (searchKey === node.key) {
      frames.push({
        tree: cloneTree(root),
        highlightedNodes: [node.key],
        changedNodes: [node.key],
        description: `Found key ${searchKey}!`
      });
      
      return true;
    } else if (searchKey < node.key) {
      frames.push({
        tree: cloneTree(root),
        highlightedNodes: [node.key],
        changedNodes: [],
        description: `${searchKey} is less than ${node.key}, going left`
      });
      
      return searchRecursive(node.left, searchKey);
    } else {
      frames.push({
        tree: cloneTree(root),
        highlightedNodes: [node.key],
        changedNodes: [],
        description: `${searchKey} is greater than ${node.key}, going right`
      });
      
      return searchRecursive(node.right, searchKey);
    }
  }
  
  // Start the recursive search
  searchRecursive(root, key);
  
  // Final frame
  frames.push({
    tree: cloneTree(root),
    highlightedNodes: [],
    changedNodes: [],
    description: `Search complete`
  });
  
  return frames;
}

// Generate a sample BST with inserted keys
export function generateSampleTree(keys: number[] = [30, 20, 40, 10, 25, 35, 50]): AnimationFrame[] {
  let root: BSTNode | null = null;
  const frames: AnimationFrame[] = [];
  
  // Add initial frame
  frames.push({
    tree: null,
    highlightedNodes: [],
    changedNodes: [],
    description: 'Starting with an empty Binary Search Tree'
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
    description: 'Binary Search Tree construction complete'
  });
  
  return frames;
}