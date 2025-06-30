const AVLTreeCode = {
  javascript: `class Node {
  constructor(key) {
    this.key = key;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }
  
  // Helper function to get height of a node
  height(node) {
    return node ? node.height : 0;
  }
  
  // Get balance factor of a node
  getBalanceFactor(node) {
    return node ? this.height(node.left) - this.height(node.right) : 0;
  }
  
  // Right rotation
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;
    
    // Perform rotation
    x.right = y;
    y.left = T2;
    
    // Update heights
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    
    // Return new root
    return x;
  }
  
  // Left rotation
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;
    
    // Perform rotation
    y.left = x;
    x.right = T2;
    
    // Update heights
    x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
    y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
    
    // Return new root
    return y;
  }
  
  // Insert a node
  insert(key) {
    this.root = this._insert(this.root, key);
    return this.root;
  }
  
  _insert(node, key) {
    // Standard BST insert
    if (node === null) {
      return new Node(key);
    }
    
    if (key < node.key) {
      node.left = this._insert(node.left, key);
    } else if (key > node.key) {
      node.right = this._insert(node.right, key);
    } else {
      // Duplicate keys are not allowed
      return node;
    }
    
    // Update height of current node
    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
    
    // Get the balance factor
    const balance = this.getBalanceFactor(node);
    
    // Left-Left Case
    if (balance > 1 && key < node.left.key) {
      return this.rightRotate(node);
    }
    
    // Right-Right Case
    if (balance < -1 && key > node.right.key) {
      return this.leftRotate(node);
    }
    
    // Left-Right Case
    if (balance > 1 && key > node.left.key) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    
    // Right-Left Case
    if (balance < -1 && key < node.right.key) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }
    
    // Return the unchanged node
    return node;
  }
  
  // Print the tree in-order
  inOrder() {
    const result = [];
    this._inOrder(this.root, result);
    return result;
  }
  
  _inOrder(node, result) {
    if (node !== null) {
      this._inOrder(node.left, result);
      result.push({
        key: node.key,
        height: node.height,
        balanceFactor: this.getBalanceFactor(node)
      });
      this._inOrder(node.right, result);
    }
  }
}

// Example usage
const avl = new AVLTree();
avl.insert(30);
avl.insert(20);
avl.insert(40);
avl.insert(10);
avl.insert(25);
console.log(avl.inOrder());`,

  python: `class Node:
    def __init__(self, key):
        self.key = key
        self.height = 1
        self.left = None
        self.right = None

class AVLTree:
    def __init__(self):
        self.root = None
    
    # Helper function to get height of a node
    def height(self, node):
        if node is None:
            return 0
        return node.height
    
    # Get balance factor of a node
    def get_balance_factor(self, node):
        if node is None:
            return 0
        return self.height(node.left) - self.height(node.right)
    
    # Right rotation
    def right_rotate(self, y):
        x = y.left
        T2 = x.right
        
        # Perform rotation
        x.right = y
        y.left = T2
        
        # Update heights
        y.height = max(self.height(y.left), self.height(y.right)) + 1
        x.height = max(self.height(x.left), self.height(x.right)) + 1
        
        # Return new root
        return x
    
    # Left rotation
    def left_rotate(self, x):
        y = x.right
        T2 = y.left
        
        # Perform rotation
        y.left = x
        x.right = T2
        
        # Update heights
        x.height = max(self.height(x.left), self.height(x.right)) + 1
        y.height = max(self.height(y.left), self.height(y.right)) + 1
        
        # Return new root
        return y
    
    # Insert a node
    def insert(self, key):
        self.root = self._insert(self.root, key)
        return self.root
    
    def _insert(self, node, key):
        # Standard BST insert
        if node is None:
            return Node(key)
        
        if key < node.key:
            node.left = self._insert(node.left, key)
        elif key > node.key:
            node.right = self._insert(node.right, key)
        else:
            # Duplicate keys are not allowed
            return node
        
        # Update height of current node
        node.height = 1 + max(self.height(node.left), self.height(node.right))
        
        # Get the balance factor
        balance = self.get_balance_factor(node)
        
        # Left-Left Case
        if balance > 1 and key < node.left.key:
            return self.right_rotate(node)
        
        # Right-Right Case
        if balance < -1 and key > node.right.key:
            return self.left_rotate(node)
        
        # Left-Right Case
        if balance > 1 and key > node.left.key:
            node.left = self.left_rotate(node.left)
            return self.right_rotate(node)
        
        # Right-Left Case
        if balance < -1 and key < node.right.key:
            node.right = self.right_rotate(node.right)
            return self.left_rotate(node)
        
        # Return the unchanged node
        return node
    
    # Print the tree in-order
    def in_order(self):
        result = []
        self._in_order(self.root, result)
        return result
    
    def _in_order(self, node, result):
        if node:
            self._in_order(node.left, result)
            result.append({
                "key": node.key,
                "height": node.height,
                "balance_factor": self.get_balance_factor(node)
            })
            self._in_order(node.right, result)

# Example usage
avl = AVLTree()
avl.insert(30)
avl.insert(20)
avl.insert(40)
avl.insert(10)
avl.insert(25)
print(avl.in_order())`,

  java: `class Node {
    int key;
    int height;
    Node left;
    Node right;
    
    Node(int key) {
        this.key = key;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

public class AVLTree {
    private Node root;
    
    // Helper function to get height of a node
    private int height(Node node) {
        return node == null ? 0 : node.height;
    }
    
    // Get balance factor of a node
    private int getBalanceFactor(Node node) {
        return node == null ? 0 : height(node.left) - height(node.right);
    }
    
    // Right rotation
    private Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        
        // Perform rotation
        x.right = y;
        y.left = T2;
        
        // Update heights
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        
        // Return new root
        return x;
    }
    
    // Left rotation
    private Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        
        // Perform rotation
        y.left = x;
        x.right = T2;
        
        // Update heights
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        
        // Return new root
        return y;
    }
    
    // Insert a node
    public void insert(int key) {
        root = insert(root, key);
    }
    
    private Node insert(Node node, int key) {
        // Standard BST insert
        if (node == null) {
            return new Node(key);
        }
        
        if (key < node.key) {
            node.left = insert(node.left, key);
        } else if (key > node.key) {
            node.right = insert(node.right, key);
        } else {
            // Duplicate keys are not allowed
            return node;
        }
        
        // Update height of current node
        node.height = Math.max(height(node.left), height(node.right)) + 1;
        
        // Get the balance factor
        int balance = getBalanceFactor(node);
        
        // Left-Left Case
        if (balance > 1 && key < node.left.key) {
            return rightRotate(node);
        }
        
        // Right-Right Case
        if (balance < -1 && key > node.right.key) {
            return leftRotate(node);
        }
        
        // Left-Right Case
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        
        // Right-Left Case
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        
        // Return the unchanged node
        return node;
    }
    
    // Print the tree in-order
    public void printInOrder() {
        inOrder(root);
    }
    
    private void inOrder(Node node) {
        if (node != null) {
            inOrder(node.left);
            System.out.println("Key: " + node.key + ", Height: " + node.height + 
                              ", Balance Factor: " + getBalanceFactor(node));
            inOrder(node.right);
        }
    }
    
    public static void main(String[] args) {
        AVLTree tree = new AVLTree();
        tree.insert(30);
        tree.insert(20);
        tree.insert(40);
        tree.insert(10);
        tree.insert(25);
        tree.printInOrder();
    }
}`,

  cpp: `#include <iostream>
#include <algorithm>
#include <vector>

class Node {
public:
    int key;
    int height;
    Node* left;
    Node* right;
    
    Node(int k) : key(k), height(1), left(nullptr), right(nullptr) {}
};

class AVLTree {
private:
    Node* root;
    
    // Helper function to get height of a node
    int height(Node* node) {
        return node ? node->height : 0;
    }
    
    // Get balance factor of a node
    int getBalanceFactor(Node* node) {
        return node ? height(node->left) - height(node->right) : 0;
    }
    
    // Right rotation
    Node* rightRotate(Node* y) {
        Node* x = y->left;
        Node* T2 = x->right;
        
        // Perform rotation
        x->right = y;
        y->left = T2;
        
        // Update heights
        y->height = std::max(height(y->left), height(y->right)) + 1;
        x->height = std::max(height(x->left), height(x->right)) + 1;
        
        // Return new root
        return x;
    }
    
    // Left rotation
    Node* leftRotate(Node* x) {
        Node* y = x->right;
        Node* T2 = y->left;
        
        // Perform rotation
        y->left = x;
        x->right = T2;
        
        // Update heights
        x->height = std::max(height(x->left), height(x->right)) + 1;
        y->height = std::max(height(y->left), height(y->right)) + 1;
        
        // Return new root
        return y;
    }
    
    // Insert a node
    Node* insert(Node* node, int key) {
        // Standard BST insert
        if (node == nullptr) {
            return new Node(key);
        }
        
        if (key < node->key) {
            node->left = insert(node->left, key);
        } else if (key > node->key) {
            node->right = insert(node->right, key);
        } else {
            // Duplicate keys are not allowed
            return node;
        }
        
        // Update height of current node
        node->height = std::max(height(node->left), height(node->right)) + 1;
        
        // Get the balance factor
        int balance = getBalanceFactor(node);
        
        // Left-Left Case
        if (balance > 1 && key < node->left->key) {
            return rightRotate(node);
        }
        
        // Right-Right Case
        if (balance < -1 && key > node->right->key) {
            return leftRotate(node);
        }
        
        // Left-Right Case
        if (balance > 1 && key > node->left->key) {
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }
        
        // Right-Left Case
        if (balance < -1 && key < node->right->key) {
            node->right = rightRotate(node->right);
            return leftRotate(node);
        }
        
        // Return the unchanged node
        return node;
    }
    
    // Print the tree in-order
    void inOrder(Node* node) {
        if (node != nullptr) {
            inOrder(node->left);
            std::cout << "Key: " << node->key << ", Height: " << node->height
                     << ", Balance Factor: " << getBalanceFactor(node) << std::endl;
            inOrder(node->right);
        }
    }
    
    // Delete the tree (cleanup)
    void deleteTree(Node* node) {
        if (node != nullptr) {
            deleteTree(node->left);
            deleteTree(node->right);
            delete node;
        }
    }
    
public:
    AVLTree() : root(nullptr) {}
    
    ~AVLTree() {
        deleteTree(root);
    }
    
    void insert(int key) {
        root = insert(root, key);
    }
    
    void printInOrder() {
        inOrder(root);
    }
};

int main() {
    AVLTree tree;
    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(10);
    tree.insert(25);
    
    std::cout << "In-order traversal of the AVL tree:" << std::endl;
    tree.printInOrder();
    
    return 0;
}`
};

export default AVLTreeCode;