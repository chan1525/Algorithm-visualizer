import QuickSortCodes from './quickSortCodes';
import BubbleSortCodes from './bubbleSortCodes';
import MergeSortCodes from './mergeSortCodes';
import HeapSortCodes from './heapSortCodes';

// Create an object that maps algorithm names to their code implementations
const SortingCodes: Record<string, Record<string, string>> = {
  'Quick Sort': QuickSortCodes,
  'Bubble Sort': BubbleSortCodes,
  'Merge Sort': MergeSortCodes,
  'Heap Sort': HeapSortCodes
};

export default SortingCodes;