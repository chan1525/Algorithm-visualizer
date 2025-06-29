const QuickSortCodes = {
  javascript: `function quickSort(arr) {
  // Base case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Choose a pivot element (here we choose the middle element)
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];
  
  // Partition the array into elements less than pivot and greater than pivot
  const less = [];
  const greater = [];
  
  // Loop through all elements except the pivot
  for (let i = 0; i < arr.length; i++) {
    // Skip the pivot itself
    if (i === pivotIndex) continue;
    
    // Push to appropriate array based on comparison with pivot
    if (arr[i] <= pivot) {
      less.push(arr[i]);
    } else {
      greater.push(arr[i]);
    }
  }
  
  // Recursively sort the sub-arrays and concatenate the results
  return [...quickSort(less), pivot, ...quickSort(greater)];
}`,

  python: `def quick_sort(arr):
    # Base case: arrays with 0 or 1 element are already sorted
    if len(arr) <= 1:
        return arr
    
    # Choose a pivot element (here we choose the middle element)
    pivot_index = len(arr) // 2
    pivot = arr[pivot_index]
    
    # Partition the array into elements less than pivot and greater than pivot
    less = [arr[i] for i in range(len(arr)) if i != pivot_index and arr[i] <= pivot]
    greater = [arr[i] for i in range(len(arr)) if i != pivot_index and arr[i] > pivot]
    
    # Recursively sort the sub-arrays and concatenate the results
    return quick_sort(less) + [pivot] + quick_sort(greater)`,

  java: `public class QuickSort {
    public static int[] quickSort(int[] arr) {
        if (arr.length <= 1) {
            return arr;
        }
        
        return sort(arr, 0, arr.length - 1);
    }
    
    private static int[] sort(int[] arr, int low, int high) {
        if (low < high) {
            // Find partition index
            int pivotIndex = partition(arr, low, high);
            
            // Recursively sort elements before and after partition
            sort(arr, low, pivotIndex - 1);
            sort(arr, pivotIndex + 1, high);
        }
        
        return arr;
    }
    
    private static int partition(int[] arr, int low, int high) {
        // Choose the rightmost element as pivot
        int pivot = arr[high];
        
        // Index of smaller element
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++;
                
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        // Swap arr[i+1] and arr[high] (put the pivot in its correct position)
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
}`,

  cpp: `#include <vector>
#include <iostream>

std::vector<int> quickSort(std::vector<int>& arr) {
    // Base case: arrays with 0 or 1 element are already sorted
    if (arr.size() <= 1) {
        return arr;
    }
    
    // Choose a pivot element (here we choose the last element)
    int pivot = arr.back();
    
    // Create vectors for elements less than, equal to, and greater than pivot
    std::vector<int> less, equal, greater;
    
    // Partition the array
    for (const auto& element : arr) {
        if (element < pivot) {
            less.push_back(element);
        } else if (element == pivot) {
            equal.push_back(element);
        } else {
            greater.push_back(element);
        }
    }
    
    // Recursively sort the sub-arrays
    less = quickSort(less);
    greater = quickSort(greater);
    
    // Concatenate the results
    std::vector<int> result;
    result.insert(result.end(), less.begin(), less.end());
    result.insert(result.end(), equal.begin(), equal.end());
    result.insert(result.end(), greater.begin(), greater.end());
    
    return result;
}`
};

export default QuickSortCodes;