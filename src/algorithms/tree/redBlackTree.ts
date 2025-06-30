// Define Red-Black Tree node colors
export enum Color {
  RED = "red",
  BLACK = "black"
}

// Node structure for Red-Black Tree
export interface RBNode {
  key: number;
  color: Color;
  left: RBNode | null;
  right: RBNode | null;
  parent: RBNode | null;
}

// Frame for animation
export interface AnimationFrame {
  tree: RBNode | null;
  highlightedNodes: number[];
  changedNodes: number[];
  rotationEdge?: { from: number; to: number };
  description?: string;
}

// Create a new Red-Black Tree node
export function createNode(key: number, color: Color = Color.RED): RBNode {
  return {
    key,
    color,
    left: null,
    right: null,
    parent: null
  };
}

// Deep clone a Red-Black Tree node
// Deep clone a Red-Black Tree node
export function cloneTree(node: RBNode | null): RBNode | null {
  if (node === null) return null;
  
  const clone: RBNode = {
    key: node.key,
    color: node.color,
    left: null,
    right: null,
    parent: null
  };
  
  if (node.left) {
    clone.left = cloneTree(node.left);
    // Add non-null assertion since we know clone.left exists here
    clone.left!.parent = clone;
  }
  
  if (node.right) {
    clone.right = cloneTree(node.right);
    // Add non-null assertion since we know clone.right exists here
    clone.right!.parent = clone;
  }
  
  return clone;
}

// Insert a new key into the Red-Black Tree
export function insertKey(root: RBNode | null, key: number): AnimationFrame[] {
  const frames: AnimationFrame[] = [];
  
  // Start with an empty tree
  if (root === null) {
    const newRoot = createNode(key, Color.BLACK);
    frames.push({
      tree: cloneTree(newRoot),
      highlightedNodes: [key],
      changedNodes: [key],
      description: `Created new tree with root node ${key} (BLACK)`
    });
    
    return frames;
  }
  
  // Step 1: Perform standard BST insert
  let newRoot = cloneTree(root);
  // TypeScript non-null assertion since we know newRoot is not null here
  const newNode = performBSTInsert(newRoot!, key, frames);
  
  // If newNode is null, key already exists, stop here
  if (!newNode) return frames;
  
  // Step 2: Fix Red-Black Tree violations
  // TypeScript non-null assertion since we know both arguments are not null here
  fixRedBlackTreeViolations(newRoot!, newNode, frames);
  
  return frames;
}
  
  

// Perform standard BST insertion and return the newly inserted node
function performBSTInsert(root: RBNode, key: number, frames: AnimationFrame[]): RBNode | null {
  let current: RBNode = root;
  let parent: RBNode | null = null;
  
  // Find the position to insert the new node
  while (current !== null) {
    frames.push({
      tree: cloneTree(root),
      highlightedNodes: [current.key],
      changedNodes: [],
      description: `Comparing ${key} with ${current.key}`
    });
    
    parent = current;
    
    if (key < current.key) {
      current = current.left as RBNode;
      frames.push({
        tree: cloneTree(root),
        highlightedNodes: [parent.key],
        changedNodes: [],
        description: `${key} is less than ${parent.key}, going to left child`
      });
    } else if (key > current.key) {
      current = current.right as RBNode;
      frames.push({
        tree: cloneTree(root),
        highlightedNodes: [parent.key],
        changedNodes: [],
        description: `${key} is greater than ${parent.key}, going to right child`
      });
    } else {
      // Key already exists
      frames.push({
        tree: cloneTree(root),
        highlightedNodes: [current.key],
        changedNodes: [],
        description: `Node ${key} already exists in the tree, no insertion needed`
      });
      return null;
    }
  }
  
  // Create a new node
  const newNode = createNode(key);
  newNode.parent = parent;
  
  // Insert the new node as a child of the parent
  if (key < parent!.key) {
    parent!.left = newNode;
    frames.push({
      tree: cloneTree(root),
      highlightedNodes: [parent!.key],
      changedNodes: [key],
      description: `Inserted new node ${key} (RED) as left child of ${parent!.key}`
    });
  } else {
    parent!.right = newNode;
    frames.push({
      tree: cloneTree(root),
      highlightedNodes: [parent!.key],
      changedNodes: [key],
      description: `Inserted new node ${key} (RED) as right child of ${parent!.key}`
    });
  }
  
  return newNode;
}

