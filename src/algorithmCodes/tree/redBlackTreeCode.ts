const RedBlackTreeCode = {
  javascript: `class Node {
  constructor(key, color = 'RED') {
    this.key = key;
    this.color = color;  // 'RED' or 'BLACK'
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class RedBlackTree {
  constructor() {
    this.root = null;
    this.NIL = new Node(null, 'BLACK'); // Sentinel node
  }
  
  // Insert a new key
  insert(key) {
    // Create a new node
    const newNode = new Node(key);
    newNode.left = this.NIL;
    newNode.right = this.NIL;
    
    // Perform standard BST insert
    let y = null;
    let x = this.root;
    
    while (x !== null && x !== this.NIL) {
      y = x;
      if (newNode.key < x.key) {
        x = x.left;
      } else {
        x = x.right;
      }
    }
    
    newNode.parent = y;
    
    if (y === null) {
      // Tree was empty
      this.root = newNode;
    } else if (newNode.key < y.key) {
      y.left = newNode;
    } else {
      y.right = newNode;
    }
    
    // Fix Red-Black Tree properties
    this.fixInsert(newNode);
  }
  
  // Fix Red-Black Tree violations after insertion
  fixInsert(node) {
    let uncle;
    
    // Continue until we reach the root or find a black parent
    while (node.parent !== null && node.parent.color === 'RED') {
      // Parent is a left child of grandparent
      if (node.parent === node.parent.parent.left) {
        uncle = node.parent.parent.right;
        
        // Case 1: Uncle is red
        if (uncle.color === 'RED') {
          node.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          node.parent.parent.color = 'RED';
          node = node.parent.parent;
        } else {
          // Case 2: Node is a right child
          if (node === node.parent.right) {
            node = node.parent;
            this.leftRotate(node);
          }
          
          // Case 3: Node is a left child
          node.parent.color = 'BLACK';
          node.parent.parent.color = 'RED';
          this.rightRotate(node.parent.parent);
        }
      } 
      // Parent is a right child of grandparent
      else {
        uncle = node.parent.parent.left;
        
        // Case 1: Uncle is red
        if (uncle.color === 'RED') {
          node.parent.color = 'BLACK';
          uncle.color = 'BLACK';
          node.parent.parent.color = 'RED';
          node = node.parent.parent;
        } else {
          // Case 2: Node is a left child
          if (node === node.parent.left) {
            node = node.parent;
            this.rightRotate(node);
          }
          
          // Case 3: Node is a right child
          node.parent.color = 'BLACK';
          node.parent.parent.color = 'RED';
          this.leftRotate(node.parent.parent);
        }
      }
    }
    
    // Ensure root is black
    this.root.color = 'BLACK';
  }
  
  // Left rotation
  leftRotate(x) {
    const y = x.right;
    
    // Turn y's left subtree into x's right subtree
    x.right = y.left;
    if (y.left !== this.NIL) {
      y.left.parent = x;
    }
    
    // Link y's parent to x's parent
    y.parent = x.parent;
    
    if (x.parent === null) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    
    // Put x on y's left
    y.left = x;
    x.parent = y;
  }
  
  // Right rotation
  rightRotate(y) {
    const x = y.left;
    
    // Turn x's right subtree into y's left subtree
    y.left = x.right;
    if (x.right !== this.NIL) {
      x.right.parent = y;
    }
    
    // Link x's parent to y's parent
    x.parent = y.parent;
    
    if (y.parent === null) {
      this.root = x;
    } else if (y === y.parent.left) {
      y.parent.left = x;
    } else {
      y.parent.right = x;
    }
    
    // Put y on x's right
    x.right = y;
    y.parent = x;
  }
  
  // Inorder traversal
  inorderTraversal(node = this.root) {
    const result = [];
    
    const traverse = (node) => {
      if (node !== null && node !== this.NIL) {
        traverse(node.left);
        result.push({key: node.key, color: node.color});
        traverse(node.right);
      }
    };
    
    traverse(node);
    return result;
  }
  
  // Print the tree
  print() {
    return this.inorderTraversal();
  }
}

// Example usage
const tree = new RedBlackTree();
tree.insert(30);
tree.insert(20);
tree.insert(40);
tree.insert(10);
tree.insert(25);
console.log(tree.print());`,

  python: `class Node:
    def __init__(self, key, color="RED"):
        self.key = key
        self.color = color  # "RED" or "BLACK"
        self.left = None
        self.right = None
        self.parent = None

class RedBlackTree:
    def __init__(self):
        self.NIL = Node(None, "BLACK")  # sentinel node
        self.root = self.NIL
    
    def insert(self, key):
        # Create new node
        new_node = Node(key)
        new_node.left = self.NIL
        new_node.right = self.NIL
        
        # Perform standard BST insert
        y = None
        x = self.root
        
        while x != self.NIL:
            y = x
            if new_node.key < x.key:
                x = x.left
            else:
                x = x.right
                
        new_node.parent = y
        
        if y is None:
            # Tree was empty
            self.root = new_node
        elif new_node.key < y.key:
            y.left = new_node
        else:
            y.right = new_node
            
        # Fix Red-Black Tree properties
        self.fix_insert(new_node)
    
    def fix_insert(self, node):
        # Continue until we reach the root or find a black parent
        while node.parent and node.parent.color == "RED":
            # Parent is a left child of grandparent
            if node.parent == node.parent.parent.left:
                uncle = node.parent.parent.right
                
                # Case 1: Uncle is red
                if uncle.color == "RED":
                    node.parent.color = "BLACK"
                    uncle.color = "BLACK"
                    node.parent.parent.color = "RED"
                    node = node.parent.parent
                else:
                    # Case 2: Node is a right child
                    if node == node.parent.right:
                        node = node.parent
                        self.left_rotate(node)
                    
                    # Case 3: Node is a left child
                    node.parent.color = "BLACK"
                    node.parent.parent.color = "RED"
                    self.right_rotate(node.parent.parent)
            # Parent is a right child of grandparent
            else:
                uncle = node.parent.parent.left
                
                # Case 1: Uncle is red
                if uncle.color == "RED":
                    node.parent.color = "BLACK"
                    uncle.color = "BLACK"
                    node.parent.parent.color = "RED"
                    node = node.parent.parent
                else:
                    # Case 2: Node is a left child
                    if node == node.parent.left:
                        node = node.parent
                        self.right_rotate(node)
                    
                    # Case 3: Node is a right child
                    node.parent.color = "BLACK"
                    node.parent.parent.color = "RED"
                    self.left_rotate(node.parent.parent)
                    
        # Ensure root is black
        self.root.color = "BLACK"
    
    def left_rotate(self, x):
        y = x.right
        
        # Turn y's left subtree into x's right subtree
        x.right = y.left
        if y.left != self.NIL:
            y.left.parent = x
            
        # Link y's parent to x's parent
        y.parent = x.parent
        
        if x.parent is None:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y
            
        # Put x on y's left
        y.left = x
        x.parent = y
    
    def right_rotate(self, y):
        x = y.left
        
        # Turn x's right subtree into y's left subtree
        y.left = x.right
        if x.right != self.NIL:
            x.right.parent = y
            
        # Link x's parent to y's parent
        x.parent = y.parent
        
        if y.parent is None:
            self.root = x
        elif y == y.parent.left:
            y.parent.left = x
        else:
            y.parent.right = x
            
        # Put y on x's right
        x.right = y
        y.parent = x
    
    def inorder_traversal(self, node=None):
        if node is None:
            node = self.root
            
        result = []
        
        def traverse(node):
            if node != self.NIL:
                traverse(node.left)
                result.append({"key": node.key, "color": node.color})
                traverse(node.right)
                
        traverse(node)
        return result
    
    def print_tree(self):
        return self.inorder_traversal()

# Example usage
tree = RedBlackTree()
tree.insert(30)
tree.insert(20)
tree.insert(40)
tree.insert(10)
tree.insert(25)
print(tree.print_tree())`,

  java: `import java.util.ArrayList;
import java.util.List;

class Node {
    int key;
    String color;
    Node left;
    Node right;
    Node parent;
    
    public Node(Integer key) {
        this(key, "RED");
    }
    
    public Node(Integer key, String color) {
        this.key = key;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

public class RedBlackTree {
    private Node root;
    private final Node NIL;
    
    public RedBlackTree() {
        NIL = new Node(null, "BLACK");
        root = NIL;
    }
    
    public void insert(int key) {
        // Create a new node
        Node newNode = new Node(key);
        newNode.left = NIL;
        newNode.right = NIL;
        
        // Perform standard BST insert
        Node y = null;
        Node x = root;
        
        while (x != NIL) {
            y = x;
            if (newNode.key < x.key) {
                x = x.left;
            } else {
                x = x.right;
            }
        }
        
        newNode.parent = y;
        
        if (y == null) {
            root = newNode;
        } else if (newNode.key < y.key) {
            y.left = newNode;
        } else {
            y.right = newNode;
        }
        
        // Fix Red-Black Tree properties
        fixInsert(newNode);
    }
    
    private void fixInsert(Node node) {
        Node uncle;
        
        // Continue until we reach the root or find a black parent
        while (node.parent != null && "RED".equals(node.parent.color)) {
            // Parent is a left child of grandparent
            if (node.parent == node.parent.parent.left) {
                uncle = node.parent.parent.right;
                
                // Case 1: Uncle is red
                if ("RED".equals(uncle.color)) {
                    node.parent.color = "BLACK";
                    uncle.color = "BLACK";
                    node.parent.parent.color = "RED";
                    node = node.parent.parent;
                } else {
                    // Case 2: Node is a right child
                    if (node == node.parent.right) {
                        node = node.parent;
                        leftRotate(node);
                    }
                    
                    // Case 3: Node is a left child
                    node.parent.color = "BLACK";
                    node.parent.parent.color = "RED";
                    rightRotate(node.parent.parent);
                }
            } 
            // Parent is a right child of grandparent
            else {
                uncle = node.parent.parent.left;
                
                // Case 1: Uncle is red
                if ("RED".equals(uncle.color)) {
                    node.parent.color = "BLACK";
                    uncle.color = "BLACK";
                    node.parent.parent.color = "RED";
                    node = node.parent.parent;
                } else {
                    // Case 2: Node is a left child
                    if (node == node.parent.left) {
                        node = node.parent;
                        rightRotate(node);
                    }
                    
                    // Case 3: Node is a right child
                    node.parent.color = "BLACK";
                    node.parent.parent.color = "RED";
                    leftRotate(node.parent.parent);
                }
            }
        }
        
        // Ensure root is black
        root.color = "BLACK";
    }
    
    private void leftRotate(Node x) {
        Node y = x.right;
        
        // Turn y's left subtree into x's right subtree
        x.right = y.left;
        if (y.left != NIL) {
            y.left.parent = x;
        }
        
        // Link y's parent to x's parent
        y.parent = x.parent;
        
        if (x.parent == null) {
            root = y;
        } else if (x == x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        
        // Put x on y's left
        y.left = x;
        x.parent = y;
    }
    
    private void rightRotate(Node y) {
        Node x = y.left;
        
        // Turn x's right subtree into y's left subtree
        y.left = x.right;
        if (x.right != NIL) {
            x.right.parent = y;
        }
        
        // Link x's parent to y's parent
        x.parent = y.parent;
        
        if (y.parent == null) {
            root = x;
        } else if (y == y.parent.left) {
            y.parent.left = x;
        } else {
            y.parent.right = x;
        }
        
        // Put y on x's right
        x.right = y;
        y.parent = x;
    }
    
    public List<Node> inorderTraversal() {
        return inorderTraversal(root);
    }
    
    private List<Node> inorderTraversal(Node node) {
        List<Node> result = new ArrayList<>();
        inorderHelper(node, result);
        return result;
    }
    
    private void inorderHelper(Node node, List<Node> result) {
        if (node != NIL) {
            inorderHelper(node.left, result);
            result.add(node);
            inorderHelper(node.right, result);
        }
    }
    
    public static void main(String[] args) {
        RedBlackTree tree = new RedBlackTree();
        tree.insert(30);
        tree.insert(20);
        tree.insert(40);
        tree.insert(10);
        tree.insert(25);
        
        List<Node> nodes = tree.inorderTraversal();
        for (Node node : nodes) {
            System.out.println("Key: " + node.key + ", Color: " + node.color);
        }
    }
}`,

  cpp: `#include <iostream>
#include <vector>
#include <string>

enum Color { RED, BLACK };

struct Node {
    int key;
    Color color;
    Node* left;
    Node* right;
    Node* parent;
    
    Node(int k, Color c = RED) : 
        key(k), color(c), left(nullptr), right(nullptr), parent(nullptr) {}
};

class RedBlackTree {
private:
    Node* root;
    Node* NIL; // Sentinel node
    
    void leftRotate(Node* x) {
        Node* y = x->right;
        
        // Turn y's left subtree into x's right subtree
        x->right = y->left;
        if (y->left != NIL) {
            y->left->parent = x;
        }
        
        // Link y's parent to x's parent
        y->parent = x->parent;
        
        if (x->parent == nullptr) {
            root = y;
        } else if (x == x->parent->left) {
            x->parent->left = y;
        } else {
            x->parent->right = y;
        }
        
        // Put x on y's left
        y->left = x;
        x->parent = y;
    }
    
    void rightRotate(Node* y) {
        Node* x = y->left;
        
        // Turn x's right subtree into y's left subtree
        y->left = x->right;
        if (x->right != NIL) {
            x->right->parent = y;
        }
        
        // Link x's parent to y's parent
        x->parent = y->parent;
        
        if (y->parent == nullptr) {
            root = x;
        } else if (y == y->parent->left) {
            y->parent->left = x;
        } else {
            y->parent->right = x;
        }
        
        // Put y on x's right
        x->right = y;
        y->parent = x;
    }
    
    void fixInsert(Node* node) {
        Node* uncle;
        
        // Continue until we reach the root or find a black parent
        while (node->parent != nullptr && node->parent->color == RED) {
            // Parent is a left child of grandparent
            if (node->parent == node->parent->parent->left) {
                uncle = node->parent->parent->right;
                
                // Case 1: Uncle is red
                if (uncle->color == RED) {
                    node->parent->color = BLACK;
                    uncle->color = BLACK;
                    node->parent->parent->color = RED;
                    node = node->parent->parent;
                } else {
                    // Case 2: Node is a right child
                    if (node == node->parent->right) {
                        node = node->parent;
                        leftRotate(node);
                    }
                    
                    // Case 3: Node is a left child
                    node->parent->color = BLACK;
                    node->parent->parent->color = RED;
                    rightRotate(node->parent->parent);
                }
            } 
            // Parent is a right child of grandparent
            else {
                uncle = node->parent->parent->left;
                
                // Case 1: Uncle is red
                if (uncle->color == RED) {
                    node->parent->color = BLACK;
                    uncle->color = BLACK;
                    node->parent->parent->color = RED;
                    node = node->parent->parent;
                } else {
                    // Case 2: Node is a left child
                    if (node == node->parent->left) {
                        node = node->parent;
                        rightRotate(node);
                    }
                    
                    // Case 3: Node is a right child
                    node->parent->color = BLACK;
                    node->parent->parent->color = RED;
                    leftRotate(node->parent->parent);
                }
            }
        }
        
        // Ensure root is black
        root->color = BLACK;
    }
    
    void inorderHelper(Node* node, std::vector<std::pair<int, std::string>>& result) const {
        if (node != NIL) {
            inorderHelper(node->left, result);
            result.push_back({node->key, node->color == RED ? "RED" : "BLACK"});
            inorderHelper(node->right, result);
        }
    }
    
    void destroyTree(Node* node) {
        if (node != NIL) {
            destroyTree(node->left);
            destroyTree(node->right);
            delete node;
        }
    }

public:
    RedBlackTree() {
        NIL = new Node(0, BLACK);
        root = NIL;
    }
    
    ~RedBlackTree() {
        destroyTree(root);
        delete NIL;
    }
    
    void insert(int key) {
        // Create a new node
        Node* newNode = new Node(key);
        newNode->left = NIL;
        newNode->right = NIL;
        
        // Perform standard BST insert
        Node* y = nullptr;
        Node* x = root;
        
        while (x != NIL) {
            y = x;
            if (key < x->key) {
                x = x->left;
            } else {
                x = x->right;
            }
        }
        
        newNode->parent = y;
        
        if (y == nullptr) {
            root = newNode;
        } else if (key < y->key) {
            y->left = newNode;
        } else {
            y->right = newNode;
        }
        
        // Fix Red-Black Tree properties
        fixInsert(newNode);
    }
    
    std::vector<std::pair<int, std::string>> inorderTraversal() const {
        std::vector<std::pair<int, std::string>> result;
        inorderHelper(root, result);
        return result;
    }
};

// Example usage
int main() {
    RedBlackTree tree;
    tree.insert(30);
    tree.insert(20);
    tree.insert(40);
    tree.insert(10);
    tree.insert(25);
    
    auto nodes = tree.inorderTraversal();
    for (const auto& node : nodes) {
        std::cout << "Key: " << node.first << ", Color: " << node.second << std::endl;
    }
    
    return 0;
}`
};

export default RedBlackTreeCode;