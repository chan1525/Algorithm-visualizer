import React from 'react';
import QuickSortExplanation from './quickSortExplanation';
import BubbleSortExplanation from './bubbleSortExplanation';
import MergeSortExplanation from './mergeSortExplanation';
import HeapSortExplanation from './heapSortExplanation';

// Create an object that maps algorithm names to their explanation components
const SortingExplanations: Record<string, React.ComponentType> = {
  'Quick Sort': QuickSortExplanation,
  'Bubble Sort': BubbleSortExplanation,
  'Merge Sort': MergeSortExplanation,
  'Heap Sort': HeapSortExplanation
};

export default SortingExplanations;