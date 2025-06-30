import React from 'react';
import LinearSearchExplanation from './linearSearchExplanation';
import BinarySearchExplanation from './binarySearchExplanation';

// Create an object that maps algorithm names to their explanation components
const SearchExplanations: Record<string, React.ComponentType> = {
  'Linear Search': LinearSearchExplanation,
  'Binary Search': BinarySearchExplanation
};

export default SearchExplanations;