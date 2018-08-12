// Constructor for Heap
function Heap() {
  this.list = [];
}
           
Heap.prototype = {
  // Add a new object into the heap
  add: function(e) {
    this.list.push(e); // Append to the heap
    var currentIndex = this.list.length - 1; // The index of the last node

    while (currentIndex > 0) {
      var parentIndex = Math.floor((currentIndex - 1) / 2);
      
      // Swap if the current object is greater than its parent
      if (this.list[currentIndex] > this.list[parentIndex]) {
        var temp = this.list[currentIndex];
        this.list[currentIndex] = this.list[parentIndex];
        this.list[parentIndex] = temp;
        currentIndex = parentIndex;
      }
      else 
        break; // the tree is a heap now
    }
  },
      
  // Remove the root from the heap 
  remove: function() {
    if (this.list.length == 0) return null;

    var removedObject = this.list[0];
    this.list[0] = this.list[this.list.length - 1];
    this.list.pop();

    var currentIndex = 0;
    while (currentIndex < this.list.length) {
      var leftChildIndex = 2 * currentIndex + 1;
      var rightChildIndex = 2 * currentIndex + 2;

      // Find the maximum between two children
      if (leftChildIndex >= this.list.length) break; // The tree is a heap
      var maxIndex = leftChildIndex;
      if (rightChildIndex < this.list.length) {
        if (this.list[maxIndex] < this.list[rightChildIndex]) {
          maxIndex = rightChildIndex;
        }
      }

      // Swap if the current node is less than the maximum
      if (this.list[currentIndex] < this.list[maxIndex]) {
        var temp = this.list[maxIndex];
        this.list[maxIndex] = this.list[currentIndex];
        this.list[currentIndex] = temp;
        currentIndex = maxIndex;
      }
      else
        break; // The tree is a heap
    }

    return removedObject;
  },

  getSize: function() {
    return this.list.length;
  },
                  
  isEmpty: function() {
    return this.list.length == 0;
  }
}