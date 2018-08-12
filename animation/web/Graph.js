// Constructor for Graph
function Graph() {
    this.vertices = []; // Store vertices
    this.neighbors = []; // Adjacency lists
}

/** Edge inner class inside the AbstractGraph class */
function Edge(u, v) {
    this.u = u; // Starting vertex of the edge
    this.v = v; // Ending vertex of the edge
}

Graph.prototype.getSize = function() {
    return this.vertices.length;
}

Graph.prototype.getVertices = function() {
    return this.vertices;
}

Graph.prototype.getVertex = function(index) {
    return this.vertices[index];
}

Graph.prototype.getIndex = function(v) {
    return this.vertices.indexOf(v);
}

Graph.prototype.getNeighbors = function(index) {
    result = [];
    for (var e in this.neighbors[index])
        result.push(e.v);

    return result;
}

Graph.prototype.getDegree = function(v) {
    return neighbors[v].length;
}

Graph.prototype.clear = function() {
    vertices.length = 0;
    neighbors.length = 0;
}

Graph.prototype.addVertex = function(vertex) {
    if (this.vertices.indexOf(vertex) < 0) {
        this.vertices.push(vertex);
        this.neighbors.push(new Array());
        return true;
    }
    else {
        return false;
    }
}

Graph.prototype.addEdge1 = function(e) {
    if (e.u < 0 || e.u > this.getSize() - 1)
        return false; // throw new IllegalArgumentException("No such index: " + e.u);

    if (e.v < 0 || e.v > this.getSize() - 1)
        return false; // throw new IllegalArgumentException("No such index: " + e.v);

    if (!this.isEdgeInGraph(e)) {
        this.neighbors[e.u].push(e);
        return true;
    }
    else {
        return false;
    }
}

Graph.prototype.isEdgeInGraph = function(e) {
    for (var i = 0; i < this.neighbors[e.u].length; i++) {
        if (this.neighbors[e.u][i].v == e.v)
            return true;
    }

    return false;
}

Graph.prototype.addEdge = function(u, v) {
    return this.addEdge1(new Edge(u, v));
}

Graph.prototype.dfs = function(v) {
    searchOrder = new Array();
    parent = new Array();
    for (var i = 0; i < this.vertices.length; i++)
        parent.push(-1);

    // Mark visited vertices
    isVisited = new Array();
    for (var i = 0; i < this.vertices.length; i++)
        isVisited.push(false);

    // Recursively search
    this.dfs1(v, parent, searchOrder, isVisited);

    // Return a search tree
    return new Tree(v, parent, searchOrder);
}

/** Recursive method for DFS search */
Graph.prototype.dfs1 = function(u, parent, searchOrder, isVisited) {
    // Store the visited vertex
    searchOrder.push(u);
    isVisited[u] = true; // Vertex v visited

    for (var i = 0; i < this.neighbors[u].length; i++) {
        e = this.neighbors[u][i];
        if (!isVisited[e.v]) {
            parent[e.v] = u; // The parent of vertex e.v is u
            this.dfs1(e.v, parent, searchOrder, isVisited); // Recursive search
        }
    }
}

function Tree(root, parent, searchOrder) {
    this.root = root; // The root of the tree
    this.parent = parent; // Store the parent of each vertex
    this.searchOrder = searchOrder; // Store the search order
}

Tree.prototype = {
    getRoot: function() {
        return this.root;
    },
    /** Return the parent of vertex v */
    getParent: function(v) {
        return this.parent[v];
    },
    /** Return an array representing search order */
    getSearchOrder: function() {
        return this.searchOrder;
    },
    /** Return number of vertices found */
    getNumberOfVerticesFound: function() {
        return this.searchOrder.length;
    },
    /** Return the path of vertices from a vertex to the root */
    getPath: function(index) {
        var path = new Array();

        do {
            path.push(vertices[index]);
            index = parent[index];
        }
        while (index != -1);

        return path;
    }
}

Graph.prototype.removeVertex = function(v) {
    var index = v;
    this.vertices.splice(index, 1);
    this.neighbors.splice(index, 1);

    // Remove the edges adjacent to v
    for (var j = 0; j < this.neighbors.length; j++) {
        list1 = this.neighbors[j];
        for (var i = 0; i < list1.length; ) {
            if (list1[i].v == index) {
                list1.splice(i, 1);
            }
            else {
                i++;
            }
        }
    }

    // Reassign labels to vertices after index
    for (var j = 0; j < this.neighbors.length; j++) {
        list1 = this.neighbors[j];
        for (var i = 0; i < list1.length; i++) {
            if (list1[i].u >= index) {
                list1[i].u = list1[i].u - 1;
            }
            if (list1[i].v >= index) {
                list1[i].v = list1[i].v - 1;
            }
        }
    }

    return true;
}

