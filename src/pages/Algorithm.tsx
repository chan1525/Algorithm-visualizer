// src/pages/Algorithm.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Button,
  Divider,
  Alert
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { getAlgorithm, getAlgorithmsByType, AlgorithmConfig } from '../services/db';
import { useAuth } from '../context/AuthContext';

// Import visualizers
import SortingVisualizer from '../components/visualizers/sorting/SortingVisualizer';
import GraphVisualizer from '../components/visualizers/graph/GraphVisualizer';
import TreeVisualizer from '../components/visualizers/tree/TreeVisualizer';
import SearchVisualizer from '../components/visualizers/search/SearchVisualizer';

// Import performance components
import PerformanceMetrics from '../components/analytics/PerformanceMetrics';
import AlgorithmControls from '../components/common/AlgorithmControls';


// Inside the Algorithm component, add this state for code language



const Algorithm: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [algorithm, setAlgorithm] = useState<AlgorithmConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [codeLanguage, setCodeLanguage] = useState<'javascript' | 'python' | 'java' | 'cpp'>('javascript');
  const { currentUser } = useAuth();

  // Update in src/pages/Algorithm.tsx

  useEffect(() => {
    const fetchAlgorithm = async () => {
      try {
        setLoading(true);

        let algorithmData;

        if (id) {
          // Fetch specific algorithm by ID
          algorithmData = await getAlgorithm(id);
        } else if (type) {
          // If no ID but type is provided, fetch first algorithm of that type
          const algorithms = await getAlgorithmsByType(type as string);
          if (algorithms && algorithms.length > 0) {
            algorithmData = algorithms[0];
          }
        }

        if (algorithmData) {
          setAlgorithm(algorithmData);
        } else {
          setError('Algorithm not found');
        }
      } catch (err) {
        console.error('Error fetching algorithm:', err);
        setError('Failed to load algorithm data');
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithm();
  }, [id, type]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Render loading state
  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Render error state
  if (error || !algorithm) {
    return (
      <Container>
        <Alert severity="error" sx={{ my: 4 }}>
          {error || 'Failed to load algorithm'}
        </Alert>
      </Container>
    );
  }

  // Render the appropriate visualizer based on algorithm type
  const renderVisualizer = () => {
    switch (type) {
      case 'sorting':
        return <SortingVisualizer algorithm={algorithm} />;
      case 'graph':
        return <GraphVisualizer algorithm={algorithm} />;
      case 'tree':
        return <TreeVisualizer algorithm={algorithm} />;
      case 'search':
        return <SearchVisualizer algorithm={algorithm} />;
      default:
        return <Typography color="error">Unsupported algorithm type</Typography>;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {algorithm.name}
        </Typography>

        <Typography variant="body1" paragraph>
          {algorithm.description}
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <AlgorithmControls algorithm={algorithm} />
              <Box sx={{ mt: 2, minHeight: '400px' }}>
                {renderVisualizer()}
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Performance" />
                <Tab label="Code" />
                <Tab label="Explanation" />
              </Tabs>
              <Divider />
              <Box sx={{ p: 2 }}>
                {tabValue === 0 && <PerformanceMetrics algorithm={algorithm} />}
                {tabValue === 1 && (
                  <Box sx={{ width: '100%' }}>
                    <Tabs
                      value={codeLanguage}
                      onChange={(e, newValue) => setCodeLanguage(newValue)}
                      sx={{ mb: 2 }}
                    >
                      <Tab label="JavaScript" value="javascript" />
                      <Tab label="Python" value="python" />
                      <Tab label="Java" value="java" />
                      <Tab label="C++" value="cpp" />
                    </Tabs>

                    <Box component="pre" sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1, overflow: 'auto' }}>
                      <code>
                        {algorithm.name === 'Quick Sort' && codeLanguage === 'javascript' && `function quickSort(arr) {
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
}`}

                        {algorithm.name === 'Quick Sort' && codeLanguage === 'python' && `def quick_sort(arr):
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
    return quick_sort(less) + [pivot] + quick_sort(greater)`}

                        {algorithm.name === 'Quick Sort' && codeLanguage === 'java' && `public class QuickSort {
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
}`}

                        {algorithm.name === 'Quick Sort' && codeLanguage === 'cpp' && `#include <vector>
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
}`}

                        {algorithm.name === 'Bubble Sort' && codeLanguage === 'javascript' && `function bubbleSort(arr) {
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
}`}

                        {algorithm.name === 'Bubble Sort' && codeLanguage === 'python' && `def bubble_sort(arr):
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
            
    return arr`}

                        {algorithm.name === 'Bubble Sort' && codeLanguage === 'java' && `public class BubbleSort {
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
}`}

                        {algorithm.name === 'Bubble Sort' && codeLanguage === 'cpp' && `#include <vector>

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
}`}

                        {algorithm.name === 'Merge Sort' && codeLanguage === 'javascript' && `function mergeSort(arr) {
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
}`}

                        {algorithm.name === 'Merge Sort' && codeLanguage === 'python' && `def merge_sort(arr):
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
    
    return result`}

                        {algorithm.name === 'Merge Sort' && codeLanguage === 'java' && `public class MergeSort {
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
}`}

                        {algorithm.name === 'Merge Sort' && codeLanguage === 'cpp' && `#include <vector>

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
}`}

                        {algorithm.name === 'Heap Sort' && codeLanguage === 'javascript' && `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root (maximum value) to the end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;       // Initialize largest as root
  const left = 2 * i + 1;  // Left child
  const right = 2 * i + 2; // Right child
  
  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root
  if (largest !== i) {
    // Swap
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}`}

                        {algorithm.name === 'Heap Sort' && codeLanguage === 'python' && `def heap_sort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        # Move current root (maximum value) to the end
        arr[0], arr[i] = arr[i], arr[0]
        
        # Call max heapify on the reduced heap
        heapify(arr, i, 0)
    
    return arr

def heapify(arr, n, i):
    largest = i        # Initialize largest as root
    left = 2 * i + 1   # Left child
    right = 2 * i + 2  # Right child
    
    # If left child is larger than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # If right child is larger than largest so far
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # If largest is not root
    if largest != i:
        # Swap
        arr[i], arr[largest] = arr[largest], arr[i]
        
        # Recursively heapify the affected sub-tree
        heapify(arr, n, largest)`}

                        {algorithm.name === 'Heap Sort' && codeLanguage === 'java' && `public class HeapSort {
    public static int[] heapSort(int[] arr) {
        int n = arr.length;
        
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root (maximum value) to the end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            // Call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
        
        return arr;
    }
    
    private static void heapify(int[] arr, int n, int i) {
        int largest = i;      // Initialize largest as root
        int left = 2 * i + 1;  // Left child
        int right = 2 * i + 2; // Right child
        
        // If left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        // If largest is not root
        if (largest != i) {
            // Swap
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            
            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
    }
}`}

                        {algorithm.name === 'Heap Sort' && codeLanguage === 'cpp' && `#include <vector>
#include <algorithm> // for std::swap

void heapify(std::vector<int>& arr, int n, int i) {
    int largest = i;      // Initialize largest as root
    int left = 2 * i + 1;  // Left child
    int right = 2 * i + 2; // Right child
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // If largest is not root
    if (largest != i) {
        // Swap
        std::swap(arr[i], arr[largest]);
        
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

std::vector<int> heapSort(std::vector<int>& arr) {
    int n = arr.size();
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root (maximum value) to the end
        std::swap(arr[0], arr[i]);
        
        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
    
    return arr;
}`}
                      </code>
                    </Box>
                  </Box>
                )}
                {tabValue === 2 && (
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body1">
                      {/* Detailed explanation would go here */}
                      This algorithm works by... (detailed explanation)
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Algorithm Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                <strong>Category:</strong> {algorithm.type.charAt(0).toUpperCase() + algorithm.type.slice(1)}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Time Complexity:</strong> O(n log n) {/* This would be specific to the algorithm */}
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Space Complexity:</strong> O(n) {/* This would be specific to the algorithm */}
              </Typography>
              {currentUser && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Save to Favorites
                </Button>
              )}
            </Paper>

            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Related Algorithms
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box component="ul" sx={{ pl: 2 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">Algorithm 1</Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">Algorithm 2</Typography>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Typography variant="body2">Algorithm 3</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Algorithm;