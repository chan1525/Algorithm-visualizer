import React from 'react';

const DFSExplanation = () => (
  <>
    <h3>Depth-First Search (DFS) Explanation</h3>
    <p>Depth-First Search is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack data structure to keep track of nodes to visit.</p>
    <ol>
      <li><strong>Initialization</strong>: Push the starting node onto the stack.</li>
      <li><strong>Exploration</strong>: While the stack is not empty:
        <ul>
          <li>Pop a node from the stack.</li>
          <li>If the node has not been visited, mark it as visited.</li>
          <li>Push all unvisited neighbors of the node onto the stack.</li>
        </ul>
      </li>
      <li><strong>Completion</strong>: When the stack is empty, all reachable nodes have been visited.</li>
    </ol>
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Time Complexity</strong>: O(V + E) - Where V is the number of vertices and E is the number of edges.</li>
      <li><strong>Space Complexity</strong>: O(V) - For the stack and visited set.</li>
    </ul>
    <h4>Key Characteristics</h4>
    <ul>
      <li>DFS may not find the shortest path in an unweighted graph (unlike BFS).</li>
      <li>It's useful for problems like finding connected components, topological sorting, and cycle detection.</li>
      <li>DFS can be implemented recursively or iteratively (using a stack).</li>
      <li>In the recursive implementation, the call stack serves as the implicit stack data structure.</li>
      <li>The iterative implementation (shown here) uses an explicit stack.</li>
    </ul>
    <h4>Applications</h4>
    <ul>
      <li>Finding connected components in a graph</li>
      <li>Topological sorting of a directed acyclic graph</li>
      <li>Finding paths between two nodes</li>
      <li>Maze generation and solving</li>
      <li>Cycle detection in graphs</li>
    </ul>
  </>
);

export default DFSExplanation;