// Constructor for WeightedGraph
function WeightedGraph() {
    Graph.call(this);
    this.totalWeightOfPath = Number.MAX_VALUE;
    this.shortestHamiltonianCycle = [];
}

WeightedGraph.prototype = new Graph(); // Inheritance
WeightedGraph.prototype.constructor = WeightedGraph;

WeightedEdge.prototype = new Edge(); // Inheritance
WeightedEdge.prototype.constructor = WeightedEdge;

MST.prototype = new Tree(); // Inheritance
MST.prototype.constructor = MST;

ShortestPathTree.prototype = new Tree(); // Inheritance
ShortestPathTree.prototype.constructor = ShortestPathTree;

function WeightedEdge(u, v, weight) {
    this.weight = weight;
    Edge.call(this, u, v);
}

WeightedGraph.prototype.getWeight = function(u, v) {
    for (var i = 0; i < this.neighbors[u].length; i++) {
        var edge = this.neighbors[u][i];
        if (edge.v == v) {
            return edge.weight;
        }
    }

    return null;
}

WeightedGraph.prototype.addEdge = function(u, v, weight) {
    Graph.prototype.addEdge1.call(this, new WeightedEdge(u, v, weight));
}

WeightedGraph.prototype.getMinimumSpanningTree = function() {
    return this.getMinimumSpanningTreeWithStartingVertex(0);
}

WeightedGraph.prototype.getMinimumSpanningTreeWithStartingVertex = function(startingVertex) {
    // cost[v] stores the cost by adding v to the tree
    var cost = new Array();
    for (var i = 0; i < this.vertices.length; i++) {
        cost.push(Number.MAX_VALUE); // Initial cost 
    }
    cost[startingVertex] = 0; // Cost of source is 0

    var parent = new Array(); // Parent of a vertex
    for (var i = 0; i < this.vertices.length; i++) {
        parent.push(-1); // Initial cost 
    }
    parent[startingVertex] = -1; // startingVertex is the root

    var totalWeight = 0; // Total weight of the tree thus far

    var T = new Array();

    // Expand T
    while (T.length < this.getSize()) {
        // Find smallest cost v in V - T 
        var u = -1; // Vertex to be determined
        var currentMinCost = Number.MAX_VALUE;
        for (var i = 0; i < this.getSize(); i++) {
            if (T.indexOf(i) < 0 && cost[i] < currentMinCost) {
                currentMinCost = cost[i];
                u = i;
            }
        }

        T.push(u); // Add a new vertex to T
        totalWeight += cost[u]; // Add cost[u] to the tree

        // Adjust cost[v] for v that is adjacent to u and v in V - T
        for (var i = 0; i < this.neighbors[u].length; i++) {
            var e = this.neighbors[u][i];
            if (T.indexOf(e.v) < 0 && cost[e.v] > e.weight) {
                cost[e.v] = e.weight;
                parent[e.v] = u;
            }
        }
    } // End of while

    return new MST(startingVertex, parent, T, totalWeight);
}

function MST(root, parent, searchOrder, totalWeight) {
    this.totalWeight = totalWeight;
    Tree.call(this, root, parent, searchOrder);
}

MST.prototype.getTotalWeight = function() {
    return this.totalWeight;
}

/** Find single source shortest paths */
WeightedGraph.prototype.getShortestPath = function(sourceVertex) {
    // cost[v] stores the cost of the path from v to the source
    // cost[v] stores the cost by adding v to the tree
    var cost = new Array();
    for (var i = 0; i < this.vertices.length; i++) {
        cost.push(Number.MAX_VALUE); // Initial cost 
    }
    cost[sourceVertex] = 0; // Cost of source is 0

    // parent[v] stores the previous vertex of v in the path
    var parent = new Array(); // Parent of a vertex
    for (var i = 0; i < this.vertices.length; i++) {
        parent.push(-1); // Initial cost 
    }
    parent[sourceVertex] = -1; // The parent of source is set to -1

    // T stores the vertices whose path found so far
    var T = new Array();

    // Expand T
    while (T.length < this.getSize()) {
        // Find smallest cost v in V - T 
        var u = -1; // Vertex to be determined
        var currentMinCost = Number.MAX_VALUE;
        for (var i = 0; i < this.getSize(); i++) {
            if (T.indexOf(i) < 0 && cost[i] < currentMinCost) {
                currentMinCost = cost[i];
                u = i;
            }
        }

        T.push(u); // Add a new vertex to T

        // Adjust cost[v] for v that is adjacent to u and v in V - T
        for (var i = 0; i < this.neighbors[u].length; i++) {
            var e = this.neighbors[u][i];
            if (T.indexOf(e.v) < 0 && cost[e.v] > cost[u] + e.weight) {
                cost[e.v] = cost[u] + e.weight;
                parent[e.v] = u;
            }
        }
    } // End of while

    // Create a ShortestPathTree
    return new ShortestPathTree(sourceVertex, parent, T, cost);
}

function ShortestPathTree(sourceVertex, parent, searchOrder, cost) {
    this.cost = cost;
    Tree.call(this, sourceVertex, parent, searchOrder);
}

ShortestPathTree.prototype.getCost = function(v) {
    return this.cost[v];
}

WeightedGraph.prototype.getHamiltonianCycle1 = function(v, next, isVisited, startV) {
    isVisited[v] = true; // Vertex v visited

    if (this.allVisited(isVisited) && this.isCycle(v, startV)) {
        result = []; // Create a list for path
        var vertex = startV;
        while (vertex != v) {
            result.push(vertex); // Insert vertex to result
            vertex = next[vertex];
        }
        result.push(v);

        var currentWeight = 0;

        for (var i = 0; i < result.length - 1; i++) {
            currentWeight += this.getWeight(result[i],
                    result[i + 1]);
        }
        currentWeight += this.getWeight(result[0],
                result[result.length - 1]);

        if (this.totalWeightOfPath > currentWeight) {
            this.totalWeightOfPath = currentWeight;
            this.shortestHamiltonianCycle = result.slice(0);
        }
    }

    for (var i = 0; i < this.neighbors[v].length; i++) {
        var u = this.neighbors[v][i].v;
        if (!isVisited[u]) {
            next[v] = u;
            this.getHamiltonianCycle1(u, next, isVisited, startV);
        }
    }

    isVisited[v] = false;
    return false;
}

WeightedGraph.prototype.getWeightedHamiltonianCycle = function(v) {
    var next = new Array();
    for (var i = 0; i < this.getSize(); i++)
        next.push(-1); // Indicate no subpath from i is found yet

    var isVisited = new Array();
    for (var i = 0; i < this.getSize(); i++)
        isVisited.push(false);

    this.totalWeightOfPath = Number.MAX_VALUE;
    this.shortestHamiltonianCycle = [];
    this.getHamiltonianCycle1(v, next, isVisited, v);
    return this.shortestHamiltonianCycle;
}