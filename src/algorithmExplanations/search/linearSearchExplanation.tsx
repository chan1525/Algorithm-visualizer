import React from 'react';

const LinearSearchExplanation = () => (
  <>
    <h3>Linear Search Explanation</h3>
    <p>Linear Search is the simplest searching algorithm that searches for an element in a list by checking each element sequentially until a match is found or the entire list has been searched.</p>
    
    <h4>Algorithm</h4>
    <ol>
      <li>Start from the first element (index 0) of the array.</li>
      <li>Compare the current element with the target value.
        <ul>
          <li>If the current element matches the target, return the current index.</li>
          <li>If the current element doesn't match, move to the next element.</li>
        </ul>
      </li>
      <li>Repeat step 2 until either:
        <ul>
          <li>A match is found (return the index).</li>
          <li>The end of the array is reached (return -1 or a not-found indicator).</li>
        </ul>
      </li>
    </ol>
    
    <h4>Time Complexity</h4>
    <ul>
      <li><strong>Best Case</strong>: O(1) - When the target element is at the beginning of the array.</li>
      <li><strong>Average Case</strong>: O(n/2) ≈ O(n) - On average, we need to check half the elements.</li>
      <li><strong>Worst Case</strong>: O(n) - When the target element is at the end of the array or not present at all.</li>
    </ul>
    
    <h4>Space Complexity</h4>
    <p>O(1) - Linear search requires only a constant amount of extra space regardless of input size.</p>
    
    <h4>Advantages</h4>
    <ul>
      <li>Simple to implement and understand.</li>
      <li>Works on unsorted arrays.</li>
      <li>No preprocessing required.</li>
      <li>Works well for small arrays.</li>
    </ul>
    
    <h4>Disadvantages</h4>
    <ul>
      <li>Inefficient for large arrays compared to other search algorithms like binary search.</li>
      <li>Time complexity grows linearly with the size of the input.</li>
    </ul>
    
    <h4>When to Use</h4>
    <ul>
      <li>When the array is small.</li>
      <li>When the array is unsorted and sorting would be more expensive than searching linearly.</li>
      <li>When searching for a single occurrence rather than multiple.</li>
      <li>When simplicity is more important than efficiency.</li>
    </ul>
    
    <h4>Applications</h4>
    <ul>
      <li>Finding an element in a small, unsorted list.</li>
      <li>Checking if an element exists in an array.</li>
      <li>Finding all occurrences of an element (with a slight modification).</li>
      <li>As a subroutine in more complex algorithms.</li>
    </ul>
    
    <h4>Comparison with Other Search Algorithms</h4>
    <p>Linear search is generally less efficient than algorithms like binary search (O(log n)) for large datasets, but it doesn't require the data to be sorted beforehand. This makes it useful in situations where the array is unsorted or searching needs to be done only once (making sorting overhead unnecessary).</p>
  </>
);

export default LinearSearchExplanation;