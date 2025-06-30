const DijkstraCode = {
  javascript: `function dijkstra(graph, startNode, endNode) {
  // Create a distances object to store shortest distances from start
  const distances = {};
  // Create a previous object to store the previous node on the shortest path
  const previous = {};
  // Create a set of unvisited nodes
  const unvisited = new Set();
  
  // Initialize all distances as Infinity and previous as null
  for (const node of graph.nodes) {
    distances[node.id] = node.id === startNode ? 0 : Infinity;
    previous[node.id] = null;
    unvisited.add(node.id);
  }
  
  // Main loop - continue until all nodes are visited or end node is reached
  while (unvisited.size > 0) {
    // Find the unvisited node with the smallest distance
    let current = null;
    let minDistance = Infinity;
    
    for (const nodeId of unvisited) {
      if (distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        current = nodeId;
      }
    }
    
    // If no node found or reached the end node
    if (current === null || current === endNode || minDistance === Infinity) {
      break;
    }
    
    // Mark current node as visited
    unvisited.delete(current);
    
    // Get all neighbors of current node
    const neighbors = graph.edges
      .filter(edge => edge.source === current)
      .map(edge => ({
        id: edge.target,
        weight: edge.weight
      }));
    
    // For each neighbor, calculate tentative distance
    for (const neighbor of neighbors) {
      const newDistance = distances[current] + neighbor.weight;
      
      // If new distance is shorter than the current distance
      if (newDistance < distances[neighbor.id]) {
        // Update distance and previous node
        distances[neighbor.id] = newDistance;
        previous[neighbor.id] = current;
      }
    }
  }
  
  // Reconstruct the shortest path
  const path = [];
  let current = endNode;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return {
    distances,
    path
  };
}`,

  python: `def dijkstra(graph, start_node, end_node):
    # Create a dictionary to store shortest distances from start
    distances = {}
    # Create a dictionary to store the previous node on the shortest path
    previous = {}
    # Create a set of unvisited nodes
    unvisited = set()
    
    # Initialize all distances as infinity and previous as None
    for node in graph['nodes']:
        if node['id'] == start_node:
            distances[node['id']] = 0
        else:
            distances[node['id']] = float('inf')
        previous[node['id']] = None
        unvisited.add(node['id'])
    
    # Main loop - continue until all nodes are visited or end node is reached
    while unvisited:
        # Find the unvisited node with the smallest distance
        current = None
        min_distance = float('inf')
        
        for node_id in unvisited:
            if distances[node_id] < min_distance:
                min_distance = distances[node_id]
                current = node_id
        
        # If no node found or reached the end node
        if current is None or current == end_node or min_distance == float('inf'):
            break
        
        # Mark current node as visited
        unvisited.remove(current)
        
        # Get all neighbors of current node
        neighbors = []
        for edge in graph['edges']:
            if edge['source'] == current:
                neighbors.append({
                    'id': edge['target'],
                    'weight': edge['weight']
                })
        
        # For each neighbor, calculate tentative distance
        for neighbor in neighbors:
            new_distance = distances[current] + neighbor['weight']
            
            # If new distance is shorter than the current distance
            if new_distance < distances[neighbor['id']]:
                # Update distance and previous node
                distances[neighbor['id']] = new_distance
                previous[neighbor['id']] = current
    
    # Reconstruct the shortest path
    path = []
    current = end_node
    
    while current is not None:
        path.insert(0, current)
        current = previous[current]
    
    return {
        'distances': distances,
        'path': path
    }`,

  java: `import java.util.*;

public class Dijkstra {
    public static Map<String, Object> dijkstra(Map<String, Object> graph, int startNode, int endNode) {
        // Create a map to store shortest distances from start
        Map<Integer, Integer> distances = new HashMap<>();
        // Create a map to store the previous node on the shortest path
        Map<Integer, Integer> previous = new HashMap<>();
        // Create a set of unvisited nodes
        Set<Integer> unvisited = new HashSet<>();
        
        // Get nodes and edges from the graph
        List<Map<String, Object>> nodes = (List<Map<String, Object>>) graph.get("nodes");
        List<Map<String, Object>> edges = (List<Map<String, Object>>) graph.get("edges");
        
        // Initialize all distances as Integer.MAX_VALUE and previous as null
        for (Map<String, Object> node : nodes) {
            int nodeId = (Integer) node.get("id");
            distances.put(nodeId, nodeId == startNode ? 0 : Integer.MAX_VALUE);
            previous.put(nodeId, null);
            unvisited.add(nodeId);
        }
        
        // Main loop - continue until all nodes are visited or end node is reached
        while (!unvisited.isEmpty()) {
            // Find the unvisited node with the smallest distance
            Integer current = null;
            int minDistance = Integer.MAX_VALUE;
            
            for (int nodeId : unvisited) {
                if (distances.get(nodeId) < minDistance) {
                    minDistance = distances.get(nodeId);
                    current = nodeId;
                }
            }
            
            // If no node found or reached the end node
            if (current == null || current == endNode || minDistance == Integer.MAX_VALUE) {
                break;
            }
            
            // Mark current node as visited
            unvisited.remove(current);
            
            // Get all neighbors of current node
            List<Map<String, Object>> neighbors = new ArrayList<>();
            for (Map<String, Object> edge : edges) {
                if ((Integer) edge.get("source") == current) {
                    Map<String, Object> neighbor = new HashMap<>();
                    neighbor.put("id", edge.get("target"));
                    neighbor.put("weight", edge.get("weight"));
                    neighbors.add(neighbor);
                }
            }
            
            // For each neighbor, calculate tentative distance
            for (Map<String, Object> neighbor : neighbors) {
                int neighborId = (Integer) neighbor.get("id");
                int weight = (Integer) neighbor.get("weight");
                int newDistance = distances.get(current) + weight;
                
                // If new distance is shorter than the current distance
                if (newDistance < distances.get(neighborId)) {
                    // Update distance and previous node
                    distances.put(neighborId, newDistance);
                    previous.put(neighborId, current);
                }
            }
        }
        
        // Reconstruct the shortest path
        List<Integer> path = new ArrayList<>();
        Integer current = endNode;
        
        while (current != null) {
            path.add(0, current);
            current = previous.get(current);
        }
        
        // Return the result
        Map<String, Object> result = new HashMap<>();
        result.put("distances", distances);
        result.put("path", path);
        
        return result;
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <limits>
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

struct DijkstraResult {
    std::unordered_map<int, int> distances;
    std::vector<int> path;
};

DijkstraResult dijkstra(const Graph& graph, int startNode, int endNode) {
    // Create a map to store shortest distances from start
    std::unordered_map<int, int> distances;
    // Create a map to store the previous node on the shortest path
    std::unordered_map<int, int> previous;
    // Create a set of unvisited nodes
    std::unordered_set<int> unvisited;
    
    // Initialize all distances as INT_MAX and previous as -1
    for (const auto& node : graph.nodes) {
        distances[node.id] = (node.id == startNode) ? 0 : std::numeric_limits<int>::max();
        previous[node.id] = -1;
        unvisited.insert(node.id);
    }
    
    // Main loop - continue until all nodes are visited or end node is reached
    while (!unvisited.empty()) {
        // Find the unvisited node with the smallest distance
        int current = -1;
        int minDistance = std::numeric_limits<int>::max();
        
        for (int nodeId : unvisited) {
            if (distances[nodeId] < minDistance) {
                minDistance = distances[nodeId];
                current = nodeId;
            }
        }
        
        // If no node found or reached the end node
        if (current == -1 || current == endNode || minDistance == std::numeric_limits<int>::max()) {
            break;
        }
        
        // Mark current node as visited
        unvisited.erase(current);
        
        // Get all neighbors of current node
        std::vector<std::pair<int, int>> neighbors;
        for (const auto& edge : graph.edges) {
            if (edge.source == current) {
                neighbors.push_back({edge.target, edge.weight});
            }
        }
        
        // For each neighbor, calculate tentative distance
        for (const auto& [neighborId, weight] : neighbors) {
            // Ensure we don't have integer overflow
            if (distances[current] == std::numeric_limits<int>::max()) {
                continue;
            }
            
            int newDistance = distances[current] + weight;
            
            // If new distance is shorter than the current distance
            if (newDistance < distances[neighborId]) {
                // Update distance and previous node
                distances[neighborId] = newDistance;
                previous[neighborId] = current;
            }
        }
    }
    
    // Reconstruct the shortest path
    std::vector<int> path;
    int current = endNode;
    
    while (current != -1) {
        path.insert(path.begin(), current);
        current = previous[current];
    }
    
    // Return the result
    return {distances, path};
}`
};

export default DijkstraCode;