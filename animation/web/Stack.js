// Constructor for Stack
function Stack() {
  this.list = [];

  // Push an element to the stack
  this.push = function(e) {
    this.list.push(e);
  }
      
  // Pop the top  from the stack
  this.pop = function() {
    return this.list.pop();
  }
  
  // Peek the top from the stack
  this.peek = function() {
    return this.list[this.getSize() - 1];
  }

  // Return the stack size
  this.getSize = function() {
    return this.list.length;
  }
   
  // Return true if stack is empty
  this.isEmpty = function() {
    return this.list.length == 0;
  }
}