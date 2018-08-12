// Constructor for RBTree
function RBTree() {
//  jAlert("RBTree called");
    BST.call(this);
}

RBTree.prototype = new BST(); // Inheritance
RBTree.prototype.constructor = RBTree;

RBTreeNode.prototype = new TreeNode(); // Inheritance
RBTreeNode.prototype.constructor = RBTreeNode;

// Constructor for Node
function RBTreeNode(e) {
    this.red = true; // Indicate node color
    this.blackHeight = 0;
    TreeNode.call(this, e);
}

RBTreeNode.prototype = {
    isRed: function() {
        return this.red;
    },
    
    isBlack: function() {
        return !this.red;
    },
    
    setBlack: function() {
        this.red = false;
    },
    
    setRed: function() {
        this.red = true;
    }
}

// Override the createNewNode method 
RBTree.prototype.createNewNode = function(e) {
//  jAlert("RBTree createNewNode");
    return new RBTreeNode(e);
}

// Insert a new element e
RBTree.prototype.insert = function(e) {
    var successful = BST.prototype.insert.call(this, e);
//  jAlert("After insert, RBTree size is " + this.size);
    if (!successful)
        return false; // e is already in the tree
    else {
        this.ensureRBTree(e);
    }

    return true; // e is inserted
}

/** Ensure that the tree is a red-black tree */
RBTree.prototype.ensureRBTree = function(e) {
    // Get the path that leads to element e from the this.root 
    var path = this.path(e);

    var i = path.length - 1; // Index to the current node in the path

    // u is the last node in the path. u contains element e
    var u = path[i];

    // v is the parent of of u, if exists
    var v = (u == this.root) ? null : path[i - 1];

    u.setRed(); // It is OK to set u red    

    if (u == this.root) // If e is inserted as the this.root, set this.root black
        u.setBlack();
    else if (v.isRed())
        this.fixDoubleRed(u, v, path, i); // Fix double red violation at u
}

/** Fix double red violation at node u */
RBTree.prototype.fixDoubleRed = function(u, v, path, i) {
    // w is the grandparent of u
    var w = path[i - 2];
    parentOfw = (w == this.root) ? null : path[i - 3];

    // Get v's sibling named x
    x = (w.left == v) ? w.right : w.left;

    if (x == null || x.isBlack()) {
        // Case 1: v's sibling x is black
        if (w.left == v && v.left == u) {
            // Case 1.1: u < v < w, Restructure and recolor nodes
            this.restructureRecolor(u, v, w, w, parentOfw);

            w.left = v.right; // v.right is y3 in Figure 11.7
            v.right = w;
        }
        else if (w.left == v && v.right == u) {
            // Case 1.2: v < u < w, Restructure and recolor nodes
            this.restructureRecolor(v, u, w, w, parentOfw);
            v.right = u.left;
            w.left = u.right;
            u.left = v;
            u.right = w;
        }
        else if (w.right == v && v.right == u) {
            // Case 1.3: w < v < u, Restructure and recolor nodes
            this.restructureRecolor(w, v, u, w, parentOfw);
            w.right = v.left;
            v.left = w;
        }
        else {
            // Case 1.4: w < u < v, Restructure and recolor nodes
            this.restructureRecolor(w, u, v, w, parentOfw);
            w.right = u.left;
            v.left = u.right;
            u.left = w;
            u.right = v;
        }
    }
    else { // Case 2: v's sibling x is red 
        // Recolor nodes
        w.setRed();
        u.setRed();
        (w.left).setBlack();
        (w.right).setBlack();

        if (w == this.root) {
            w.setBlack();
        }
        else if (parentOfw.isRed()) {
            // Propagate along the path to fix new double red violation
            u = w;
            v = parentOfw;
            this.fixDoubleRed(u, v, path, i - 2); // i – 2 propagates upward
        }
    }
}

/** Connect b with parentOfw and recolor a, b, c for a < b < c */
RBTree.prototype.restructureRecolor = function(a, b, c, w, parentOfw) {
    if (parentOfw == null)
        this.root = b;
    else if (parentOfw.left == w)
        parentOfw.left = b;
    else
        parentOfw.right = b;

    b.setBlack(); // b becomes the this.root in the subtree
    a.setRed(); // a becomes the left child of b
    c.setRed(); // c becomes the right child of b
}

/** Delete the last node from the path. */
RBTree.prototype.deleteLastNodeInPath = function(path) {
    var i = path.length - 1; // Index to the node in the path
    // u is the last node in the path
    var u = path[i];
    var parentOfu = (u == this.root) ? null : path[i - 1];
    var grandparentOfu = (parentOfu == null ||
            parentOfu == this.root) ? null : path[i - 2];
    var childOfu = (u.left == null) ? u.right : u.left;

    // Delete node u. Connect childOfu with parentOfu
    this.connectNewParent(parentOfu, u, childOfu);

    // Recolor the nodes and fix double black if needed
    if (childOfu == this.root || u.isRed())
        return; // Done if childOfu is this.root or if u is red 
    else if (childOfu != null && childOfu.isRed())
        childOfu.setBlack(); // Set it black, done
    else // u is black, childOfu is null or black
        // Fix double black on parentOfu
        this.fixDoubleBlack(grandparentOfu, parentOfu, childOfu, path, i);
}

