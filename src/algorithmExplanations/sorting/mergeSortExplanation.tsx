import React from 'react';

const MergeSortExplanation = () => (
  <>
    <h3>Merge Sort Explanation</h3>
    <p>Merge Sort is a divide-and-conquer sorting algorithm that works by:</p>
    <ol>
      <li><strong>Divide</strong>: Recursively divide the array into two halves until each subarray contains only one element (which is inherently sorted).</li>
      <li><strong>Conquer</strong>: Merge the sorted subarrays back together, maintaining the sorted order.</li>
      <li><strong>Combine</strong>: The merging process involves comparing the elements of both subarrays and placing them in the correct order in a temporary array, which is then copied back to the original array.</li>
    </ol>
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Best Case</strong>: O(n log n) - Even with an already sorted array, all divisions and merges are still performed.</li>
      <li><strong>Average Case</strong>: O(n log n) - Consistent performance regardless of input.</li>
      <li><strong>Worst Case</strong>: O(n log n) - Consistent performance even with worst-case inputs.</li>
    </ul>
    <h4>Space Complexity</h4>
    <p>O(n) - Merge Sort requires additional space for the temporary arrays during the merging process.</p>
    <h4>Key Characteristics</h4>
    <ul>
      <li>Merge Sort is stable (equal elements maintain their relative order).</li>
      <li>It has consistent performance but requires additional memory.</li>
      <li>It's well-suited for sorting linked lists and external sorting of large datasets.</li>
      <li>The merging step can be optimized for partially sorted arrays.</li>
    </ul>
  </>
);

export default MergeSortExplanation;