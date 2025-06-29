const MergeSortCodes = {
  javascript: `function mergeSort(arr) {
  // Base case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) {
    return arr;
  }
  
  // Divide the array into two halves
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  
  // Recursively sort the two halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  
  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from both arrays and add the smaller one to the result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add remaining elements from either array
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,

  python: `def merge_sort(arr):
    # Base case: arrays with 0 or 1 element are already sorted
    if len(arr) <= 1:
        return arr
    
    # Divide the array into two halves
    middle = len(arr) // 2
    left = arr[:middle]
    right = arr[middle:]
    
    # Recursively sort the two halves
    left = merge_sort(left)
    right = merge_sort(right)
    
    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    result = []
    left_index = right_index = 0
    
    # Compare elements from both arrays and add the smaller one to the result
    while left_index < len(left) and right_index < len(right):
        if left[left_index] < right[right_index]:
            result.append(left[left_index])
            left_index += 1
        else:
            result.append(right[right_index])
            right_index += 1
    
    # Add remaining elements from either array
    result.extend(left[left_index:])
    result.extend(right[right_index:])
    
    return result`,

  java: `public class MergeSort {
    public static int[] mergeSort(int[] arr) {
        // Base case: arrays with 0 or 1 element are already sorted
        if (arr.length <= 1) {
            return arr;
        }
        
        // Divide the array into two halves
        int middle = arr.length / 2;
        int[] left = new int[middle];
        int[] right = new int[arr.length - middle];
        
        // Copy elements to left and right arrays
        System.arraycopy(arr, 0, left, 0, middle);
        System.arraycopy(arr, middle, right, 0, arr.length - middle);
        
        // Recursively sort the two halves
        left = mergeSort(left);
        right = mergeSort(right);
        
        // Merge the sorted halves
        return merge(left, right);
    }
    
    private static int[] merge(int[] left, int[] right) {
        int[] result = new int[left.length + right.length];
        int leftIndex = 0, rightIndex = 0, resultIndex = 0;
        
        // Compare elements from both arrays and add the smaller one to the result
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] <= right[rightIndex]) {
                result[resultIndex++] = left[leftIndex++];
            } else {
                result[resultIndex++] = right[rightIndex++];
            }
        }
        
        // Copy remaining elements from left array
        while (leftIndex < left.length) {
            result[resultIndex++] = left[leftIndex++];
        }
        
        // Copy remaining elements from right array
        while (rightIndex < right.length) {
            result[resultIndex++] = right[rightIndex++];
        }
        
        return result;
    }
}`,

  cpp: `#include <vector>

std::vector<int> merge(const std::vector<int>& left, const std::vector<int>& right) {
    std::vector<int> result;
    size_t leftIndex = 0, rightIndex = 0;
    
    // Compare elements from both arrays and add the smaller one to the result
    while (leftIndex < left.size() && rightIndex < right.size()) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push_back(left[leftIndex++]);
        } else {
            result.push_back(right[rightIndex++]);
        }
    }
    
    // Add remaining elements from left array
    while (leftIndex < left.size()) {
        result.push_back(left[leftIndex++]);
    }
    
    // Add remaining elements from right array
    while (rightIndex < right.size()) {
        result.push_back(right[rightIndex++]);
    }
    
    return result;
}

std::vector<int> mergeSort(const std::vector<int>& arr) {
    // Base case: arrays with 0 or 1 element are already sorted
    if (arr.size() <= 1) {
        return arr;
    }
    
    // Divide the array into two halves
    size_t middle = arr.size() / 2;
    std::vector<int> left(arr.begin(), arr.begin() + middle);
    std::vector<int> right(arr.begin() + middle, arr.end());
    
    // Recursively sort the two halves
    left = mergeSort(left);
    right = mergeSort(right);
    
    // Merge the sorted halves
    return merge(left, right);
}`
};

export default MergeSortCodes;