// Constructor for Stack
function Stack() {
  this.list = [];
}
           
// Push an element to the stack
Stack.prototype.push = function(e) {
  this.list.push(e);
}
      
// Pop the top  from the stack
Stack.prototype.pop = function() {
  return this.list.pop();
}

Stack.prototype.getSize = function() {
  return this.list.length;
}
                  
Stack.prototype.isEmpty = function() {
  return this.list.length == 0;
}