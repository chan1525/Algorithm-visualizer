import React from 'react';

const BFSExplanation = () => (
  <>
    <h3>Breadth-First Search (BFS) Explanation</h3>
    <p>Breadth-First Search is a graph traversal algorithm that explores all the vertices of a graph at the present depth before moving on to vertices at the next depth level. It uses a queue data structure to keep track of nodes to visit.</p>
    <ol>
      <li><strong>Initialization</strong>: Enqueue the starting node into the queue.</li>
      <li><strong>Exploration</strong>: While the queue is not empty:
        <ul>
          <li>Dequeue a node from the front of the queue.</li>
          <li>If the node has not been visited, mark it as visited.</li>
          <li>Enqueue all unvisited neighbors of the node.</li>
        </ul>
      </li>
      <li><strong>Completion</strong>: When the queue is empty, all reachable nodes have been visited.</li>
    </ol>
    <h4>Time and Space Complexity</h4>
    <ul>
      <li><strong>Time Complexity</strong>: O(V + E) - Where V is the number of vertices and E is the number of edges.</li>
      <li><strong>Space Complexity</strong>: O(V) - For the queue and visited set.</li>
    </ul>
    <h4>Key Characteristics</h4>
    <ul>
      <li>BFS always finds the shortest path in an unweighted graph (fewest number of edges).</li>
      <li>It visits nodes in order of increasing distance from the source node.</li>
      <li>It's particularly useful for finding the shortest path in unweighted graphs.</li>
      <li>It requires more memory than DFS because it needs to store all the nodes at the current level.</li>
    </ul>
    <h4>Applications</h4>
    <ul>
      <li>Finding the shortest path in an unweighted graph</li>
      <li>Finding all nodes within one connected component</li>
      <li>Testing if a graph is bipartite</li>
      <li>Finding all nodes within a given distance</li>
      <li>Social networking applications (finding all friends within n connections)</li>
      <li>Web crawlers</li>
    </ul>
    <h4>Comparison with DFS</h4>
    <p>Unlike Depth-First Search which explores as far as possible along a branch before backtracking, BFS explores all neighbors at the present depth before moving on to nodes at the next depth level. This makes BFS better for finding the shortest path in unweighted graphs, while DFS is better for exploring all possible paths or for tasks like topological sorting.</p>
  </>
);

export default BFSExplanation;