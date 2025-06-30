const LinearSearchCode = {
  javascript: `function linearSearch(arr, target) {
  // Loop through each element in the array
  for (let i = 0; i < arr.length; i++) {
    // Check if current element equals the target
    if (arr[i] === target) {
      // Return the index if found
      return i;
    }
  }
  
  // Return -1 if target is not found
  return -1;
}

// Example usage
const array = [5, 2, 9, 1, 5, 6];
const target = 9;
const result = linearSearch(array, target);

if (result !== -1) {
  console.log(\`Target \${target} found at index \${result}\`);
} else {
  console.log(\`Target \${target} not found in the array\`);
}`,

  python: `def linear_search(arr, target):
    # Loop through each element in the array
    for i in range(len(arr)):
        # Check if current element equals the target
        if arr[i] == target:
            # Return the index if found
            return i
    
    # Return -1 if target is not found
    return -1

# Example usage
array = [5, 2, 9, 1, 5, 6]
target = 9
result = linear_search(array, target)

if result != -1:
    print(f"Target {target} found at index {result}")
else:
    print(f"Target {target} not found in the array")`,

  java: `public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        // Loop through each element in the array
        for (int i = 0; i < arr.length; i++) {
            // Check if current element equals the target
            if (arr[i] == target) {
                // Return the index if found
                return i;
            }
        }
        
        // Return -1 if target is not found
        return -1;
    }
    
    public static void main(String[] args) {
        int[] array = {5, 2, 9, 1, 5, 6};
        int target = 9;
        int result = linearSearch(array, target);
        
        if (result != -1) {
            System.out.println("Target " + target + " found at index " + result);
        } else {
            System.out.println("Target " + target + " not found in the array");
        }
    }
}`,

  cpp: `#include <iostream>
#include <vector>

int linearSearch(const std::vector<int>& arr, int target) {
    // Loop through each element in the array
    for (int i = 0; i < arr.size(); i++) {
        // Check if current element equals the target
        if (arr[i] == target) {
            // Return the index if found
            return i;
        }
    }
    
    // Return -1 if target is not found
    return -1;
}

int main() {
    std::vector<int> array = {5, 2, 9, 1, 5, 6};
    int target = 9;
    int result = linearSearch(array, target);
    
    if (result != -1) {
        std::cout << "Target " << target << " found at index " << result << std::endl;
    } else {
        std::cout << "Target " << target << " not found in the array" << std::endl;
    }
    
    return 0;
}`
};

export default LinearSearchCode;