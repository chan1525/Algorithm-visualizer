import React from 'react';

const BinarySearchExplanation = () => (
  <>
    <h3>Binary Search Explanation</h3>
    <p>Binary Search is an efficient algorithm for finding a target value within a sorted array. It works by repeatedly dividing the search interval in half, significantly reducing the search space compared to linear search.</p>
    
    <h4>Algorithm</h4>
    <ol>
      <li>Identify the middle element of the sorted array.</li>
      <li>Compare the middle element with the target value:
        <ul>
          <li>If they are equal, the search is complete.</li>
          <li>If the target is less than the middle element, repeat the search on the left half.</li>
          <li>If the target is greater than the middle element, repeat the search on the right half.</li>
        </ul>
      </li>
      <li>Repeat this process on the remaining half until:
        <ul>
          <li>The target is found (return its index).</li>
          <li>The search interval is empty (target not in the array).</li>
        </ul>
      </li>
    </ol>
    
    <h4>Prerequisites</h4>
    <p><strong>Important:</strong> Binary search requires the array to be sorted. If the array is not sorted, the algorithm may not find the target even if it exists in the array.</p>
    
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Best Case</strong>: O(1) - When the middle element is the target.</li>
      <li><strong>Average Case</strong>: O(log n) - The search space is halved in each step.</li>
      <li><strong>Worst Case</strong>: O(log n) - When the target is at the beginning or end, or not present.</li>
    </ul>
    
    <h4>Space Complexity</h4>
    <p>O(1) - Binary search requires only a constant amount of extra space regardless of input size when implemented iteratively.</p>
    <p>O(log n) - When implemented recursively due to the call stack.</p>
    
    <h4>Advantages</h4>
    <ul>
      <li>Much faster than linear search for large datasets (O(log n) vs O(n)).</li>
      <li>Very efficient for sorted arrays.</li>
      <li>Works well for large datasets that don't fit in memory (when accessing elements is expensive).</li>
    </ul>
    
    <h4>Disadvantages</h4>
    <ul>
      <li>Requires a sorted array.</li>
      <li>Sorting an unsorted array first (O(n log n)) might be more expensive than using linear search (O(n)) for a one-time search.</li>
      <li>Not cache-friendly for very large arrays due to accessing elements far apart from each other.</li>
      <li>Only works on data structures that allow random access (arrays, not linked lists).</li>
    </ul>
    
    <h4>When to Use</h4>
    <ul>
      <li>When the array is already sorted.</li>
      <li>When performing multiple searches on the same array (sorting once is worth it).</li>
      <li>When the dataset is large enough that the O(log n) advantage is significant.</li>
      <li>When memory usage is a concern (iterative implementation).</li>
    </ul>
    
    <h4>Applications</h4>
    <ul>
      <li>Dictionary lookup and spell checkers.</li>
      <li>Database search algorithms.</li>
      <li>Finding elements in sorted collections.</li>
      <li>Finding insertion positions in sorted arrays.</li>
      <li>Computational problems where we need to narrow down a range (e.g., binary search on answer).</li>
    </ul>
    
    <h4>Comparison with Linear Search</h4>
    <p>For an array with n elements:</p>
    <ul>
      <li>Linear search examines up to n elements in the worst case.</li>
      <li>Binary search examines at most log₂(n) + 1 elements in the worst case.</li>
      <li>For example, in an array of 1 million elements, linear search might examine all 1,000,000 elements, while binary search would examine at most 20 elements.</li>
    </ul>
  </>
);

export default BinarySearchExplanation;