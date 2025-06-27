// src/utils/algorithmInitializer.ts
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase';

export const initializeAlgorithms = async () => {
  // Check if algorithms already exist
   

  // Check if sorting algorithms exist
  const sortingQuery = query(collection(db, 'algorithms'), where('type', '==', 'sorting'));
  const sortingSnapshot = await getDocs(sortingQuery);
  
  // Keep track of which algorithms we've already added
  const existingAlgorithms = new Set();
  sortingSnapshot.docs.forEach(doc => {
    const data = doc.data();
    existingAlgorithms.add(`${data.type}-${data.name}`);
  });
  

  
  if (sortingSnapshot.empty) {
    // Add default sorting algorithms
    const sortingAlgorithms = [
      {
        type: 'sorting',
        name: 'Quick Sort',
        description: 'Quick sort is an efficient, recursive divide-and-conquer approach to sorting an array. It works by selecting a pivot element and partitioning the array around the pivot.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'sorting',
        name: 'Bubble Sort',
        description: 'Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'sorting',
        name: 'Merge Sort',
        description: 'Merge sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm. It divides the input array into two halves, sorts them separately, and then merges them.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'sorting',
        name: 'Heap Sort',
        description: 'Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      }
    ];
    
    // Add each algorithm to Firestore
    for (const algorithm of sortingAlgorithms) {
      await addDoc(collection(db, 'algorithms'), algorithm);
    }
    
    console.log('Default sorting algorithms added to Firestore');
  }

  // Initialize graph algorithms
  const graphQuery = query(collection(db, 'algorithms'), where('type', '==', 'graph'));
  const graphSnapshot = await getDocs(graphQuery);
  
  if (graphSnapshot.empty) {
    // Add default graph algorithms
    const graphAlgorithms = [
      {
        type: 'graph',
        name: 'Dijkstra\'s Algorithm',
        description: 'Dijkstra\'s algorithm is a popular algorithm for finding the shortest paths between nodes in a graph with non-negative edge weights.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'graph',
        name: 'Breadth-First Search',
        description: 'BFS is an algorithm for traversing or searching tree or graph data structures. It starts at a chosen node and explores all neighbors at the present depth before moving on to nodes at the next depth level.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'graph',
        name: 'Depth-First Search',
        description: 'DFS is an algorithm for traversing or searching tree or graph data structures. It starts at a chosen node and explores as far as possible along each branch before backtracking.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'graph',
        name: 'A* Search',
        description: 'A* is a pathfinding algorithm that combines the benefits of Dijkstra\'s algorithm and greedy best-first search, using heuristics to find the shortest path efficiently.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      }
    ];
    
    // Add each algorithm to Firestore
    for (const algorithm of graphAlgorithms) {
      await addDoc(collection(db, 'algorithms'), algorithm);
    }
    
    console.log('Default graph algorithms added to Firestore');
  }

  // Initialize tree algorithms
  const treeQuery = query(collection(db, 'algorithms'), where('type', '==', 'tree'));
  const treeSnapshot = await getDocs(treeQuery);
  
  if (treeSnapshot.empty) {
    // Add default tree algorithms
    const treeAlgorithms = [
      {
        type: 'tree',
        name: 'Binary Search Tree',
        description: 'A binary search tree is a binary tree where each node has at most two children, and for each node, all elements in the left subtree are less than the node, and all elements in the right subtree are greater.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'tree',
        name: 'AVL Tree',
        description: 'An AVL tree is a self-balancing binary search tree where the heights of the two child subtrees of any node differ by at most one.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'tree',
        name: 'Red-Black Tree',
        description: 'A red-black tree is a self-balancing binary search tree with an extra bit for denoting the color of a node, used to ensure the tree remains balanced during insertions and deletions.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'tree',
        name: 'Binary Heap',
        description: 'A binary heap is a complete binary tree where the value of each node is greater than or equal to (max heap) or less than or equal to (min heap) the values of its children.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      }
    ];
    
    // Add each algorithm to Firestore
    for (const algorithm of treeAlgorithms) {
      await addDoc(collection(db, 'algorithms'), algorithm);
    }
    
    console.log('Default tree algorithms added to Firestore');
  }

  // Initialize search algorithms
  const searchQuery = query(collection(db, 'algorithms'), where('type', '==', 'search'));
  const searchSnapshot = await getDocs(searchQuery);
  
  if (searchSnapshot.empty) {
    // Add default search algorithms
    const searchAlgorithms = [
      {
        type: 'search',
        name: 'Binary Search',
        description: 'Binary search is an efficient algorithm for finding a target value within a sorted array. It works by repeatedly dividing the search interval in half.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'search',
        name: 'Linear Search',
        description: 'Linear search is a simple search algorithm that checks each element in a list sequentially until a match is found or the list is exhausted.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'search',
        name: 'Jump Search',
        description: 'Jump search is a searching algorithm for sorted arrays that works by checking elements at fixed intervals and then performing a linear search within a smaller range.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      },
      {
        type: 'search',
        name: 'Interpolation Search',
        description: 'Interpolation search is an improved variant of binary search that works better for uniformly distributed data. It estimates the position of the target value using the formula for straight lines.',
        parameters: {},
        createdBy: 'system',
        createdAt: new Date().toISOString()
      }
    ];
    
    // Add each algorithm to Firestore
    for (const algorithm of searchAlgorithms) {
      await addDoc(collection(db, 'algorithms'), algorithm);
    }
    
    console.log('Default search algorithms added to Firestore');
  }
};