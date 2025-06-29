// src/utils/algorithmInitializer.ts
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';

// Define a type for algorithm data
interface AlgorithmData {
  type: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
  createdBy: string;
  createdAt: string;
}

// Define all algorithms to initialize
const algorithmsToInitialize: Record<string, AlgorithmData[]> = {
  sorting: [
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
  ],
  graph: [
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
    }
  ],
  tree: [
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
    }
  ],
  search: [
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
    }
  ]
};

// Helper function to check how many algorithms we already have
async function checkAlgorithmCount(): Promise<number> {
  const algorithmsSnapshot = await getDocs(collection(db, 'algorithms'));
  return algorithmsSnapshot.size;
}

// Function to initialize algorithms of a specific type
const initializeAlgorithmType = async (type: string): Promise<void> => {
  // Make sure the type exists in our defined algorithms
  if (!(type in algorithmsToInitialize)) {
    console.log(`No algorithms defined for type: ${type}`);
    return;
  }
  
  // Query existing algorithms by type
  const typeQuery = query(collection(db, 'algorithms'), where('type', '==', type));
  const snapshot = await getDocs(typeQuery);
  
  // Create a set of existing algorithms by name
  const existingAlgorithmNames = new Set<string>();
  snapshot.docs.forEach(doc => {
    const data = doc.data();
    existingAlgorithmNames.add(data.name);
  });
  
  console.log(`Found ${existingAlgorithmNames.size} existing algorithms for type: ${type}`);
  
  // Add only missing algorithms
  let addedCount = 0;
  for (const algorithm of algorithmsToInitialize[type]) {
    if (!existingAlgorithmNames.has(algorithm.name)) {
      await addDoc(collection(db, 'algorithms'), algorithm);
      console.log(`Added ${algorithm.name} to Firestore`);
      addedCount++;
    } else {
      console.log(`${algorithm.name} already exists, skipping`);
    }
  }
  
  console.log(`Added ${addedCount} new algorithms for type: ${type}`);
};

// Main initialization function
export const initializeAlgorithms = async (): Promise<void> => {
  // First, let's check if we've already initialized algorithms to avoid duplicates
  const algorithmCount = await checkAlgorithmCount();
  
  // If we already have a reasonable number of algorithms, skip initialization
  if (algorithmCount > 10) {
    console.log('Algorithms already initialized, skipping...');
    return;
  }

  // Initialize each algorithm type
  await initializeAlgorithmType('sorting');
  await initializeAlgorithmType('graph');
  await initializeAlgorithmType('tree');
  await initializeAlgorithmType('search');

  console.log('All algorithms initialized successfully');
};