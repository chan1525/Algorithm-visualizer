// src/algorithms/sorting/quickSort.ts

// Interface for animation frames
interface AnimationFrame {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
}

export const quickSort = (inputArray: number[]): AnimationFrame[] => {
  const array = [...inputArray];
  const frames: AnimationFrame[] = [];
  
  // Add initial state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: []
  });
  
  // Recursive quicksort function
  const sort = (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      sort(arr, low, pivotIndex - 1);
      sort(arr, pivotIndex + 1, high);
    }
  };
  
  // Partition function
  const partition = (arr: number[], low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      // Add frame showing comparison with pivot
      frames.push({
        array: [...array],
        comparingIndices: [j, high],
        swappedIndices: []
      });
      
      if (arr[j] <= pivot) {
        i++;
        
        // Swap arr[i] and arr[j]
        [arr[i], arr[j]] = [arr[j], arr[i]];
        
        // Add frame showing swap
        frames.push({
          array: [...array],
          comparingIndices: [],
          swappedIndices: [i, j]
        });
      }
    }
    
    // Swap arr[i+1] and arr[high] (put pivot in its correct position)
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    // Add frame showing pivot swap
    frames.push({
      array: [...array],
      comparingIndices: [],
      swappedIndices: [i + 1, high]
    });
    
    return i + 1;
  };
  
  // Start the sorting process
  sort(array, 0, array.length - 1);
  
  // Add final state
  frames.push({
    array: [...array],
    comparingIndices: [],
    swappedIndices: []
  });
  
  return frames;
};