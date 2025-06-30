import React from 'react';

const DijkstraExplanation = () => (
  <>
    <h3>Dijkstra's Algorithm Explanation</h3>
    <p>Dijkstra's algorithm is a popular algorithm for finding the shortest path between nodes in a graph. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.</p>
    <ol>
      <li><strong>Initialization</strong>: Set the distance to the start node as 0 and all other nodes as infinity.</li>
      <li><strong>Mark all nodes as unvisited</strong>: Create a set of all unvisited nodes.</li>
      <li><strong>Iterative Process</strong>: While there are unvisited nodes:
        <ul>
          <li>Select the unvisited node with the smallest distance.</li>
          <li>Mark the current node as visited.</li>
          <li>For each neighbor of the current node, calculate the tentative distance through the current node.</li>
          <li>If the tentative distance is less than the current distance, update the distance and set the previous node.</li>
        </ul>
      </li>
      <li><strong>Path Reconstruction</strong>: Backtrack from the end node to the start node using the previous node references.</li>
    </ol>
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Best Case</strong>: O(E + V log V) - Using a binary heap or priority queue for efficient node selection.</li>
      <li><strong>Average Case</strong>: O(E + V log V) - Where E is the number of edges and V is the number of vertices.</li>
      <li><strong>Worst Case</strong>: O(V²) - With a naive implementation using an array to store distances.</li>
    </ul>
    <h4>Space Complexity</h4>
    <p>O(V) - To store distances, previous nodes, and the set of unvisited nodes.</p>
    <h4>Key Characteristics</h4>
    <ul>
      <li>Dijkstra's algorithm works only for graphs with non-negative edge weights.</li>
      <li>It's guaranteed to find the shortest path in a weighted graph if all edges have non-negative weights.</li>
      <li>It's commonly used in routing protocols, GPS navigation, and network routing algorithms.</li>
      <li>For graphs with negative edge weights, the Bellman-Ford algorithm is more appropriate.</li>
    </ul>
  </>
);

export default DijkstraExplanation;