Graph.prototype.bfs = function(v) {
    var searchOrder = new Array();
    var parent = new Array();
    for (var i = 0; i < this.vertices.length; i++)
        parent.push(-1); // Initialize parent[i] to -1

    var queue = new Queue();

    // Mark visited vertices
    isVisited = new Array();
    for (var i = 0; i < this.vertices.length; i++)
        isVisited.push(false);

    queue.enqueue(v); // Enqueue v
    isVisited[v] = true; // Mark it visited

    while (!queue.isEmpty()) {
        var u = queue.dequeue(); // Dequeue to u
        searchOrder.push(u); // u searched
        for (var i = 0; i < this.neighbors[u].length; i++) {
            e = this.neighbors[u][i];
            if (!isVisited[e.v]) {
                queue.enqueue(e.v); // Enqueue w
                parent[e.v] = u; // The parent of w is u
                isVisited[e.v] = true; // Mark it visited
            }
        }
    }

    return new Tree(v, parent, searchOrder);
}

/** Return a Hamiltonian path from the specified vertex object
 * Return null if the graph does not contain a Hamiltonian path */
Graph.prototype.getOneHamiltonianPath = function() {
    for (var i = 0; i < this.getSize(); i++) {
        var path = this.getHamiltonianPath(i);
        if (path != null)
            return path;
    }
    return null;
}

/** Return a Hamiltonian path from the specified vertex label
 * Return null if the graph does not contain a Hamiltonian path */
Graph.prototype.getHamiltonianPath = function(v) {
    // A path starts from v. (i, next[i]) represents an edge in 
    // the path. isVisited[i] tracks whether i is currently in the 
    // path.
    var next = new Array();
    for (var i = 0; i < this.getSize(); i++)
        next.push(-1); // Indicate no subpath from i is found yet

    var isVisited = new Array();
    for (var i = 0; i < this.getSize(); i++)
        isVisited.push(false);

    // The vertices in the Hamiltionian path are stored in result
    var result = [];

    // To speed up search, reorder the adjacency list for each 
    // vertex so that the vertices in the list are in increasing 
    // order of their degrees
//      for (var i = 0; i < this.getSize(); i++)
//        this.reorderNeigborsBasedOnDegree(getNeighbors(i));
    if (this.getHamiltonianPathRecursive(v, next, isVisited)) {
        var vertex = v; // Starting from v
        while (vertex != -1) {
            result.push(vertex); // Add vertex to the result list
            vertex = next[vertex]; // Get the next vertex in the path
        }
    }

    if (result.length == 0)
        return null;
    else
        return new Tree(v, next, result); // return null if no Hamiltionian path is found
}

/** Return true if all elements in array isVisited are true */
Graph.prototype.allVisited = function(isVisited) {
    var result = true;

    for (var i = 0; i < this.getSize(); i++)
        result = result && isVisited[i];

    return result;
}

/** Search for a Hamiltonian path from v */
Graph.prototype.getHamiltonianPathRecursive = function(v, next, isVisited) {
    isVisited[v] = true; // Mark vertex v visited

    if (this.allVisited(isVisited))
        return true; // The path now includes all vertices, thus found

    for (var i = 0; i < this.neighbors[v].length; i++) {
        var u = this.neighbors[v][i].v;
        if (!isVisited[u] &&
                this.getHamiltonianPathRecursive(u, next, isVisited)) {
            next[v] = u; // Edge (v, u) is in the path
            return true;
        }
    }

    isVisited[v] = false; // Backtrack, v is marked unvisited now
    return false; // No Hamiltonian path exists from vertex v
}

/** Return a Hamiltonian cycle 
 * Return null if the graph does not contain a Hamiltonian cycle */
Graph.prototype.getHamiltonianCycle = function(v) {
    var next = new Array();
    for (var i = 0; i < this.getSize(); i++)
        next.push(-1); // Indicate no subpath from i is found yet

    var isVisited = new Array();
    for (var i = 0; i < this.getSize(); i++)
        isVisited.push(false);

    // The vertices in the Hamiltionian path are stored in result
    var result = [];

    if (this.getHamiltonianCycleRecursive(v, next, isVisited, v)) {
        var vertex = v;
        while (vertex != -1) {
            result.push(vertex); // Insert vertex to result
            vertex = next[vertex];
        }
    }

    return result;
}

Graph.prototype.getHamiltonianCycleRecursive = function(v, next, isVisited, startV) {
    isVisited[v] = true; // Vertex v visited

    if (this.allVisited(isVisited) && this.isCycle(v, startV))
        return true;

    for (var i = 0; i < this.neighbors[v].length; i++) {
        var u = this.neighbors[v][i].v;
        if (!isVisited[u] &&
                this.getHamiltonianCycleRecursive(u, next, isVisited, startV)) {
            next[v] = u;
            return true;
        }
    }

    isVisited[v] = false; // Backtrack, v is marked unvisited now
    return false;
}

