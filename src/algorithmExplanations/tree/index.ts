import React from 'react';
import RedBlackTreeExplanation from './redBlackTreeExplanation';

// Create an object that maps algorithm names to their explanation components
const TreeExplanations: Record<string, React.ComponentType> = {
  'Red-Black Tree': RedBlackTreeExplanation
};

export default TreeExplanations;