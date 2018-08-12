// Constructor for Tree24
function Tree24() {
    this.root = null;
    this.size = 0;
}

// Returns true if the element is in the tree
Tree24.prototype.search = function(e) {
    var current = root; // Start from the root

    while (current != null) {
        if (this.matched(e, current)) { // Element is in the node
            return true; // Element found
        }
        else {
            current = this.getChildNode(e, current); // Search in a subtree
        }
    }

    return false; // Element is not in the tree
}

/** Return true if the element is found in this node */
Tree24.prototype.matched = function(e, node) {
    for (var i = 0; i < node.elements.length; i++)
        if (node.elements[i] == e)
            return true; // Element found

    return false; // No match in this node
}

/** Locate a child node to search element e */
Tree24.prototype.getChildNote = function(e, node) {
    if (node.child.length == 0)
        return null; // node is a leaf

    var i = locate(e, node); // Locate the insertion point for e
    return node.child[i]; // Return the child node
}

/** Insert element e into the tree
 *  Return true if the element is inserted successfully
 */
Tree24.prototype.insert = function(e) {
    if (root == null)
        this.root = new Tree24Node(e); // Create a new root for element
    else {
        // Locate the leaf node for inserting e
        var leafNode = null;
        var current = root;
        while (current != null)
            if (this.matched(e, current)) {
                return false; // Duplicate element found, nothing inserted
            }
            else {
                leafNode = current;
                current = getChildNode(e, current);
            }

        // Insert the element e into the leaf node
        this.insert1(e, null, leafNode); // The right child of e is null
    }

    size++; // Increase size
    return true; // Element inserted
}

/** Insert element e into node u */
Tree24.prototype.insert1 = function(e, rightChildOfe, u) {
    // Get the search path that leads to element e
    var path = path(e);
    for (var i = path.length - 1; i >= 0; i--) {
        if (u.elements.length < 3) { // u is a 2-node or 3-node
            this.insert23(e, rightChildOfe, u); // Insert e to node u
            break; // No further insertion to u's parent needed
        }
        else {
            var v = new Tree24Node(); // Create a new node
            var median = split(e, rightChildOfe, u, v); // Split u

            if (u == this.root) {
                this.root = new Tree24Node(median); // New root
                root.child.push(u); // u is the left child of median
                root.child.push(v); // v is the right child of median
                break; // No further insertion to u's parent needed
            }
            else {
                // Use new values for the next iteration in the for loop
                e = median; // Element to be inserted to parent
                rightChildOfe = v; // Right child of the element
                u = path[i - 1]; // New node to insert element
            }
        }
    }
}

/** Insert element to a 2- or 3- and return the insertion point */
Tree24.prototype.insert23 = function(e, rightChildOfe, node) {
    var i = this.locate(e, node); // Locate where to insert
    node.elements.push(i, e); // Insert the element into the node
    if (rightChildOfe != null)
        node.child.insert(i + 1, rightChildOfe); // Insert the child link
}

/** Split a 4-node u into u and v and insert e to u or v */
Tree24.prototype.insert23 = function(e, rightChildOfe, u, v) {
    // Move the last element in node u to node v
    v.elements.push(u.elements.splice(2, 1));
    var median = u.elements.remove(1);
    // Split children for a non-leaf node
    // Move the last two children in node u to node v
    if (u.child.length > 0) {
        v.child.add(u.child.splice(2, 1));
        v.child.add(u.child.splice(2, 1));
    }

    // Insert e into a 2- or 3- node u or v.
    if (e < median)
        this.insert23(e, rightChildOfe, u);
    else
        this.insert23(e, rightChildOfe, v);
    return median; // Return the median element
}

/** Return a search path that leads to element e */
Tree24.prototype.path = function(e) {
    var list = new Array();
    var current = root; // Start from the root

    while (current != null) {
        list.push(current); // Add the node to the list
        if (this.matched(e, current)) {
            break; // Element found
        }
        else {
            current = this.getChildNode(e, current);
        }
    }

    return list; // Return an array of nodes
}

/** Delete the specified element from the tree */
Tree24.prototype.delete = function(e) {
// Locate the node that contains the element e
    var node = this.root;
    while (node != null)
        if (this.matched(e, node)) {
            this.delete1(e, node); // Delete element e from node
            size--; // After one element deleted
            return true; // Element deleted successfully
        }
        else {
            node = this.getChildNode(e, node);
        }

    return false; // Element not in the tree
}

