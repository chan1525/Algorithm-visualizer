import React from 'react';

const HeapSortExplanation = () => (
  <>
    <h3>Heap Sort Explanation</h3>
    <p>Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It works in two phases:</p>
    <ol>
      <li><strong>Build Heap</strong>: Transform the input array into a max heap (a complete binary tree where each parent node is greater than or equal to its children).</li>
      <li><strong>Extract Elements</strong>: Repeatedly extract the maximum element (the root of the heap) and place it at the end of the array, then restore the heap property for the remaining elements.</li>
    </ol>
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Best Case</strong>: O(n log n) - Building the heap takes O(n) time, and extracting n elements takes O(n log n) time.</li>
      <li><strong>Average Case</strong>: O(n log n) - Consistent performance regardless of input.</li>
      <li><strong>Worst Case</strong>: O(n log n) - Consistent performance even with worst-case inputs.</li>
    </ul>
    <h4>Space Complexity</h4>
    <p>O(1) - Heap Sort is an in-place sorting algorithm that requires only a constant amount of additional space.</p>
    <h4>Key Characteristics</h4>
    <ul>
      <li>Heap Sort is not stable (equal elements may change their relative order).</li>
      <li>It has consistent performance and doesn't require additional memory like Merge Sort.</li>
      <li>It's efficient for large datasets and can be used as a priority queue.</li>
      <li>The initial building of the heap is O(n), which is more efficient than inserting n elements individually (which would be O(n log n)).</li>
    </ul>
  </>
);

export default HeapSortExplanation;