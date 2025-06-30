// Define a type for related algorithm information
export interface RelatedAlgorithm {
  name: string;
  type?: string;
  description?: string;
}

// Create an object mapping algorithm names to their related algorithms
const SearchRelatedAlgorithms: Record<string, RelatedAlgorithm[]> = {
  'Linear Search': [
    { name: 'Binary Search', type: 'search', description: 'More efficient for sorted arrays, with O(log n) time complexity' },
    { name: 'Jump Search', description: 'Checks fewer elements by jumping ahead by fixed steps' },
    { name: 'Interpolation Search', description: 'An improved variant of binary search that works best on uniformly distributed data' }
  ],
  'Binary Search': [
    { name: 'Linear Search', type: 'search', description: 'Simpler algorithm that works on unsorted arrays' },
    { name: 'Exponential Search', description: 'Finds a range where the element exists, then performs binary search' },
    { name: 'Fibonacci Search', description: 'Uses Fibonacci numbers to divide the array' }
  ]
};

export default SearchRelatedAlgorithms;