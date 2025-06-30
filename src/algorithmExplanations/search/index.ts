import React from 'react';
import LinearSearchExplanation from './linearSearchExplanation';

// Create an object that maps algorithm names to their explanation components
const SearchExplanations: Record<string, React.ComponentType> = {
  'Linear Search': LinearSearchExplanation
};

export default SearchExplanations;