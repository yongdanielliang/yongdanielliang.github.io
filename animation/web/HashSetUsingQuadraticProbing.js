// Constructor for MyHashSet
function MyHashSet() {
    // Current hash table capacity. Capacity is a power of 2
    this.capacity = 11;

    // Specify a load factor threshold used in the hash table
    this.loadFactorThreshold = 0.75;

    // The number of elements in the set
    this.size = 0;

    // Hash table is an array with each cell that is a linked list
    this.table = [];
    for (var i = 0; i < this.capacity; i++)
        this.table[i] = null;
}

var DEFAULT_INITIAL_CAPACITY = 4;

// Define the maximum hash table size. 1 << 30 is same as 2^30
var MAXIMUM_CAPACITY = 1 << 30;

// Define default load factor
var DEFAULT_MAX_LOAD_FACTOR = 0.75;

/** Construct a set with the specified initial capacity 
 * and load factor */
MyHashSet.prototype.clear = function(e) {
    this.size = 0;
    this.removeElements();
}

MyHashSet.prototype.setLoadFactorThreashold = function(factor) {
    if (factor >= 1)
        jAlert("The load factor threashold must be greater than 1.0");
    else {
        this.loadFactorThreshold = factor;

        if (this.size + 1 > this.capacity * this.loadFactorThreshold) {
            this.rehash();
        }
    }
}

MyHashSet.prototype.setCapacity = function(capacity) {
    if (capacity <= this.size) {
        jAlert("The capacity must be at least one more than the current size");
    }
    else if (this.size + 1 > capacity * this.loadFactorThreshold) {
        jAlert("Please set a larger capacity. The capacity cannot be " +
                " set to a smaller value that causes rehashing.")
    }
    else {
        var list = this.setToList(); // Copy to a list
        this.capacity = capacity;
        this.table = [];
        for (var i = 0; i < this.capacity; i++)
            this.table[i] = null;
        this.size = 0;

        for (var i = 0; i < list.length; i++)
            this.add(list[i]);
    }
}

/** Return true if the element is in the set */
MyHashSet.prototype.contains = function(e) {
    // Perform linear probing
    var k = this.hash(e);
    var starting = k;
    var i = k;
    var j = 1;
    while (this.table[i] != null) {
        if (this.table[i] != 'X' && this.table[i] == e)
            return true;
        i = Math.abs((k + j * j) % this.table.length);
        if (i == starting)
            return false;
        j++;
    }

    return false;
}

/** Remove all entries from each bucket */
MyHashSet.prototype.removeEntries = function() {
    for (var i = 0; i < this.capacity; i++)
        table[i] = null;
}

/** Add an element to the set */
MyHashSet.prototype.add = function(e) {
    if (this.contains(e)) // Duplicate element not stored
        return false;

    if (this.size + 1 > this.capacity * this.loadFactorThreshold) {
        this.rehash();
    }

    var k = this.hash(e);
    var j = 1;
    var i = k;
    while (this.table[i] != null && this.table[i] != 'X') {
        i = Math.abs((k + j * j) % this.table.length);
        j++;
    }

    // Add an element to the table
    this.table[i] = e;

    this.size++; // Increase size
    return true;
}

/** Remove the element from the set */
MyHashSet.prototype.remove = function(e) {
    if (!this.contains(e))
        return false;

    var k = this.hash(e);
    var j = 1;
    var i = k;

    while (this.table[i] != null
            && this.table[i] != e) {
        i = Math.abs((k + j * j) % this.table.length);
        j++;
    }

    if (this.table[i] != null && this.table[i] == e) {
        // A special marker Entry(null, null) is placed for the deleted
        // entry
        this.table[i] = 'X';
    }
    
    this.size--; // Decrease size
    return true;
}

/** Return true if the set contains no elements */
MyHashSet.prototype.isEmpty = function() {
    return this.size == 0;
}

/** Return the number of elements in the set */
MyHashSet.prototype.size = function() {
    return size;
}

MyHashSet.prototype.hash = function(hashCode) {
    return hashCode % this.capacity;
}

/** Ensure the hashing is evenly distributed */
function supplementalHash(h) {
    h ^= (h >>> 20) ^ (h >>> 12);
    return h ^ (h >>> 7) ^ (h >>> 4);
}

/** Return a power of 2 for initialCapacity */
function trimToPowerOf2(initialCapacity) {
    var capacity = 1;
    while (capacity < initialCapacity) {
        capacity <<= 1;
    }

    return capacity;
}

/** Remove all e from each bucket */
MyHashSet.prototype.removeElements = function() {
    for (var i = 0; i < this.capacity; i++) {
        if (this.table[i] != null) {
            this.table[i] = null;
        }
    }
}

/** Rehash the set */
MyHashSet.prototype.rehash = function() {
    var list = this.setToList(); // Copy to a list
    this.capacity <<= 1; // Double capacity      
    this.table = []; // Create a new hash table
    for (var i = 0; i < this.capacity; i++)
        this.table[i] = null;
    this.size = 0; // Reset size 

    for (var i = 0; i < list.length; i++) {
        this.add(list[i]); // Add from the old table to the new table
    }
}

/** Copy elements in the hash set to an array list */
MyHashSet.prototype.setToList = function() {
    var list = [];

    for (var i = 0; i < this.capacity; i++) {
        if (this.table[i] !== null && this.table[i] !== 'X') {
            list.push(this.table[i]);
        }
    }

    return list;
}

MyHashSet.prototype.toString = function() {
    var list = this.setToList();
    var builder = "[";

    // Add the elements except the last one to the string builder
    for (var i = 0; i < list.length - 1; i++) {
        builder += list[i] + ", ";
    }

    // Add the last element in the list to the string builder
    if (list.length == 0)
        builder += "]";
    else
        builder += list[list.length - 1] + "]";

    return builder;
}