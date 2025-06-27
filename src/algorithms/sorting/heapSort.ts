// src/algorithms/sorting/heapSort.ts

// Interface for animation frames
interface AnimationFrame {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
}

export const heapSort = (inputArray: number[]): AnimationFrame[] => {
  const array = [...inputArray];
  const frames: AnimationFrame[] = [];
  
  // Add initial state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: []
  });
  
  const n = array.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, frames);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Swap root (max element) with the last element
    [array[0], array[i]] = [array[i], array[0]];
    
    // Add frame showing swap
    frames.push({
      array: [...array],
      comparingIndices: [],
      swappedIndices: [0, i]
    });
    
    // Call heapify on the reduced heap
    heapify(array, i, 0, frames);
  }
  
  // Add final state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: []
  });
  
  return frames;
};

const heapify = (
  array: number[],
  n: number,
  i: number,
  frames: AnimationFrame[]
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  // Add frame showing comparison of parent and left child
  if (left < n) {
    frames.push({
      array: [...array],
      comparingIndices: [largest, left],
      swappedIndices: []
    });
  }
  
  // If left child is larger than root
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  
  // Add frame showing comparison of current largest and right child
  if (right < n) {
    frames.push({
      array: [...array],
      comparingIndices: [largest, right],
      swappedIndices: []
    });
  }
  
  // If right child is larger than largest so far
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  
  // If largest is not root
  if (largest !== i) {
    // Swap
    [array[i], array[largest]] = [array[largest], array[i]];
    
    // Add frame showing swap
    frames.push({
      array: [...array],
      comparingIndices: [],
      swappedIndices: [i, largest]
    });
    
    // Recursively heapify the affected sub-tree
    heapify(array, n, largest, frames);
  }
};