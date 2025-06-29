// Define a type for related algorithm information
export interface RelatedAlgorithm {
  name: string;
  type?: string;
  description?: string;
}

// Create an object mapping algorithm names to their related algorithms
const SortingRelatedAlgorithms: Record<string, RelatedAlgorithm[]> = {
  'Quick Sort': [
    { name: 'Merge Sort', type: 'sorting' },
    { name: 'Heap Sort', type: 'sorting' },
    { name: 'Intro Sort', description: 'A hybrid sorting algorithm that combines Quick Sort, Heap Sort, and Insertion Sort' }
  ],
  'Bubble Sort': [
    { name: 'Selection Sort', type: 'sorting', description: 'Repeatedly selects the smallest element from the unsorted portion and puts it at the beginning' },
    { name: 'Insertion Sort', type: 'sorting', description: 'Builds the sorted array one item at a time by repeatedly taking the next item and inserting it into its correct position' },
    { name: 'Cocktail Sort', description: 'A variation of Bubble Sort that sorts in both directions each pass through the list' }
  ],
  'Merge Sort': [
    { name: 'Quick Sort', type: 'sorting' },
    { name: 'Tim Sort', description: 'A hybrid sorting algorithm derived from Merge Sort and Insertion Sort' },
    { name: 'External Merge Sort', description: 'A variation of Merge Sort designed for sorting data that doesn\'t fit into memory' }
  ],
  'Heap Sort': [
    { name: 'Quick Sort', type: 'sorting' },
    { name: 'Selection Sort', description: 'Conceptually similar to Heap Sort but without using a heap structure' },
    { name: 'Priority Queue Sort', description: 'Uses a priority queue data structure to sort elements' }
  ]
};

export default SortingRelatedAlgorithms;