/** Delete the specified element from the node */
Tree24.prototype.delete1 = function(e, node) {
    if (node.child.length == 0) { // e is in a leaf node
// Get the path that leads to e from the root
        var path = this.path(e);
        var index = node.elements.indexOf(e);
        node.elements.splice(index, 1); // Remove element e

        if (node == this.root) { // Special case
            if (node.elements.length == 0)
                this.root = null; // Empty tree
            return; // Done
        }

        this.validate(e, node, path); // Check underflow node
    }
    else { // e is in an internal node
// Locate the rightmost node in the left subtree of the node 
        var index = this.locate(e, node); // Index of e in node
        var current = node.child[index];
        while (current.child.length > 0) {
            current = current.child[current.child.length - 1];
        }
        var rightmostElement =
                current.elements[current.elements.length - 1];
        // Get the path that leads to e from the root
        var path = path(rightmostElement);
        // Replace the deleted element with the rightmost element
        node.elements[index] = current.elements.splice(current.elements.length - 1, 1);
        validate(rightmostElement, current, path); // Check underflow
    }
}

/** Perform transfer and confusion operations if necessary */
Tree24.prototype.validate = function(e, u, path) {
    for (var i = path.length - 1; u.elements.length == 0; i--) {
        var parentOfu = path[i - 1]; // Get parent of u
        var k = this.locate(e, parentOfu); // Index of e in the parent node

        // Check two siblings
        if (k > 0 && parentOfu.child[k - 1].elements.length > 1) {
            leftSiblingTransfer(k, u, parentOfu);
        }
        else if (k + 1 < parentOfu.child.length &&
                parentOfu.child[k + 1].elements.length > 1) {
            rightSiblingTransfer(k, u, parentOfu);
        }
        else if (k - 1 >= 0) { // Fusion with a left sibling
            // Get left sibling of node u 
            var leftNode = parentOfu.child[k - 1];
            // Perform a fusion with left sibling on node u
            leftSiblingFusion(k, leftNode, u, parentOfu);
            // Done when root becomes empty
            if (parentOfu == root && parentOfu.elements.length == 0) {
                root = leftNode;
                break;
            }

            u = parentOfu; // Back to the loop to check the parent node
        }
        else { // Fusion with right sibling (right sibling must exist)
            // Get left sibling of node u 
            var rightNode = parentOfu.child[k + 1];
            // Perform a fusion with right sibling on node u
            this.rightSiblingFusion(k, rightNode, u, parentOfu);
            // Done when root becomes empty
            if (parentOfu == this.root && parentOfu.elements.length == 0) {
                root = rightNode;
                break;
            }

            u = parentOfu; // Back to the loop to check the parent node
        }
    }
}

/** Locate the insertion point of the element in the node */
Tree24.prototype.locate = function(o, node) {
    for (var i = 0; i < node.elements.length; i++) {
        if (o <= node.elements[i]) {
            return i;
        }
    }

    return node.elements.length;
}

/** Perform a transfer with a left sibling */
Tree24.prototype.leftSiblingTransfer = function(k, u, parentOfu) {
// Move an element from the parent to u
    u.elements.insert(0, parentOfu.elements[k - 1]);
    // Move an element from the left node to the parent
    var leftNode = parentOfu.child[k - 1];
    parentOfu.elements[k - 1] =
            leftNode.elements.splice(leftNode.elements.length - 1, 1);
    // Move the child link from left sibling to the node
    if (leftNode.child.length > 0)
        u.child.insert(0, leftNode.child.splice(
                leftNode.child.length - 1, 1));
}

/** Perform a transfer with a right sibling */
Tree24.prototype.leftSiblingTransfer = function(k, u, parentOfu) {
// Transfer an element from the parent to u
    u.elements.push(parentOfu.elements[k]);
    // Transfer an element from the right node to the parent
    var rightNode = parentOfu.child[k + 1];
    parentOfu.elements[k] = rightNode.elements.splice(0, 1);
    // Move the child link from right sibling to the node
    if (rightNode.child.length > 0)
        u.child.push(rightNode.child.splice(0, 1));
}

/** Perform a fusion with a left sibling */
Tree24.prototype.leftSiblingFusion = function(k, leftNode, u, parentOfu) {
// Transfer an element from the parent to the left sibling    
    leftNode.elements.push(parentOfu.elements.splice(k - 1, 1));
    // Remove the link to the empty node
    parentOfu.child.splice(k, 1);
    // Adjust child links for non-leaf node
    if (u.child.length > 0)
        leftNode.child.push(u.child.splice(0, 1));
}

/** Perform a fusion with a right sibling */
Tree24.prototype.rightSiblingFusion = function(k, rightNode, u, parentOfu) {
// Transfer an element from the parent to the right sibling
    rightNode.elements.insert(0, parentOfu.elements.splice(k, 1));
    // Remove the link to the empty node
    parentOfu.child.splice(k, 1);
    // Adjust child links for non-leaf node
    if (u.child.length > 0)
        rightNode.child.add(0, u.child.splice(0, 1));
}

// Return the size of the tree 
Tree24.prototype.getSize = function() {
    return this.size;
}

// Constructor for Node
function Tree24Node(e) {
    if (typeof (e) === 'undefined') {
        this.element = [];
    }
    else {
        this.element = [e];
    }
    this.child = [];
}