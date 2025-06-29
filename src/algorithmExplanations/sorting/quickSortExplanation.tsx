import React from 'react';

const QuickSortExplanation = () => (
  <>
    <h3>Quick Sort Explanation</h3>
    <p>Quick Sort is an efficient, divide-and-conquer sorting algorithm that works by:</p>
    <ol>
      <li><strong>Selecting a Pivot</strong>: Choose an element from the array to act as a pivot. Common strategies include selecting the first, last, middle, or a random element.</li>
      <li><strong>Partitioning</strong>: Rearrange the array so that all elements less than the pivot come before it, and all elements greater than the pivot come after it. The pivot is now in its final sorted position.</li>
      <li><strong>Recursion</strong>: Recursively apply the above steps to the sub-arrays formed by the elements less than the pivot and the elements greater than the pivot.</li>
    </ol>
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Best Case</strong>: O(n log n) - When the pivot divides the array into roughly equal halves.</li>
      <li><strong>Average Case</strong>: O(n log n) - Expected performance across random inputs.</li>
      <li><strong>Worst Case</strong>: O(n²) - When the pivot is consistently the smallest or largest element, creating highly unbalanced partitions.</li>
    </ul>
    <h4>Space Complexity</h4>
    <p>O(log n) to O(n) depending on implementation - for the recursive call stack.</p>
    <h4>Key Characteristics</h4>
    <ul>
      <li>Quick Sort is not stable (equal elements may change their relative order).</li>
      <li>It's typically faster than other O(n log n) algorithms like Merge Sort for arrays stored in memory due to better locality of reference.</li>
      <li>Performance can be improved by using a good pivot selection strategy.</li>
    </ul>
  </>
);

export default QuickSortExplanation;