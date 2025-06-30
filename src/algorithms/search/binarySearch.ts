import { AnimationFrame } from './linearSearch';

// Binary search function
export const binarySearch = (array: number[], target: number): AnimationFrame[] => {
  const frames: AnimationFrame[] = [];
  
  // Add initial frame
  frames.push({
    array: [...array],
    currentIndex: null,
    foundIndex: null,
    description: `Starting binary search for target value ${target} in array of length ${array.length}`
  });
  
  // Check if array is empty
  if (array.length === 0) {
    frames.push({
      array: [],
      currentIndex: null,
      foundIndex: null,
      description: 'Array is empty, search cannot be performed'
    });
    return frames;
  }
  
  // Check if array is sorted
  const isSorted = array.every((val, i) => i === 0 || val >= array[i - 1]);
  if (!isSorted) {
    frames.push({
      array: [...array],
      currentIndex: null,
      foundIndex: null,
      description: 'Binary search requires a sorted array. This array is not sorted!'
    });
    return frames;
  }
  
  // Start binary search
  let left = 0;
  let right = array.length - 1;
  
  frames.push({
    array: [...array],
    currentIndex: null,
    foundIndex: null,
    description: `Setting initial search boundaries: left = ${left}, right = ${right}`
  });
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    frames.push({
      array: [...array],
      currentIndex: mid,
      foundIndex: null,
      description: `Calculating middle index: (${left} + ${right}) / 2 = ${mid}`
    });
    
    frames.push({
      array: [...array],
      currentIndex: mid,
      foundIndex: null,
      description: `Comparing element at index ${mid} (value: ${array[mid]}) with target ${target}`
    });
    
    if (array[mid] === target) {
      // Target found
      frames.push({
        array: [...array],
        currentIndex: null,
        foundIndex: mid,
        description: `Found target ${target} at index ${mid}!`
      });
      
      // Add final frame
      frames.push({
        array: [...array],
        currentIndex: null,
        foundIndex: mid,
        description: `Binary search complete. Target ${target} found at index ${mid}.`
      });
      
      return frames;
    } else if (array[mid] < target) {
      // Target is in the right half
      left = mid + 1;
      
      frames.push({
        array: [...array],
        currentIndex: null,
        foundIndex: null,
        description: `${array[mid]} < ${target}, so target must be in the right half. Setting left = ${left}, right remains ${right}`
      });
    } else {
      // Target is in the left half
      right = mid - 1;
      
      frames.push({
        array: [...array],
        currentIndex: null,
        foundIndex: null,
        description: `${array[mid]} > ${target}, so target must be in the left half. Setting right = ${right}, left remains ${left}`
      });
    }
    
    // Show the new search range
    if (left <= right) {
      frames.push({
        array: [...array],
        currentIndex: null,
        foundIndex: null,
        description: `New search range: indices ${left} to ${right}`
      });
    }
  }
  
  // Target not found
  frames.push({
    array: [...array],
    currentIndex: null,
    foundIndex: null,
    description: `Binary search complete. Target ${target} not found in the array.`
  });
  
  return frames;
};

// Generate a random sorted array for binary search
export const generateRandomSortedArray = (size: number = 15, maxValue: number = 100): number[] => {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * maxValue));
  }
  return array.sort((a, b) => a - b);
};