// Interface for animation frames
export interface AnimationFrame {
  array: number[];
  currentIndex: number | null;
  foundIndex: number | null;
  description?: string;
}

// Linear search function
export const linearSearch = (array: number[], target: number): AnimationFrame[] => {
  const frames: AnimationFrame[] = [];
  
  // Add initial frame
  frames.push({
    array: [...array],
    currentIndex: null,
    foundIndex: null,
    description: `Starting linear search for target value ${target} in array of length ${array.length}`
  });
  
  // Iterate through the array
  for (let i = 0; i < array.length; i++) {
    // Add frame highlighting current element being compared
    frames.push({
      array: [...array],
      currentIndex: i,
      foundIndex: null,
      description: `Comparing element at index ${i} (value: ${array[i]}) with target ${target}`
    });
    
    // Check if current element equals target
    if (array[i] === target) {
      // Add frame highlighting found element
      frames.push({
        array: [...array],
        currentIndex: null,
        foundIndex: i,
        description: `Found target ${target} at index ${i}!`
      });
      
      // Add final frame
      frames.push({
        array: [...array],
        currentIndex: null,
        foundIndex: i,
        description: `Linear search complete. Target ${target} found at index ${i}.`
      });
      
      return frames;
    }
  }
  
  // If target not found, add final frame
  frames.push({
    array: [...array],
    currentIndex: null,
    foundIndex: null,
    description: `Linear search complete. Target ${target} not found in the array.`
  });
  
  return frames;
};

// Generate a random array for search visualization
export const generateRandomArray = (size: number = 15, maxValue: number = 100): number[] => {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * maxValue));
  }
  return array;
};