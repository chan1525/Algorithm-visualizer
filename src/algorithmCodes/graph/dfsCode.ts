const DFSCode = {
  javascript: `function depthFirstSearch(graph, startNode) {
  // Create an adjacency list for the graph
  const adjacencyList = {};
  
  // Build the adjacency list
  for (const node of graph.nodes) {
    adjacencyList[node.id] = [];
  }
  
  for (const edge of graph.edges) {
    adjacencyList[edge.source].push(edge.target);
  }
  
  // Set to keep track of visited nodes
  const visited = new Set();
  
  // Array to keep track of traversal order
  const traversalOrder = [];
  
  // Stack for DFS (using array as stack)
  const stack = [startNode];
  
  // Main DFS loop
  while (stack.length > 0) {
    // Pop a node from the stack
    const currentNode = stack.pop();
    
    // Skip if already visited
    if (visited.has(currentNode)) {
      continue;
    }
    
    // Mark as visited and add to traversal order
    visited.add(currentNode);
    traversalOrder.push(currentNode);
    
    // Get all neighbors
    const neighbors = adjacencyList[currentNode];
    
    // Push neighbors to stack in reverse order
    // (so they're processed in the original order when popped)
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i];
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
  
  return {
    visited: Array.from(visited),
    traversalOrder
  };
}`,

  python: `def depth_first_search(graph, start_node):
    # Create an adjacency list for the graph
    adjacency_list = {}
    
    # Build the adjacency list
    for node in graph['nodes']:
        adjacency_list[node['id']] = []
    
    for edge in graph['edges']:
        adjacency_list[edge['source']].append(edge['target'])
    
    # Set to keep track of visited nodes
    visited = set()
    
    # List to keep track of traversal order
    traversal_order = []
    
    # Stack for DFS (using list as stack)
    stack = [start_node]
    
    # Main DFS loop
    while stack:
        # Pop a node from the stack
        current_node = stack.pop()
        
        # Skip if already visited
        if current_node in visited:
            continue
        
        # Mark as visited and add to traversal order
        visited.add(current_node)
        traversal_order.append(current_node)
        
        # Get all neighbors
        neighbors = adjacency_list[current_node]
        
        # Push neighbors to stack in reverse order
        # (so they're processed in the original order when popped)
        for neighbor in reversed(neighbors):
            if neighbor not in visited:
                stack.append(neighbor)
    
    return {
        'visited': list(visited),
        'traversal_order': traversal_order
    }`,

  java: `import java.util.*;

public class DepthFirstSearch {
    public static Map<String, Object> depthFirstSearch(Map<String, Object> graph, int startNode) {
        // Create an adjacency list for the graph
        Map<Integer, List<Integer>> adjacencyList = new HashMap<>();
        
        // Build the adjacency list
        List<Map<String, Object>> nodes = (List<Map<String, Object>>) graph.get("nodes");
        List<Map<String, Object>> edges = (List<Map<String, Object>>) graph.get("edges");
        
        for (Map<String, Object> node : nodes) {
            int nodeId = (Integer) node.get("id");
            adjacencyList.put(nodeId, new ArrayList<>());
        }
        
        for (Map<String, Object> edge : edges) {
            int source = (Integer) edge.get("source");
            int target = (Integer) edge.get("target");
            adjacencyList.get(source).add(target);
        }
        
        // Set to keep track of visited nodes
        Set<Integer> visited = new HashSet<>();
        
        // List to keep track of traversal order
        List<Integer> traversalOrder = new ArrayList<>();
        
        // Stack for DFS
        Stack<Integer> stack = new Stack<>();
        stack.push(startNode);
        
        // Main DFS loop
        while (!stack.isEmpty()) {
            // Pop a node from the stack
            int currentNode = stack.pop();
            
            // Skip if already visited
            if (visited.contains(currentNode)) {
                continue;
            }
            
            // Mark as visited and add to traversal order
            visited.add(currentNode);
            traversalOrder.add(currentNode);
            
            // Get all neighbors
            List<Integer> neighbors = adjacencyList.get(currentNode);
            
            // Push neighbors to stack in reverse order
            for (int i = neighbors.size() - 1; i >= 0; i--) {
                int neighbor = neighbors.get(i);
                if (!visited.contains(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
        
        // Prepare result
        Map<String, Object> result = new HashMap<>();
        result.put("visited", new ArrayList<>(visited));
        result.put("traversalOrder", traversalOrder);
        
        return result;
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <stack>
#include <algorithm>

struct Node {
    int id;
    std::string label;
    double x;
    double y;
};

struct Edge {
    int source;
    int target;
    int weight;
};

struct Graph {
    std::vector<Node> nodes;
    std::vector<Edge> edges;
};

struct DFSResult {
    std::vector<int> visited;
    std::vector<int> traversalOrder;
};

DFSResult depthFirstSearch(const Graph& graph, int startNode) {
    // Create an adjacency list for the graph
    std::unordered_map<int, std::vector<int>> adjacencyList;
    
    // Build the adjacency list
    for (const auto& node : graph.nodes) {
        adjacencyList[node.id] = std::vector<int>();
    }
    
    for (const auto& edge : graph.edges) {
        adjacencyList[edge.source].push_back(edge.target);
    }
    
    // Set to keep track of visited nodes
    std::unordered_set<int> visited;
    
    // Vector to keep track of traversal order
    std::vector<int> traversalOrder;
    
    // Stack for DFS
    std::stack<int> stack;
    stack.push(startNode);
    
    // Main DFS loop
    while (!stack.empty()) {
        // Pop a node from the stack
        int currentNode = stack.top();
        stack.pop();
        
        // Skip if already visited
        if (visited.find(currentNode) != visited.end()) {
            continue;
        }
        
        // Mark as visited and add to traversal order
        visited.insert(currentNode);
        traversalOrder.push_back(currentNode);
        
        // Get all neighbors
        const auto& neighbors = adjacencyList[currentNode];
        
        // Push neighbors to stack in reverse order
        for (auto it = neighbors.rbegin(); it != neighbors.rend(); ++it) {
            int neighbor = *it;
            if (visited.find(neighbor) == visited.end()) {
                stack.push(neighbor);
            }
        }
    }
    
    // Prepare result
    DFSResult result;
    result.visited.assign(visited.begin(), visited.end());
    result.traversalOrder = traversalOrder;
    
    return result;
}`
};

export default DFSCode;