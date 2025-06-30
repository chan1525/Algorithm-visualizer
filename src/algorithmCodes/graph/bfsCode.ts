const BFSCode = {
  javascript: `function breadthFirstSearch(graph, startNode) {
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
  
  // Queue for BFS (using array as queue)
  const queue = [startNode];
  
  // Main BFS loop
  while (queue.length > 0) {
    // Dequeue a node from the front of the queue
    const currentNode = queue.shift();
    
    // Skip if already visited
    if (visited.has(currentNode)) {
      continue;
    }
    
    // Mark as visited and add to traversal order
    visited.add(currentNode);
    traversalOrder.push(currentNode);
    
    // Get all neighbors
    const neighbors = adjacencyList[currentNode];
    
    // Enqueue all unvisited neighbors
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor) && !queue.includes(neighbor)) {
        queue.push(neighbor);
      }
    }
  }
  
  return {
    visited: Array.from(visited),
    traversalOrder
  };
}`,

  python: `def breadth_first_search(graph, start_node):
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
    
    # Queue for BFS (using list as queue)
    queue = [start_node]
    
    # Main BFS loop
    while queue:
        # Dequeue a node from the front of the queue
        current_node = queue.pop(0)
        
        # Skip if already visited
        if current_node in visited:
            continue
        
        # Mark as visited and add to traversal order
        visited.add(current_node)
        traversal_order.append(current_node)
        
        # Get all neighbors
        neighbors = adjacency_list[current_node]
        
        # Enqueue all unvisited neighbors
        for neighbor in neighbors:
            if neighbor not in visited and neighbor not in queue:
                queue.append(neighbor)
    
    return {
        'visited': list(visited),
        'traversal_order': traversal_order
    }`,

  java: `import java.util.*;

public class BreadthFirstSearch {
    public static Map<String, Object> breadthFirstSearch(Map<String, Object> graph, int startNode) {
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
        
        // Queue for BFS
        Queue<Integer> queue = new LinkedList<>();
        queue.add(startNode);
        
        // Main BFS loop
        while (!queue.isEmpty()) {
            // Dequeue a node from the queue
            int currentNode = queue.poll();
            
            // Skip if already visited
            if (visited.contains(currentNode)) {
                continue;
            }
            
            // Mark as visited and add to traversal order
            visited.add(currentNode);
            traversalOrder.add(currentNode);
            
            // Get all neighbors
            List<Integer> neighbors = adjacencyList.get(currentNode);
            
            // Enqueue all unvisited neighbors
            for (int neighbor : neighbors) {
                if (!visited.contains(neighbor) && !queue.contains(neighbor)) {
                    queue.add(neighbor);
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
#include <queue>
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

struct BFSResult {
    std::vector<int> visited;
    std::vector<int> traversalOrder;
};

BFSResult breadthFirstSearch(const Graph& graph, int startNode) {
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
    
    // Queue for BFS
    std::queue<int> queue;
    queue.push(startNode);
    
    // Main BFS loop
    while (!queue.empty()) {
        // Dequeue a node from the queue
        int currentNode = queue.front();
        queue.pop();
        
        // Skip if already visited
        if (visited.find(currentNode) != visited.end()) {
            continue;
        }
        
        // Mark as visited and add to traversal order
        visited.insert(currentNode);
        traversalOrder.push_back(currentNode);
        
        // Get all neighbors
        const auto& neighbors = adjacencyList[currentNode];
        
        // Enqueue all unvisited neighbors
        for (int neighbor : neighbors) {
            // Check if neighbor is in the queue (this is less efficient in C++)
            bool inQueue = false;
            std::queue<int> tempQueue = queue;
            while (!tempQueue.empty()) {
                if (tempQueue.front() == neighbor) {
                    inQueue = true;
                    break;
                }
                tempQueue.pop();
            }
            
            if (visited.find(neighbor) == visited.end() && !inQueue) {
                queue.push(neighbor);
            }
        }
    }
    
    // Prepare result
    BFSResult result;
    result.visited.assign(visited.begin(), visited.end());
    result.traversalOrder = traversalOrder;
    
    return result;
}`
};

export default BFSCode;