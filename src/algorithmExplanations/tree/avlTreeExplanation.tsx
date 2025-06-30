import React from 'react';

const AVLTreeExplanation = () => (
  <>
    <h3>AVL Tree Explanation</h3>
    <p>An AVL tree is a self-balancing binary search tree where the difference between heights of left and right subtrees cannot be more than one for all nodes. It's named after its inventors Adelson-Velsky and Landis.</p>
    
    <h4>Properties</h4>
    <p>Every AVL Tree must satisfy the following properties:</p>
    <ol>
      <li><strong>Binary Search Tree Property</strong>: For each node, all elements in its left subtree are less than the node's key, and all elements in its right subtree are greater than the node's key.</li>
      <li><strong>Balance Factor</strong>: For each node, the height difference between left and right subtrees (balance factor) can only be -1, 0, or 1.</li>
    </ol>
    
    <h4>Balance Factor</h4>
    <p>The balance factor of a node is calculated as:</p>
    <pre>Balance Factor = Height of Left Subtree - Height of Right Subtree</pre>
    
    <h4>Operations</h4>
    <h5>Insertion</h5>
    <ol>
      <li>Perform a standard BST insertion.</li>
      <li>Update the height of the current node.</li>
      <li>Calculate the balance factor.</li>
      <li>If the node becomes unbalanced (balance factor {'>'}1 or {'<'}-1), perform one of these rotations:
        <ul>
          <li><strong>Left-Left Case (LL)</strong>: Right rotation at the unbalanced node.</li>
          <li><strong>Right-Right Case (RR)</strong>: Left rotation at the unbalanced node.</li>
          <li><strong>Left-Right Case (LR)</strong>: Left rotation at the left child, then right rotation at the unbalanced node.</li>
          <li><strong>Right-Left Case (RL)</strong>: Right rotation at the right child, then left rotation at the unbalanced node.</li>
        </ul>
      </li>
    </ol>
    
    <h5>Deletion</h5>
    <p>Deletion is similar to insertion, with standard BST deletion followed by rebalancing the tree.</p>
    
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Search</strong>: O(log n) - As the tree is always balanced.</li>
      <li><strong>Insert</strong>: O(log n) - Standard BST insert plus rebalancing.</li>
      <li><strong>Delete</strong>: O(log n) - Standard BST delete plus rebalancing.</li>
    </ul>
    
    <h4>Space Complexity</h4>
    <p>O(n) for storing n nodes.</p>
    
    <h4>Applications</h4>
    <ul>
      <li>In-memory sorts</li>
      <li>Database indexing</li>
      <li>Network routing algorithms</li>
    </ul>
    
    <h4>Advantages</h4>
    <ul>
      <li>Guaranteed O(log n) time complexity for basic operations</li>
      <li>Strict height balancing ensures optimal search times</li>
      <li>Well-suited for memory-intensive applications</li>
    </ul>
    
    <h4>Disadvantages</h4>
    <ul>
      <li>More rotations needed compared to Red-Black trees during insertion and deletion</li>
      <li>Requires extra space for height information</li>
      <li>Complex implementation compared to simple BSTs</li>
    </ul>
    
    <h4>Comparison with Red-Black Trees</h4>
    <p>AVL trees are more strictly balanced than Red-Black trees, which leads to faster lookups but slower insertions and deletions due to more rotations. In practice, AVL trees are preferred when lookup operations are more frequent than insertions and deletions.</p>
  </>
);

export default AVLTreeExplanation;