import LinearSearchCode from './linearSearchCode';
import BinarySearchCode from './binarySearchCode';

// Create an object that maps algorithm names to their code implementations
const SearchCodes: Record<string, Record<string, string>> = {
  'Linear Search': LinearSearchCode,
  'Binary Search': BinarySearchCode
};

export default SearchCodes;