// src/algorithms/sorting/bubbleSort.ts

// Interface for animation frames
interface AnimationFrame {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  description?: string;
}

export const bubbleSort = (inputArray: number[]): AnimationFrame[] => {
  const array = [...inputArray];
  const frames: AnimationFrame[] = [];
  const n = array.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Add frame showing comparison
      frames.push({
        array: [...array],
        comparingIndices: [j, j + 1],
        swappedIndices: [],
        description: `Comparing elements at indices ${j} (${array[j]}) and ${j+1} (${array[j+1]})`
      });
      
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        
        // Add frame showing swap
        frames.push({
          array: [...array],
          comparingIndices: [],
          swappedIndices: [j, j + 1],
          description: `${array[j]} is less than ${array[j+1]}, so we swap them`
        });
      } else {
        frames.push({
          array: [...array],
          comparingIndices: [],
          swappedIndices: [],
          description: `${array[j]} is already less than or equal to ${array[j+1]}, no swap needed`
        });
      }
    }
    
    // Add a frame showing completion of an iteration
    if (i < n - 1) {
      frames.push({
        array: [...array],
        comparingIndices: [],
        swappedIndices: [],
        description: `Completed iteration ${i+1}. The largest ${i+1} element${i > 0 ? 's are' : ' is'} now at the end of the array.`
      });
    }
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