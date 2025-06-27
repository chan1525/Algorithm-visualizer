// src/algorithms/sorting/mergeSort.ts
interface AnimationFrame {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  description?: string;
}

export const mergeSort = (inputArray: number[]): AnimationFrame[] => {
  const array = [...inputArray];
  const frames: AnimationFrame[] = [];
  
  // Add initial state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    description: 'Starting Merge Sort algorithm with the initial array.'
  });
  
  // Call the recursive mergesort helper function
  const aux = [...array];
  mergeSortHelper(array, aux, 0, array.length - 1, frames);
  
  // Add final state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    description: 'Sorting complete! The array is now sorted in ascending order.'
  });
  
  return frames;
};

const mergeSortHelper = (
  array: number[], 
  aux: number[],
  low: number, 
  high: number, 
  frames: AnimationFrame[]
): void => {
  if (high <= low) return;
  
  const mid = Math.floor(low + (high - low) / 2);
  
  frames.push({
    array: [...array],
    comparingIndices: [low, mid, high],
    swappedIndices: [],
    description: `Dividing array into two halves: [${low}...${mid}] and [${mid + 1}...${high}]`
  });
  
  // Recursively sort the two halves
  mergeSortHelper(array, aux, low, mid, frames);
  mergeSortHelper(array, aux, mid + 1, high, frames);
  
  frames.push({
    array: [...array],
    comparingIndices: [low, mid, high],
    swappedIndices: [],
    description: `Merging two sorted subarrays: [${low}...${mid}] and [${mid + 1}...${high}]`
  });
  
  // Merge the sorted halves
  merge(array, aux, low, mid, high, frames);
};

const merge = (
  array: number[], 
  aux: number[],
  low: number, 
  mid: number, 
  high: number, 
  frames: AnimationFrame[]
): void => {
  // Copy both halves into auxiliary array
  for (let k = low; k <= high; k++) {
    aux[k] = array[k];
  }
  
  let i = low;      // Pointer for the left subarray
  let j = mid + 1;  // Pointer for the right subarray
  
  // Merge back to original array
  for (let k = low; k <= high; k++) {
    if (i > mid) {
      // Left subarray is exhausted
      array[k] = aux[j++];
      frames.push({
        array: [...array],
        comparingIndices: [],
        swappedIndices: [k],
        description: `Left subarray exhausted, taking element ${array[k]} from right subarray`
      });
    } else if (j > high) {
      // Right subarray is exhausted
      array[k] = aux[i++];
      frames.push({
        array: [...array],
        comparingIndices: [],
        swappedIndices: [k],
        description: `Right subarray exhausted, taking element ${array[k]} from left subarray`
      });
    } else if (aux[i] <= aux[j]) {
      // Element from left subarray is smaller
      frames.push({
        array: [...array],
        comparingIndices: [i, j],
        swappedIndices: [],
        description: `Comparing ${aux[i]} and ${aux[j]}: ${aux[i]} <= ${aux[j]}`
      });
      
      array[k] = aux[i++];
      frames.push({
        array: [...array],
        comparingIndices: [],
        swappedIndices: [k],
        description: `Taking the smaller element ${array[k]} from left subarray`
      });
    } else {
      // Element from right subarray is smaller
      frames.push({
        array: [...array],
        comparingIndices: [i, j],
        swappedIndices: [],
        description: `Comparing ${aux[i]} and ${aux[j]}: ${aux[i]} > ${aux[j]}`
      });
      
      array[k] = aux[j++];
      frames.push({
        array: [...array],
        comparingIndices: [],
        swappedIndices: [k],
        description: `Taking the smaller element ${array[k]} from right subarray`
      });
    }
  }
};