// Constructor for SplayTree
function SplayTree() {
//  jAlert("SplayTree called");
    BST.call(this);
}

SplayTree.prototype = new BST(); // Inheritance
SplayTree.prototype.constructor = SplayTree;

// Insert a new element e
SplayTree.prototype.insert = function(e) {
    var successful = BST.prototype.insert.call(this, e);
//  jAlert("After insert, SplayTree size is " + this.size);
    if (!successful)
        return false; // e is already in the tree
    else {
        this.splay(e);
    }

    return true; // e is inserted
}

/** Balance the nodes in the path from the specified
 * node to the this.root if necessary
 */
SplayTree.prototype.splay = function(e) {
    var path = this.path(e);
    var u = path[path.length - 1];

    for (var i = path.length - 2; i >= 0; i = i - 2) {
        if (u == this.root) {
            jAlert("out");
            return; // Done
        }

        var v = path[i];
        if (v == this.root) { // zig
            this.root = u;
            if (v.left == u) { // Left zig
                v.left = u.right;
                u.right = v;
            }
            else { // Right zig
                v.right = u.left;
                u.left = v;
            }

            return; // Done
        }

        var w = path[i - 1];
        if (this.root == w)
            this.root = u;
        else
        if (path[i - 2].left == w)
            path[i - 2].left = u;
        else
            path[i - 2].right = u;

        if (w.left == v && v.left == u) { // Left zig-zig
            v.left = u.right;
            w.left = v.right;
            v.right = w;
            u.right = v;
        }
        else if (w.right == v && v.right == u) { // Right zig-zig
            w.right = v.left;
            v.left = w;
            v.right = u.left;
            u.left = v;
        }
        else if (w.left == v && v.right == u) { // Left zig-zag
            v.right = u.left;
            w.left = u.right;
            u.right = w;
            u.left = v;
        }
        else if (w.right == v && v.left == u) { // Right zig-zag
            w.right = u.left;
            v.left = u.right;
            u.right = v;
            u.left = w;
        }
    }
}

/** Returns true if the element is in the tree */
SplayTree.prototype.search = function(e) {
    var parent = null; // Parent node for current
    var current = this.root; // Start from the this.root

    while (current != null) {
        if (e < current.element) {
            parent = current;
            current = current.left;
        }
        else if (e > current.element) {
            parent = current;
            current = current.right;
        }
        else { // element matches current.element
            this.splay(current.element);
            return true; // Element is found
        }
    }

    if (parent != null)
        this.splay(parent.element);
    return false;
}

/** Delete an element from the binary tree.
 * Return true if the element is deleted successfully
 * Return false if the element is not in the tree */
SplayTree.prototype.delete = function(element) {
    if (this.root == null)
        return false; // Element is not in the tree

    // Locate the node to be deleted and also locate its parent node
    var parent = null;
    var current = this.root;
    while (current != null) {
        if (element < current.element) {
            parent = current;
            current = current.left;
        }
        else if (element > current.element) {
            parent = current;
            current = current.right;
        }
        else
            break; // Element is in the tree pointed by current
    }

    if (current == null) {
        if (parent != null)
            this.splay(parent.element);
        return false; // Element is not in the tree
    }

    // Case 1: current has no left children (See Figure 23.6)
    if (current.left == null) {
        // Connect the parent with the right child of the current node
        if (parent == null) {
            this.root = current.right;
        }
        else {
            if (element < parent.element)
                parent.left = current.right;
            else
                parent.right = current.right;

            // Balance the tree if necessary
            this.splay(parent.element);
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
            // Special case: parentOfRightMost is current
            parentOfRightMost.left = rightMost.left;

        // Balance the tree if necessary
        this.splay(parentOfRightMost.element);
    }

    this.size--;
    if (parent != null)
        this.splay(parent.element);
    return true; // Element inserted
}