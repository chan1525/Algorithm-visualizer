import React from 'react';
import RedBlackTreeExplanation from './redBlackTreeExplanation';
import AVLTreeExplanation from './avlTreeExplanation';

// Create an object that maps algorithm names to their explanation components
const TreeExplanations: Record<string, React.ComponentType> = {
  'Red-Black Tree': RedBlackTreeExplanation,
  'AVL Tree': AVLTreeExplanation
};

export default TreeExplanations;