const BinarySearchCode = {
  javascript: `function binarySearch(arr, target) {
  // Initialize left and right pointers
  let left = 0;
  let right = arr.length - 1;
  
  // Continue searching while left pointer is less than or equal to right pointer
  while (left <= right) {
    // Calculate middle index
    const mid = Math.floor((left + right) / 2);
    
    // Check if middle element is the target
    if (arr[mid] === target) {
      return mid; // Target found, return its index
    }
    
    // If target is greater, ignore left half
    if (arr[mid] < target) {
      left = mid + 1;
    }
    // If target is smaller, ignore right half
    else {
      right = mid - 1;
    }
  }
  
  // Target not found in array
  return -1;
}

// Example usage
const sortedArray = [1, 2, 5, 9, 13, 21, 34, 55, 89];
const target = 21;
const result = binarySearch(sortedArray, target);

if (result !== -1) {
  console.log(\`Target \${target} found at index \${result}\`);
} else {
  console.log(\`Target \${target} not found in the array\`);
}`,

  python: `def binary_search(arr, target):
    # Initialize left and right pointers
    left = 0
    right = len(arr) - 1
    
    # Continue searching while left pointer is less than or equal to right pointer
    while left <= right:
        # Calculate middle index
        mid = (left + right) // 2
        
        # Check if middle element is the target
        if arr[mid] == target:
            return mid  # Target found, return its index
        
        # If target is greater, ignore left half
        elif arr[mid] < target:
            left = mid + 1
        
        # If target is smaller, ignore right half
        else:
            right = mid - 1
    
    # Target not found in array
    return -1

# Example usage
sorted_array = [1, 2, 5, 9, 13, 21, 34, 55, 89]
target = 21
result = binary_search(sorted_array, target)

if result != -1:
    print(f"Target {target} found at index {result}")
else:
    print(f"Target {target} not found in the array")`,

  java: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        // Initialize left and right pointers
        int left = 0;
        int right = arr.length - 1;
        
        // Continue searching while left pointer is less than or equal to right pointer
        while (left <= right) {
            // Calculate middle index
            int mid = left + (right - left) / 2;  // Prevents potential overflow
            
            // Check if middle element is the target
            if (arr[mid] == target) {
                return mid; // Target found, return its index
            }
            
            // If target is greater, ignore left half
            if (arr[mid] < target) {
                left = mid + 1;
            }
            // If target is smaller, ignore right half
            else {
                right = mid - 1;
            }
        }
        
        // Target not found in array
        return -1;
    }
    
    public static void main(String[] args) {
        int[] sortedArray = {1, 2, 5, 9, 13, 21, 34, 55, 89};
        int target = 21;
        int result = binarySearch(sortedArray, target);
        
        if (result != -1) {
            System.out.println("Target " + target + " found at index " + result);
        } else {
            System.out.println("Target " + target + " not found in the array");
        }
    }
}`,

  cpp: `#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    // Initialize left and right pointers
    int left = 0;
    int right = arr.size() - 1;
    
    // Continue searching while left pointer is less than or equal to right pointer
    while (left <= right) {
        // Calculate middle index
        int mid = left + (right - left) / 2;  // Prevents potential overflow
        
        // Check if middle element is the target
        if (arr[mid] == target) {
            return mid; // Target found, return its index
        }
        
        // If target is greater, ignore left half
        if (arr[mid] < target) {
            left = mid + 1;
        }
        // If target is smaller, ignore right half
        else {
            right = mid - 1;
        }
    }
    
    // Target not found in array
    return -1;
}

int main() {
    std::vector<int> sortedArray = {1, 2, 5, 9, 13, 21, 34, 55, 89};
    int target = 21;
    int result = binarySearch(sortedArray, target);
    
    if (result != -1) {
        std::cout << "Target " << target << " found at index " << result << std::endl;
    } else {
        std::cout << "Target " << target << " not found in the array" << std::endl;
    }
    
    return 0;
}`
};

export default BinarySearchCode;