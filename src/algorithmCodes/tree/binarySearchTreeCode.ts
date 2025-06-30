const BinarySearchTreeCode = {
  javascript: `class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  // Insert a key into the BST
  insert(key) {
    const newNode = new Node(key);
    
    // If tree is empty, new node becomes root
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    
    // Otherwise, find the correct position
    const insertHelper = (node, newNode) => {
      // If new key is less than node's key, go left
      if (newNode.key < node.key) {
        // If left is null, insert here
        if (node.left === null) {
          node.left = newNode;
        } else {
          // Otherwise, continue down the left subtree
          insertHelper(node.left, newNode);
        }
      } 
      // If new key is greater than node's key, go right
      else if (newNode.key > node.key) {
        // If right is null, insert here
        if (node.right === null) {
          node.right = newNode;
        } else {
          // Otherwise, continue down the right subtree
          insertHelper(node.right, newNode);
        }
      }
      // If keys are equal, do nothing (no duplicates)
    };
    
    insertHelper(this.root, newNode);
  }
  
  // Search for a key in the BST
  search(key) {
    return this.searchNode(this.root, key);
  }
  
  searchNode(node, key) {
    // Base case: if node is null or key matches
    if (node === null) {
      return false;
    }
    
    if (key === node.key) {
      return true;
    }
    
    // If key is less than node's key, search left subtree
    if (key < node.key) {
      return this.searchNode(node.left, key);
    }
    
    // If key is greater than node's key, search right subtree
    return this.searchNode(node.right, key);
  }
  
  // In-order traversal (sorted order)
  inorder() {
    const result = [];
    
    const traverse = (node) => {
      if (node !== null) {
        // Visit left subtree
        traverse(node.left);
        // Visit node
        result.push(node.key);
        // Visit right subtree
        traverse(node.right);
      }
    };
    
    traverse(this.root);
    return result;
  }
  
  // Pre-order traversal
  preorder() {
    const result = [];
    
    const traverse = (node) => {
      if (node !== null) {
        // Visit node
        result.push(node.key);
        // Visit left subtree
        traverse(node.left);
        // Visit right subtree
        traverse(node.right);
      }
    };
    
    traverse(this.root);
    return result;
  }
  
  // Post-order traversal
  postorder() {
    const result = [];
    
    const traverse = (node) => {
      if (node !== null) {
        // Visit left subtree
        traverse(node.left);
        // Visit right subtree
        traverse(node.right);
        // Visit node
        result.push(node.key);
      }
    };
    
    traverse(this.root);
    return result;
  }
  
  // Find the minimum value in the tree
  min() {
    if (this.root === null) {
      return null;
    }
    
    let current = this.root;
    
    // Keep going left until we reach a leaf
    while (current.left !== null) {
      current = current.left;
    }
    
    return current.key;
  }
  
  // Find the maximum value in the tree
  max() {
    if (this.root === null) {
      return null;
    }
    
    let current = this.root;
    
    // Keep going right until we reach a leaf
    while (current.right !== null) {
      current = current.right;
    }
    
    return current.key;
  }
}

// Example usage
const bst = new BinarySearchTree();
bst.insert(30);
bst.insert(20);
bst.insert(40);
bst.insert(10);
bst.insert(25);

console.log("In-order traversal:", bst.inorder());  // [10, 20, 25, 30, 40]
console.log("Search for 25:", bst.search(25));      // true
console.log("Search for 15:", bst.search(15));      // false
console.log("Minimum value:", bst.min());           // 10
console.log("Maximum value:", bst.max());           // 40`,

  python: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None
    
    # Insert a key into the BST
    def insert(self, key):
        if self.root is None:
            self.root = Node(key)
        else:
            self._insert_recursive(self.root, key)
    
    def _insert_recursive(self, node, key):
        # If key is less than node's key, go left
        if key < node.key:
            # If left is None, insert here
            if node.left is None:
                node.left = Node(key)
            else:
                # Otherwise, continue down the left subtree
                self._insert_recursive(node.left, key)
        # If key is greater than node's key, go right
        elif key > node.key:
            # If right is None, insert here
            if node.right is None:
                node.right = Node(key)
            else:
                # Otherwise, continue down the right subtree
                self._insert_recursive(node.right, key)
        # If keys are equal, do nothing (no duplicates)
    
    # Search for a key in the BST
    def search(self, key):
        return self._search_recursive(self.root, key)
    
    def _search_recursive(self, node, key):
        # Base case: if node is None or key matches
        if node is None:
            return False
        
        if key == node.key:
            return True
        
        # If key is less than node's key, search left subtree
        if key < node.key:
            return self._search_recursive(node.left, key)
        
        # If key is greater than node's key, search right subtree
        return self._search_recursive(node.right, key)
    
    # In-order traversal (sorted order)
    def inorder(self):
        result = []
        self._inorder_recursive(self.root, result)
        return result
    
    def _inorder_recursive(self, node, result):
        if node:
            # Visit left subtree
            self._inorder_recursive(node.left, result)
            # Visit node
            result.append(node.key)
            # Visit right subtree
            self._inorder_recursive(node.right, result)
    
    # Pre-order traversal
    def preorder(self):
        result = []
        self._preorder_recursive(self.root, result)
        return result
    
    def _preorder_recursive(self, node, result):
        if node:
            # Visit node
            result.append(node.key)
            # Visit left subtree
            self._preorder_recursive(node.left, result)
            # Visit right subtree
            self._preorder_recursive(node.right, result)
    
    # Post-order traversal
    def postorder(self):
        result = []
        self._postorder_recursive(self.root, result)
        return result
    
    def _postorder_recursive(self, node, result):
        if node:
            # Visit left subtree
            self._postorder_recursive(node.left, result)
            # Visit right subtree
            self._postorder_recursive(node.right, result)
            # Visit node
            result.append(node.key)
    
    # Find the minimum value in the tree
    def min(self):
        if self.root is None:
            return None
        
        current = self.root
        
        # Keep going left until we reach a leaf
        while current.left:
            current = current.left
        
        return current.key
    
    # Find the maximum value in the tree
    def max(self):
        if self.root is None:
            return None
        
        current = self.root
        
        # Keep going right until we reach a leaf
        while current.right:
            current = current.right
        
        return current.key

# Example usage
bst = BinarySearchTree()
bst.insert(30)
bst.insert(20)
bst.insert(40)
bst.insert(10)
bst.insert(25)

print("In-order traversal:", bst.inorder())  # [10, 20, 25, 30, 40]
print("Search for 25:", bst.search(25))      # True
print("Search for 15:", bst.search(15))      # False
print("Minimum value:", bst.min())           # 10
print("Maximum value:", bst.max())           # 40`,

  java: `class Node {
    int key;
    Node left;
    Node right;
    
    Node(int key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

public class BinarySearchTree {
    private Node root;
    
    public BinarySearchTree() {
        root = null;
    }
    
    // Insert a key into the BST
    public void insert(int key) {
        root = insertRecursive(root, key);
    }
    
    private Node insertRecursive(Node node, int key) {
        // If tree is empty, create a new node
        if (node == null) {
            return new Node(key);
        }
        
        // Otherwise, traverse the tree
        if (key < node.key) {
            node.left = insertRecursive(node.left, key);
        } else if (key > node.key) {
            node.right = insertRecursive(node.right, key);
        }
        
        // If keys are equal, do nothing (no duplicates)
        return node;
    }
    
    // Search for a key in the BST
    public boolean search(int key) {
        return searchRecursive(root, key);
    }
    
    private boolean searchRecursive(Node node, int key) {
        // Base case: if node is null or key matches
        if (node == null) {
            return false;
        }
        
        if (key == node.key) {
            return true;
        }
        
        // If key is less than node's key, search left subtree
        if (key < node.key) {
            return searchRecursive(node.left, key);
        }
        
        // If key is greater than node's key, search right subtree
        return searchRecursive(node.right, key);
    }
    
    // In-order traversal (sorted order)
    public void inorder() {
        inorderRecursive(root);
        System.out.println();
    }
    
    private void inorderRecursive(Node node) {
        if (node != null) {
            // Visit left subtree
            inorderRecursive(node.left);
            // Visit node
            System.out.print(node.key + " ");
            // Visit right subtree
            inorderRecursive(node.right);
        }
    }
    
    // Pre-order traversal
    public void preorder() {
        preorderRecursive(root);
        System.out.println();
    }
    
    private void preorderRecursive(Node node) {
        if (node != null) {
            // Visit node
            System.out.print(node.key + " ");
            // Visit left subtree
            preorderRecursive(node.left);
            // Visit right subtree
            preorderRecursive(node.right);
        }
    }
    
    // Post-order traversal
    public void postorder() {
        postorderRecursive(root);
        System.out.println();
    }
    
    private void postorderRecursive(Node node) {
        if (node != null) {
            // Visit left subtree
            postorderRecursive(node.left);
            // Visit right subtree
            postorderRecursive(node.right);
            // Visit node
            System.out.print(node.key + " ");
        }
    }
    
    // Find the minimum value in the tree
    public Integer min() {
        if (root == null) {
            return null;
        }
        
        Node current = root;
        
        // Keep going left until we reach a leaf
        while (current.left != null) {
            current = current.left;
        }
        
        return current.key;
    }
    
    // Find the maximum value in the tree
    public Integer max() {
        if (root == null) {
            return null;
        }
        
        Node current = root;
        
        // Keep going right until we reach a leaf
        while (current.right != null) {
            current = current.right;
        }
        
        return current.key;
    }
    
    public static void main(String[] args) {
        BinarySearchTree bst = new BinarySearchTree();
        bst.insert(30);
        bst.insert(20);
        bst.insert(40);
        bst.insert(10);
        bst.insert(25);
        
        System.out.print("In-order traversal: ");
        bst.inorder();  // 10 20 25 30 40
        
        System.out.println("Search for 25: " + bst.search(25));  // true
        System.out.println("Search for 15: " + bst.search(15));  // false
        
        System.out.println("Minimum value: " + bst.min());  // 10
        System.out.println("Maximum value: " + bst.max());  // 40
    }
}`,

  cpp: `#include <iostream>
#include <vector>

class Node {
public:
    int key;
    Node* left;
    Node* right;
    
    Node(int k) : key(k), left(nullptr), right(nullptr) {}
};

class BinarySearchTree {
private:
    Node* root;
    
    // Helper function for insertion
    Node* insertRecursive(Node* node, int key) {
        // If tree is empty or reached a leaf, create a new node
        if (node == nullptr) {
            return new Node(key);
        }
        
        // Otherwise, traverse the tree
        if (key < node->key) {
            node->left = insertRecursive(node->left, key);
        } else if (key > node->key) {
            node->right = insertRecursive(node->right, key);
        }
        
        // If keys are equal, do nothing (no duplicates)
        return node;
    }
    
    // Helper function for searching
    bool searchRecursive(Node* node, int key) {
        // Base case: if node is null or key matches
        if (node == nullptr) {
            return false;
        }
        
        if (key == node->key) {
            return true;
        }
        
        // If key is less than node's key, search left subtree
        if (key < node->key) {
            return searchRecursive(node->left, key);
        }
        
        // If key is greater than node's key, search right subtree
        return searchRecursive(node->right, key);
    }
    
    // Helper function for in-order traversal
    void inorderRecursive(Node* node, std::vector<int>& result) {
        if (node != nullptr) {
            // Visit left subtree
            inorderRecursive(node->left, result);
            // Visit node
            result.push_back(node->key);
            // Visit right subtree
            inorderRecursive(node->right, result);
        }
    }
    
    // Helper function for pre-order traversal
    void preorderRecursive(Node* node, std::vector<int>& result) {
        if (node != nullptr) {
            // Visit node
            result.push_back(node->key);
            // Visit left subtree
            preorderRecursive(node->left, result);
            // Visit right subtree
            preorderRecursive(node->right, result);
        }
    }
    
    // Helper function for post-order traversal
    void postorderRecursive(Node* node, std::vector<int>& result) {
        if (node != nullptr) {
            // Visit left subtree
            postorderRecursive(node->left, result);
            // Visit right subtree
            postorderRecursive(node->right, result);
            // Visit node
            result.push_back(node->key);
        }
    }
    
    // Helper function to delete the tree
    void deleteTree(Node* node) {
        if (node != nullptr) {
            deleteTree(node->left);
            deleteTree(node->right);
            delete node;
        }
    }
    
public:
    BinarySearchTree() : root(nullptr) {}
    
    ~BinarySearchTree() {
        deleteTree(root);
    }
    
    // Insert a key into the BST
    void insert(int key) {
        root = insertRecursive(root, key);
    }
    
    // Search for a key in the BST
    bool search(int key) {
        return searchRecursive(root, key);
    }
    
    // In-order traversal (sorted order)
    std::vector<int> inorder() {
        std::vector<int> result;
        inorderRecursive(root, result);
        return result;
    }
    
    // Pre-order traversal
    std::vector<int> preorder() {
        std::vector<int> result;
        preorderRecursive(root, result);
        return result;
    }
    
    // Post-order traversal
    std::vector<int> postorder() {
        std::vector<int> result;
        postorderRecursive(root, result);
        return result;
    }
    
    // Find the minimum value in the tree
    int* min() {
        if (root == nullptr) {
            return nullptr;
        }
        
        Node* current = root;
        
        // Keep going left until we reach a leaf
        while (current->left != nullptr) {
            current = current->left;
        }
        
        return new int(current->key);
    }
    
    // Find the maximum value in the tree
    int* max() {
        if (root == nullptr) {
            return nullptr;
        }
        
        Node* current = root;
        
        // Keep going right until we reach a leaf
        while (current->right != nullptr) {
            current = current->right;
        }
        
        return new int(current->key);
    }
};

int main() {
    BinarySearchTree bst;
    bst.insert(30);
    bst.insert(20);
    bst.insert(40);
    bst.insert(10);
    bst.insert(25);
    
    std::cout << "In-order traversal: ";
    for (int val : bst.inorder()) {
        std::cout << val << " ";
    }
    std::cout << std::endl;  // 10 20 25 30 40
    
    std::cout << "Search for 25: " << (bst.search(25) ? "true" : "false") << std::endl;  // true
    std::cout << "Search for 15: " << (bst.search(15) ? "true" : "false") << std::endl;  // false
    
    int* minVal = bst.min();
    int* maxVal = bst.max();
    
    if (minVal) {
        std::cout << "Minimum value: " << *minVal << std::endl;  // 10
        delete minVal;
    }
    
    if (maxVal) {
        std::cout << "Maximum value: " << *maxVal << std::endl;  // 40
        delete maxVal;
    }
    
    return 0;
}`
};

export default BinarySearchTreeCode;