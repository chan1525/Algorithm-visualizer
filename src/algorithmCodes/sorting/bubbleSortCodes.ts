const BubbleSortCodes = {
  javascript: `function bubbleSort(arr) {
  const n = arr.length;
  
  // Outer loop for passes
  for (let i = 0; i < n; i++) {
    // Flag to optimize if no swaps occur in a pass
    let swapped = false;
    
    // Inner loop for comparisons in each pass
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap the elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred in this pass, the array is sorted
    if (!swapped) {
      break;
    }
  }
  
  return arr;
}`,

  python: `def bubble_sort(arr):
    n = len(arr)
    
    # Outer loop for passes
    for i in range(n):
        # Flag to optimize if no swaps occur in a pass
        swapped = False
        
        # Inner loop for comparisons in each pass
        for j in range(0, n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap the elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swaps occurred in this pass, the array is sorted
        if not swapped:
            break
            
    return arr`,

  java: `public class BubbleSort {
    public static int[] bubbleSort(int[] arr) {
        int n = arr.length;
        
        // Outer loop for passes
        for (int i = 0; i < n; i++) {
            // Flag to optimize if no swaps occur in a pass
            boolean swapped = false;
            
            // Inner loop for comparisons in each pass
            for (int j = 0; j < n - i - 1; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                    // Swap the elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            // If no swaps occurred in this pass, the array is sorted
            if (!swapped) {
                break;
            }
        }
        
        return arr;
    }
}`,

  cpp: `#include <vector>

std::vector<int> bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    
    // Outer loop for passes
    for (int i = 0; i < n; i++) {
        // Flag to optimize if no swaps occur in a pass
        bool swapped = false;
        
        // Inner loop for comparisons in each pass
        for (int j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap the elements
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // If no swaps occurred in this pass, the array is sorted
        if (!swapped) {
            break;
        }
    }
    
    return arr;
}`
};

export default BubbleSortCodes;