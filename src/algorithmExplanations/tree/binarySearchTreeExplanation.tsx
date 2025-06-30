import React from 'react';

const BinarySearchTreeExplanation = () => (
  <>
    <h3>Binary Search Tree (BST) Explanation</h3>
    <p>A Binary Search Tree is a node-based binary tree data structure that has the following properties:</p>
    
    <h4>Key Properties</h4>
    <ol>
      <li><strong>Binary Tree Structure</strong>: Each node has at most two children, referred to as the left child and the right child.</li>
      <li><strong>Ordering Property</strong>: For each node:
        <ul>
          <li>All keys in the left subtree are less than the node's key.</li>
          <li>All keys in the right subtree are greater than the node's key.</li>
          <li>Both the left and right subtrees are also binary search trees.</li>
        </ul>
      </li>
      <li><strong>Uniqueness</strong>: All node keys are typically distinct (no duplicates).</li>
    </ol>
    
    <h4>Basic Operations</h4>
    <h5>Insertion</h5>
    <p>To insert a new key into a BST:</p>
    <ol>
      <li>Start at the root node.</li>
      <li>If the tree is empty, create a new node and make it the root.</li>
      <li>Otherwise, compare the key to be inserted with the root's key:
        <ul>
          <li>If the key is less than the root's key, recursively insert into the left subtree.</li>
          <li>If the key is greater than the root's key, recursively insert into the right subtree.</li>
          <li>If the key is equal, typically do nothing (no duplicates).</li>
        </ul>
      </li>
    </ol>
    
    <h5>Search</h5>
    <p>To search for a key in a BST:</p>
    <ol>
      <li>Start at the root node.</li>
      <li>If the tree is empty or the key matches the root's key, return the result.</li>
      <li>Otherwise, compare the key with the root's key:
        <ul>
          <li>If the key is less than the root's key, recursively search in the left subtree.</li>
          <li>If the key is greater than the root's key, recursively search in the right subtree.</li>
        </ul>
      </li>
    </ol>
    
    <h5>Traversal</h5>
    <p>There are three common ways to traverse a BST:</p>
    <ul>
      <li><strong>In-order</strong>: Left subtree, current node, right subtree. This visits nodes in ascending order.</li>
      <li><strong>Pre-order</strong>: Current node, left subtree, right subtree. Useful for copying the tree.</li>
      <li><strong>Post-order</strong>: Left subtree, right subtree, current node. Useful for deleting the tree.</li>
    </ul>
    
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Search</strong>: O(h) where h is the height of the tree. In a balanced tree, this is O(log n), but in the worst case (skewed tree), it can be O(n).</li>
      <li><strong>Insert</strong>: O(h), similar to search.</li>
      <li><strong>Delete</strong>: O(h), similar to search.</li>
    </ul>
    
    <h4>Space Complexity</h4>
    <p>O(n) for storing n nodes.</p>
    
    <h4>Advantages</h4>
    <ul>
      <li>Dynamic data structure that allows for easy insertion and deletion.</li>
      <li>Maintains elements in a sorted order, enabling efficient searches.</li>
      <li>Can be used to implement other data structures like sets and maps.</li>
    </ul>
    
    <h4>Disadvantages</h4>
    <ul>
      <li>Not guaranteed to be balanced, which can lead to O(n) operations in the worst case.</li>
      <li>Performance degrades as the tree becomes unbalanced.</li>
      <li>Extra care must be taken for deletion to maintain the BST property.</li>
    </ul>
    
    <h4>Comparison with Balanced Trees</h4>
    <p>While a basic BST can degenerate into a linked list in the worst case, balanced BSTs like AVL trees and Red-Black trees maintain a balanced structure, ensuring O(log n) operations. These balanced trees add extra constraints and operations to maintain balance during insertions and deletions.</p>
    
    <h4>Applications</h4>
    <ul>
      <li>Used to implement other data structures like sets, maps, and priority queues.</li>
      <li>Database indexing</li>
      <li>Hierarchical data storage</li>
      <li>Used in many search applications where data is constantly added and removed</li>
    </ul>
  </>
);

export default BinarySearchTreeExplanation;