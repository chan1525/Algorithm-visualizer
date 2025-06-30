import RedBlackTreeCode from './redBlackTreeCode';
import AVLTreeCode from './avlTreeCode';

// Create an object that maps algorithm names to their code implementations
const TreeCodes: Record<string, Record<string, string>> = {
  'Red-Black Tree': RedBlackTreeCode,
  'AVL Tree': AVLTreeCode
};

export default TreeCodes;