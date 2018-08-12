// Constructor for BST
function BST() {
    this.root = null;
    this.size = 0;
}

// Returns true if the element is in the tree
BST.prototype.search = function(e) {
    var current = this.root; // Start from the root

    while (current != null) {
        if (e < current.element) {
            current = current.left;
        }
        else if (e > current.element) {
            current = current.right;
        }
        else // element matches current.element
            return true; // Element is found
    }

    return false;
}

// Constructor for Node
function TreeNode(e) {
    this.element = e;
    this.left = null;
    this.right = null;
}

// Insert a new element e
BST.prototype.insert = function(e) {
    if (this.root == null)
        this.root = this.createNewNode(e); // Create a new root
    else {
        // Locate the parent node
        var parent = null;
        var current = this.root;
        while (current != null)
            if (e < current.element) {
                parent = current;
                current = current.left;
            }
            else if (e > current.element) {
                parent = current;
                current = current.right;
            }
            else
                return false; // Duplicate node not inserted

        // Create the new node and attach it to the parent node
        if (e < parent.element) {
            parent.left = this.createNewNode(e);
        }
        else {
            parent.right = this.createNewNode(e);
        }
    }

    this.size++;
    return true; // Element inserted
}

BST.prototype.createNewNode = function(e) {
    return new TreeNode(e);
}

/** Delete an element from the binary tree.
 * Return true if the element is deleted successfully
 * Return false if the element is not in the tree
 */
BST.prototype.remove = function(e) {
    // Locate the node to be deleted and also locate its parent node
    var parent = null;
    var current = this.root;
    while (current != null) {
        if (e < current.element) {
            parent = current;
            current = current.left;
        }
        else if (e > current.element) {
            parent = current;
            current = current.right;
        }
        else
            break; // Element is in the tree pointed at by current
    }

    if (current == null)
        return false; // Element is not in the tree

    // Case 1: current has no left children
    if (current.left == null) {
        // Connect the parent with the right child of the current node
        if (parent == null) {
            root = current.right;
        }
        else {
            if (e < parent.element)
                parent.left = current.right;
            else
                parent.right = current.right;
        }
    }
    else {
        // Case 2: The current node has a left child
        // Locate the rightmost node in the left subtree of
        // the current node and also its parent
        var parentOfRightMost = current;
        var rightMost = current.left;

        while (rightMost.right != null) {
            parentOfRightMost = rightMost;
            rightMost = rightMost.right; // Keep going to the right
        }

        // Replace the element in current by the element in rightMost
        current.element = rightMost.element;

        // Eliminate rightmost node
        if (parentOfRightMost.right == rightMost)
            parentOfRightMost.right = rightMost.left;
        else
            // Special case: parentOfRightMost == current
            parentOfRightMost.left = rightMost.left;
    }

    this.size--;
    return true; // Element inserted
}

// Return true if the tree is empty 
BST.prototype.isEmpty = function() {
    return this.root == null;
}

// Return the size of the tree 
BST.prototype.getSize = function() {
    return this.size;
}

// Returns a path from the root leading to the specified element 
BST.prototype.path = function(e) {
    list = [];
    var current = this.root; // Start from the root

    while (current != null) {
        list.push(current); // Add the node to the list
        if (e < current.element) {
            current = current.left;
        }
        else if (e > current.element) {
            current = current.right;
        }
        else
            break;
    }

    return list; // Return an array of nodes
}

BST.prototype.getRoot = function() {
    return this.root;
}

BST.prototype.getInorder = function(root) {
    if (root != null)
        return this.getInorder(root.left) + " " + root.element + " " +
                this.getInorder(root.right);
    else
        return "";
}

BST.prototype.getPreorder = function(root) {
    if (root != null) {       
        return root.element + " " + this.getPreorder(root.left) 
                + " " + this.getPreorder(root.right);
    }
    else
        return "";
}

BST.prototype.getPostorder = function(root) {
    if (root != null)
        return this.getPostorder(root.left) + " " +
                this.getPostorder(root.right) + " " + root.element;
    else
        return "";
}