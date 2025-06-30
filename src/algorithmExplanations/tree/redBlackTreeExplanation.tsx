import React from 'react';

const RedBlackTreeExplanation = () => (
  <>
    <h3>Red-Black Tree Explanation</h3>
    <p>A Red-Black Tree is a self-balancing binary search tree with an extra attribute for each node: its color, which can be either red or black. These color constraints ensure that the tree remains approximately balanced during insertions and deletions.</p>
    
    <h4>Properties</h4>
    <p>Every Red-Black Tree must satisfy the following properties:</p>
    <ol>
      <li><strong>Color Property</strong>: Every node is either red or black.</li>
      <li><strong>Root Property</strong>: The root is always black.</li>
      <li><strong>Leaf Property</strong>: All leaves (NIL or null nodes) are black.</li>
      <li><strong>Red Property</strong>: If a node is red, both its children are black. (No two adjacent nodes can be red).</li>
      <li><strong>Path Property</strong>: Every path from the root to any leaf contains the same number of black nodes.</li>
    </ol>
    
    <h4>Operations</h4>
    <h5>Insertion</h5>
    <ol>
      <li>Perform a standard BST insertion.</li>
      <li>Color the new node red.</li>
      <li>Fix any violations of Red-Black Tree properties by:
        <ul>
          <li><strong>Case 1</strong>: Uncle is red - Recolor parent, uncle, and grandparent.</li>
          <li><strong>Case 2</strong>: Uncle is black, node is a "zigzag" (right child of left parent or left child of right parent) - Perform a rotation at the parent.</li>
          <li><strong>Case 3</strong>: Uncle is black, node is a "zigzig" (left child of left parent or right child of right parent) - Perform a rotation at the grandparent and recolor.</li>
        </ul>
      </li>
    </ol>
    
    <h5>Deletion</h5>
    <p>The deletion operation is more complex and involves several cases to maintain the Red-Black properties.</p>
    
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Search</strong>: O(log n) - Same as a balanced BST.</li>
      <li><strong>Insert</strong>: O(log n) - Standard BST insert plus rebalancing.</li>
      <li><strong>Delete</strong>: O(log n) - Standard BST delete plus rebalancing.</li>
    </ul>
    
    <h4>Space Complexity</h4>
    <p>O(n) for storing n nodes.</p>
    
    <h4>Applications</h4>
    <ul>
      <li>Implementing associative arrays (maps)</li>
      <li>Implementing sets</li>
      <li>Used in many database systems for efficient indexing</li>
      <li>Used in the Linux kernel scheduler</li>
      <li>Java's TreeMap and TreeSet are implemented using Red-Black Trees</li>
    </ul>
    
    <h4>Advantages</h4>
    <ul>
      <li>Guaranteed O(log n) time complexity for search, insert, and delete operations</li>
      <li>More balanced than AVL trees during insertions and deletions (fewer rotations)</li>
      <li>Well-suited for applications with frequent insertions and deletions</li>
    </ul>
    
    <h4>Disadvantages</h4>
    <ul>
      <li>More complex implementation than simple BSTs</li>
      <li>Slightly slower than AVL trees for lookups</li>
      <li>Requires additional memory for storing color information</li>
    </ul>
  </>
);

export default RedBlackTreeExplanation;