import RedBlackTreeCode from './redBlackTreeCode';
import AVLTreeCode from './avlTreeCode';
import BinarySearchTreeCode from './binarySearchTreeCode';

// Create an object that maps algorithm names to their code implementations
const TreeCodes: Record<string, Record<string, string>> = {
  'Red-Black Tree': RedBlackTreeCode,
  'AVL Tree': AVLTreeCode,
  'Binary Search Tree': BinarySearchTreeCode
};

export default TreeCodes;