// Fix Red-Black Tree properties after insertion
function fixRedBlackTreeViolations(root: RBNode, node: RBNode, frames: AnimationFrame[]): void {
  let current = node;
  
  // Fix violations up the tree
  while (current !== root && current.parent!.color === Color.RED) {
    // Parent is a left child of grandparent
    if (current.parent === current.parent!.parent!.left) {
      const uncle = current.parent!.parent!.right;
      
      // Case 1: Uncle is RED
      if (uncle !== null && uncle.color === Color.RED) {
        current.parent!.color = Color.BLACK;
        uncle.color = Color.BLACK;
        current.parent!.parent!.color = Color.RED;
        
        frames.push({
          tree: cloneTree(root),
          highlightedNodes: [current.key, current.parent!.key, uncle.key, current.parent!.parent!.key],
          changedNodes: [current.parent!.key, uncle.key, current.parent!.parent!.key],
          description: `Recoloring: Parent and uncle to BLACK, grandparent to RED`
        });
        
        current = current.parent!.parent!;
      } 
      // Case 2 & 3: Uncle is BLACK
      else {
        // Case 2: Current is a right child
        if (current === current.parent!.right) {
          current = current.parent!;
          frames.push({
            tree: cloneTree(root),
            highlightedNodes: [current.key],
            changedNodes: [],
            description: `Case 2: Current node ${current.key} is a right child of its parent`
          });
          
          leftRotate(root, current, frames);
        }
        
        // Case 3: Current is a left child
        current.parent!.color = Color.BLACK;
        current.parent!.parent!.color = Color.RED;
        
        frames.push({
          tree: cloneTree(root),
          highlightedNodes: [current.parent!.key, current.parent!.parent!.key],
          changedNodes: [current.parent!.key, current.parent!.parent!.key],
          description: `Case 3: Recoloring parent to BLACK and grandparent to RED`
        });
        
        rightRotate(root, current.parent!.parent!, frames);
      }
    } 
    // Parent is a right child of grandparent
    else {
      const uncle = current.parent!.parent!.left;
      
      // Case 1: Uncle is RED
      if (uncle !== null && uncle.color === Color.RED) {
        current.parent!.color = Color.BLACK;
        uncle.color = Color.BLACK;
        current.parent!.parent!.color = Color.RED;
        
        frames.push({
          tree: cloneTree(root),
          highlightedNodes: [current.key, current.parent!.key, uncle.key, current.parent!.parent!.key],
          changedNodes: [current.parent!.key, uncle.key, current.parent!.parent!.key],
          description: `Recoloring: Parent and uncle to BLACK, grandparent to RED`
        });
        
        current = current.parent!.parent!;
      } 
      // Case 2 & 3: Uncle is BLACK
      else {
        // Case 2: Current is a left child
        if (current === current.parent!.left) {
          current = current.parent!;
          frames.push({
            tree: cloneTree(root),
            highlightedNodes: [current.key],
            changedNodes: [],
            description: `Case 2: Current node ${current.key} is a left child of its parent`
          });
          
          rightRotate(root, current, frames);
        }
        
        // Case 3: Current is a right child
        current.parent!.color = Color.BLACK;
        current.parent!.parent!.color = Color.RED;
        
        frames.push({
          tree: cloneTree(root),
          highlightedNodes: [current.parent!.key, current.parent!.parent!.key],
          changedNodes: [current.parent!.key, current.parent!.parent!.key],
          description: `Case 3: Recoloring parent to BLACK and grandparent to RED`
        });
        
        leftRotate(root, current.parent!.parent!, frames);
      }
    }
  }
  
  // Ensure root is black
  if (root.color !== Color.BLACK) {
    root.color = Color.BLACK;
    
    frames.push({
      tree: cloneTree(root),
      highlightedNodes: [root.key],
      changedNodes: [root.key],
      description: `Ensuring root is BLACK`
    });
  }
}

// Perform left rotation on a node
function leftRotate(root: RBNode, x: RBNode, frames: AnimationFrame[]): void {
  const y = x.right as RBNode;
  
  // Turn y's left subtree into x's right subtree
  x.right = y.left;
  if (y.left !== null) {
    y.left.parent = x;
  }
  
  // Link y's parent to x's parent
  y.parent = x.parent;
  
  if (x.parent === null) {
    // x is the root
    y.parent = null;
  } else if (x === x.parent.left) {
    x.parent.left = y;
  } else {
    x.parent.right = y;
  }
  
  // Put x on y's left
  y.left = x;
  x.parent = y;
  
  frames.push({
    tree: cloneTree(root),
    highlightedNodes: [x.key, y.key],
    changedNodes: [x.key, y.key],
    rotationEdge: { from: x.key, to: y.key },
    description: `Left rotation: ${x.key} becomes the left child of ${y.key}`
  });
}

// Perform right rotation on a node
function rightRotate(root: RBNode, y: RBNode, frames: AnimationFrame[]): void {
  const x = y.left as RBNode;
  
  // Turn x's right subtree into y's left subtree
  y.left = x.right;
  if (x.right !== null) {
    x.right.parent = y;
  }
  
  // Link x's parent to y's parent
  x.parent = y.parent;
  
  if (y.parent === null) {
    // y is the root
    x.parent = null;
  } else if (y === y.parent.left) {
    y.parent.left = x;
  } else {
    y.parent.right = x;
  }
  
  // Put y on x's right
  x.right = y;
  y.parent = x;
  
  frames.push({
    tree: cloneTree(root),
    highlightedNodes: [x.key, y.key],
    changedNodes: [x.key, y.key],
    rotationEdge: { from: y.key, to: x.key },
    description: `Right rotation: ${y.key} becomes the right child of ${x.key}`
  });
}

// Generate a sample tree with inserted keys
export function generateSampleTree(keys: number[] = [30, 20, 40, 10, 25, 35, 50]): AnimationFrame[] {
  let root: RBNode | null = null;
  const frames: AnimationFrame[] = [];
  
  // Add initial frame
  frames.push({
    tree: null,
    highlightedNodes: [],
    changedNodes: [],
    description: 'Starting with an empty Red-Black Tree'
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
    description: 'Red-Black Tree construction complete'
  });
  
  return frames;
}