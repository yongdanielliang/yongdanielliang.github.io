// Constructor for Queue
function Queue() {
  this.list = new LinkedList();
}
           
// Enqueue an element to the queue
Queue.prototype.enqueue = function(e) {
  this.list.add(e);
}
      
// Remove an element from the head of the queue
Queue.prototype.dequeue = function() {
  return this.list.removeFirst();
}

Queue.prototype.getSize = function() {
  return this.list.getSize();
}
                  
Queue.prototype.isEmpty = function() {
  return this.list.isEmpty();
}