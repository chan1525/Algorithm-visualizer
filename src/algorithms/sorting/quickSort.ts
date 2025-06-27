// src/algorithms/sorting/quickSort.ts
interface AnimationFrame {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  description?: string;
}

export const quickSort = (inputArray: number[]): AnimationFrame[] => {
  const array = [...inputArray];
  const frames: AnimationFrame[] = [];
  
  // Add initial state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    description: 'Starting Quick Sort algorithm with the initial array.'
  });
  
  // Call the recursive quicksort helper function
  quickSortHelper(array, 0, array.length - 1, frames);
  
  // Add final state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    description: 'Sorting complete! The array is now sorted in ascending order.'
  });
  
  return frames;
};

const quickSortHelper = (
  array: number[], 
  low: number, 
  high: number, 
  frames: AnimationFrame[]
): void => {
  if (low < high) {
    frames.push({
      array: [...array],
      comparingIndices: [low, high],
      swappedIndices: [],
      description: `Partitioning subarray from index ${low} to ${high}`
    });
    
    // Partition the array and get the pivot index
    const pivotIndex = partition(array, low, high, frames);
    
    frames.push({
      array: [...array],
      comparingIndices: [],
      swappedIndices: [pivotIndex],
      description: `Pivot at index ${pivotIndex} (value ${array[pivotIndex]}) is now in its final sorted position`
    });
    
    // Recursively sort the sub-arrays
    quickSortHelper(array, low, pivotIndex - 1, frames);
    quickSortHelper(array, pivotIndex + 1, high, frames);
  }
};

const partition = (
  array: number[], 
  low: number, 
  high: number, 
  frames: AnimationFrame[]
): number => {
  // Choose the rightmost element as pivot
  const pivot = array[high];
  
  frames.push({
    array: [...array],
    comparingIndices: [high],
    swappedIndices: [],
    description: `Selected pivot: ${pivot} (at index ${high})`
  });
  
  // Index of smaller element
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // Add frame showing comparison with pivot
    frames.push({
      array: [...array],
      comparingIndices: [j, high],
      swappedIndices: [],
      description: `Comparing element ${array[j]} at index ${j} with pivot ${pivot}`
    });
    
    // If current element is smaller than or equal to pivot
    if (array[j] <= pivot) {
      i++;
      
      // Swap array[i] and array[j]
      if (i !== j) {
        [array[i], array[j]] = [array[j], array[i]];
        
        frames.push({
          array: [...array],
          comparingIndices: [],
          swappedIndices: [i, j],
          description: `${array[i]} <= ${pivot}, swapping elements at indices ${i} and ${j}`
        });
      } else {
        frames.push({
          array: [...array],
          comparingIndices: [],
          swappedIndices: [i],
          description: `${array[i]} <= ${pivot}, element at index ${i} is already in the correct position`
        });
      }
    } else {
      frames.push({
        array: [...array],
        comparingIndices: [],
        swappedIndices: [],
        description: `${array[j]} > ${pivot}, no swap needed`
      });
    }
  }
  
  // Swap array[i+1] and array[high] (put the pivot in its correct position)
  if (i + 1 !== high) {
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    
    frames.push({
      array: [...array],
      comparingIndices: [],
      swappedIndices: [i + 1, high],
      description: `Placing pivot ${pivot} in its correct sorted position at index ${i + 1}`
    });
  }
  
  return i + 1;
};