/** Fix the double black problem at node parent */
RBTree.prototype.fixDoubleBlack = function(grandparent, parent, db, path, i) {
    // Obtain y, y1, and y2
    var y = (parent.right == db) ? parent.left : parent.right;
    var y1 = y.left;
    var y2 = y.right;

    if (y.isBlack() && y1 != null && y1.isRed()) {
        if (parent.right == db) {
            // Case 1.1: y is a left black sibling and y1 is red
            this.connectNewParent(grandparent, parent, y);
            this.recolor(parent, y, y1); // Adjust colors

            // Adjust child links
            parent.left = y.right;
            y.right = parent;
        }
        else {
            // Case 1.3: y is a right black sibling and y1 is red        
            this.connectNewParent(grandparent, parent, y1);
            this.recolor(parent, y1, y); // Adjust colors

            // Adjust child links
            parent.right = y1.left;
            y.left = y1.right;
            y1.left = parent;
            y1.right = y;
        }
    }
    else if (y.isBlack() && y2 != null && y2.isRed()) {
        if (parent.right == db) {
            // Case 1.2: y is a left black sibling and y2 is red
            this.connectNewParent(grandparent, parent, y2);
            this.recolor(parent, y2, y); // Adjust colors

            // Adjust child links
            y.right = y2.left;
            parent.left = y2.right;
            y2.left = y;
            y2.right = parent;
        }
        else {
            // Case 1.4: y is a right black sibling and y2 is red        
            this.connectNewParent(grandparent, parent, y);
            this.recolor(parent, y, y2); // Adjust colors

            // Adjust child links
            y.left = parent;
            parent.right = y1;
        }
    }
    else if (y.isBlack()) {
        // Case 2: y is black and y's children are black or null
        y.setRed(); // Change y to red
        if (parent.isRed())
            parent.setBlack(); // Done
        else if (parent != this.root) {
            // Propagate double black to the parent node
            // Fix new appearance of double black recursively
            db = parent;
            parent = grandparent;
            grandparent = (i >= 3) ? path[i - 3] : null;
            this.fixDoubleBlack(grandparent, parent, db, path, i - 1);
        }
    }
    else { // y.isRed()
        if (parent.right == db) {
            // Case 3.1: y is a left red child of parent
            parent.left = y2;
            y.right = parent;
        }
        else {
            // Case 3.2: y is a right red child of parent
            parent.right = y.left;
            y.left = parent;
        }

        parent.setRed(); // Color parent red
        y.setBlack(); // Color y black
        this.connectNewParent(grandparent, parent, y); // y is new parent
        this.fixDoubleBlack(y, parent, db, path, i - 1);
    }
}

/** Recolor parent, newParent, and c. Case 1 removal */
RBTree.prototype.recolor = function(parent, newParent, c) {
    // Retain the parent's color for newParent
    if (parent.isRed())
        newParent.setRed();
    else
        newParent.setBlack();

    // c and parent become the children of newParent, set them black
    parent.setBlack();
    c.setBlack();
}

/** Connect newParent with grandParent */
RBTree.prototype.connectNewParent = function(grandparent, parent, newParent) {
    if (parent == this.root) {
        this.root = newParent;
        if (this.root != null)
            newParent.setBlack();
    }
    else if (grandparent.left == parent)
        grandparent.left = newParent;
    else
        grandparent.right = newParent;
}

RBTree.prototype.delete = function(e) {
    // Locate the node to be deleted
    var current = this.root;
    while (current != null) {
        if (e < current.element) {
            current = current.left;
        }
        else if (e > current.element) {
            current = current.right;
        }
        else
            break; // Element is in the tree pointed by current
    }

    if (current == null)
        return false; // Element is not in the tree

    var path;

    // current node is an internal node 
    if (current.left != null && current.right != null) {
        // Locate the rightmost node in the left subtree of current
        var rightMost = current.left;
        while (rightMost.right != null) {
            rightMost = rightMost.right; // Keep going to the right
        }

        path = this.path(rightMost.element); // Get path before replacement

        // Replace the element in current by the element in rightMost
        current.element = rightMost.element;
    }
    else
        path = this.path(e); // Get path to current node

    // Delete the last node in the path and propagate if needed
    this.deleteLastNodeInPath(path);

    this.size--; // After one element deleted
    return true; // Element deleted
}