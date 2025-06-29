import React from 'react';

const BubbleSortExplanation = () => (
  <>
    <h3>Bubble Sort Explanation</h3>
    <p>Bubble Sort is a simple comparison-based sorting algorithm that works by:</p>
    <ol>
      <li><strong>Repeated Passes</strong>: The algorithm makes multiple passes through the array.</li>
      <li><strong>Adjacent Comparisons</strong>: In each pass, it compares adjacent elements and swaps them if they are in the wrong order.</li>
      <li><strong>Bubbling Up</strong>: After each pass, the largest unsorted element "bubbles up" to its correct position at the end of the array.</li>
      <li><strong>Optimization</strong>: The algorithm can be optimized by stopping early if no swaps are made in a pass, indicating the array is already sorted.</li>
    </ol>
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Best Case</strong>: O(n) - When the array is already sorted (with the optimization).</li>
      <li><strong>Average Case</strong>: O(n²) - Expected performance across random inputs.</li>
      <li><strong>Worst Case</strong>: O(n²) - When the array is sorted in reverse order.</li>
    </ul>
    <h4>Space Complexity</h4>
    <p>O(1) - Bubble Sort is an in-place sorting algorithm that requires only a constant amount of additional space.</p>
    <h4>Key Characteristics</h4>
    <ul>
      <li>Bubble Sort is stable (equal elements maintain their relative order).</li>
      <li>It's simple to implement but inefficient for large datasets.</li>
      <li>It's mainly used for educational purposes or for very small arrays where simplicity is more important than efficiency.</li>
    </ul>
  </>
);

export default BubbleSortExplanation;