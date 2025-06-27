// src/algorithms/sorting/heapSort.ts
interface AnimationFrame {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  description?: string;
}

export const heapSort = (inputArray: number[]): AnimationFrame[] => {
  const array = [...inputArray];
  const frames: AnimationFrame[] = [];
  const n = array.length;
  
  // Add initial state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    description: 'Starting Heap Sort algorithm with the initial array.'
  });
  
  // Build max heap
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    description: 'First phase: Building a max heap from the array'
  });
  
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    frames.push({
      array: [...array],
      comparingIndices: [i],
      swappedIndices: [],
      description: `Heapifying subtree rooted at index ${i}`
    });
    
    heapify(array, n, i, frames);
  }
  
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    description: 'Max heap built successfully. Second phase: Extracting elements from heap'
  });
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root (maximum value) to the end
    [array[0], array[i]] = [array[i], array[0]];
    
    frames.push({
      array: [...array],
      comparingIndices: [],
      swappedIndices: [0, i],
      description: `Moving the maximum element (${array[i]}) to position ${i}`
    });
    
    // Call max heapify on the reduced heap
    heapify(array, i, 0, frames);
  }
  
  // Add final state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    description: 'Sorting complete! The array is now sorted in ascending order.'
  });
  
  return frames;
};

const heapify = (
  array: number[], 
  n: number, 
  i: number, 
  frames: AnimationFrame[]
): void => {
  let largest = i;       // Initialize largest as root
  const left = 2 * i + 1;  // Left child
  const right = 2 * i + 2; // Right child
  
  // If left child exists, check if it's larger than root
  if (left < n) {
    frames.push({
      array: [...array],
      comparingIndices: [largest, left],
      swappedIndices: [],
      description: `Comparing root (${array[largest]}) with left child (${array[left]})`
    });
    
    if (array[left] > array[largest]) {
      largest = left;
      frames.push({
        array: [...array],
        comparingIndices: [],
        swappedIndices: [largest],
        description: `Left child (${array[left]}) is larger than root, marking it as the largest`
      });
    }
  }
  
  // If right child exists, check if it's larger than largest so far
  if (right < n) {
    frames.push({
      array: [...array],
      comparingIndices: [largest, right],
      swappedIndices: [],
      description: `Comparing current largest (${array[largest]}) with right child (${array[right]})`
    });
    
    if (array[right] > array[largest]) {
      largest = right;
      frames.push({
        array: [...array],
        comparingIndices: [],
        swappedIndices: [largest],
        description: `Right child (${array[right]}) is larger than current largest, marking it as the largest`
      });
    }
  }
  
  // If largest is not root
  if (largest !== i) {
    // Swap
    [array[i], array[largest]] = [array[largest], array[i]];
    
    frames.push({
      array: [...array],
      comparingIndices: [],
      swappedIndices: [i, largest],
      description: `Swapping ${array[i]} and ${array[largest]} to maintain heap property`
    });
    
    // Recursively heapify the affected sub-tree
    heapify(array, n, largest, frames);
  } else {
    frames.push({
      array: [...array],
      comparingIndices: [],
      swappedIndices: [],
      description: `Heap property satisfied at node ${i}`
    });
  }
};