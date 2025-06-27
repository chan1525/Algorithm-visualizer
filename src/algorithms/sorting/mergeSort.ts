// src/algorithms/sorting/mergeSort.ts

// Interface for animation frames
interface AnimationFrame {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
}

export const mergeSort = (inputArray: number[]): AnimationFrame[] => {
  const array = [...inputArray];
  const frames: AnimationFrame[] = [];
  
  // Add initial state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: []
  });
  
  // For now, this is a simplified implementation that doesn't show all steps
  // In a complete implementation, you would track all comparisons and changes
  
  mergeSortHelper(array, 0, array.length - 1, frames);
  
  // Add final state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: []
  });
  
  return frames;
};

const mergeSortHelper = (
  array: number[], 
  start: number, 
  end: number, 
  frames: AnimationFrame[]
) => {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    
    mergeSortHelper(array, start, mid, frames);
    mergeSortHelper(array, mid + 1, end, frames);
    
    merge(array, start, mid, end, frames);
  }
};

const merge = (
  array: number[], 
  start: number, 
  mid: number, 
  end: number, 
  frames: AnimationFrame[]
) => {
  const leftSize = mid - start + 1;
  const rightSize = end - mid;
  
  const leftArray = array.slice(start, mid + 1);
  const rightArray = array.slice(mid + 1, end + 1);
  
  let i = 0, j = 0, k = start;
  
  while (i < leftSize && j < rightSize) {
    // Add frame showing comparison
    frames.push({
      array: [...array],
      comparingIndices: [start + i, mid + 1 + j],
      swappedIndices: []
    });
    
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      i++;
    } else {
      array[k] = rightArray[j];
      j++;
    }
    
    // Add frame showing placement
    frames.push({
      array: [...array],
      comparingIndices: [],
      swappedIndices: [k]
    });
    
    k++;
  }
  
  while (i < leftSize) {
    array[k] = leftArray[i];
    
    // Add frame showing placement
    frames.push({
      array: [...array],
      comparingIndices: [],
      swappedIndices: [k]
    });
    
    i++;
    k++;
  }
  
  while (j < rightSize) {
    array[k] = rightArray[j];
    
    // Add frame showing placement
    frames.push({
      array: [...array],
      comparingIndices: [],
      swappedIndices: [k]
    });
    j++;
    k++;
  }
};