Graph.prototype.isCycle = function(v, startV) {
    for (var i = 0; i < this.neighbors[v].length; i++) {
        if (this.neighbors[v][i].v == startV)
            return true;
    }
    return false;
}

Graph.prototype.getConnectedComponents = function() {
    var list = new Array();

    var vertexIndices = new Array();
    for (var i = 0; i < this.vertices.length; i++)
        vertexIndices.push(i);

    while (vertexIndices.length > 0) {
        var tree = this.dfs(vertexIndices[0]);
        list.push(tree.getSearchOrder());
        removeAll(vertexIndices, tree.getSearchOrder());
    }

    return list;
}

function removeAll(s1, s2) {
    for (var i = 0; i < s2.length; i++) {
        var index = s1.indexOf(s2[i]);
        if (index >= 0) {
            s1.splice(index, 1);
        }
    }
}

Graph.prototype.cloneEdges = function() {
    var neigborCopy = new Array();
    for (var i = 0; i < this.neighbors.length; i++) {
        var edges = new Array();
        for (var j = 0; j < this.neighbors[i].length; j++) {
            var e = this.neighbors[i][j];
            edges.push(e);
        }
        neigborCopy.push(edges);
    }

    return neigborCopy;
}

Graph.prototype.getACycle = function() {
    var allVertices = new Array();
    for (var i = 0; i < this.vertices.length; i++) {
        allVertices.push(i);
    }

    var neighbors = this.cloneEdges();

    var searchOrder = new Array();
    var parent = new Array();
    for (var i = 0; i < this.vertices.length; i++)
        parent.push(-1); // Initialize parent[i] to -1

    // Mark visited vertices
    var isVisited = new Array();

    while (allVertices.length > 0) {
        var v = allVertices[0];

        var stack = new Stack();
        stack.push(v);
        searchOrder.push(v);
        allVertices.splice(allVertices.indexOf(v), 1);
        isVisited[v] = true; // Vertex x visited

        while (!stack.isEmpty()) {
            var x = stack.peek();
            if (neighbors[x].length == 0) {
                stack.pop();
                continue;
            }
            else {
                // Find the next unvisited neighbor of x
                for (var i = neighbors[x].length - 1; i >= 0; i--) {
                    var e = neighbors[x][i];
                    if (!isVisited[e.v]) {
                        parent[e.v] = x; // The parent of vertex e.v is x
                        stack.push(e.v); // Add a new neighbor to the stack
                        isVisited[e.v] = true; // Vertex x visited
                        searchOrder.push(e.v);
                        allVertices.splice(allVertices.indexOf(e.v), 1);
                        neighbors[x].splice(neighbors[x].indexOf(i), 1);
                        break;
                    }
                    else if (e.v != parent[x] && x != -1) {
                        // A path is found
                        var list = new Array();

                        list.push(e.v);
                        while (x != e.v) {
                            list.push(x);
                            x = parent[x];
                        }

                        return list;
                    }
                    else {
                        neighbors[x].splice(neighbors[x].indexOf(i), 1);
                    }
                }
            }
        }
    }

    return null;
}

Graph.prototype.getBipartite = function() {
    var allVertices = new Array();
    for (var i = 0; i < this.vertices.length; i++) {
        allVertices.push(i);
    }

    var neighbors = this.cloneEdges();

    var parent = new Array();
    var depth = new Array();
    for (var i = 0; i < this.vertices.length; i++) {
        parent.push(-1); // Initialize parent[i] to -1
        depth.push(0);
    }

    var queue = new Queue(); // list used as a queue
    var isVisited = new Array();

    while (allVertices.length > 0) {
        var v = allVertices[0];

        queue.enqueue(v); // Enqueue v
        isVisited[v] = true; // Mark it visited

        while (!queue.isEmpty()) {
            var u = queue.dequeue(); // Dequeue to u

            allVertices.splice(allVertices.indexOf(u), 1);
            for (var j = 0; j < neighbors[u].length; j++) {
                var e = neighbors[u][j];
                if (!isVisited[e.v]) {
                    queue.enqueue(e.v); // Enqueue w
                    parent[e.v] = u; // The parent of w is u
                    depth[e.v] = depth[u] + 1;
                    isVisited[e.v] = true; // Mark it visited
                }
                else if (depth[e.v] == depth[u]) {
                    return null;
                }
            }
        }
    }

    var bipartites = new Array();
    bipartites.push(new Array());
    bipartites.push(new Array());

    for (var i = 0; i < this.vertices.length; i++) {
        if (depth[i] % 2 == 0) {
            bipartites[0].push(i);
        }
        else {
            bipartites[1].push(i);
        }
    }

    return bipartites;
}
