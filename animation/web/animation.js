/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getElementPos(element) {
  var res = new Object();
  res.x = 0;
  res.y = 0;
  res.w = 0;
  res.h = 0;

  var box = element.getBoundingClientRect();

  res.x = box.left;
  res.y = box.top;
  res.w = box.right - box.left;
  res.h = box.bottom - box.top - 5;

  return res;
}

function HighLight() {
  this.width = 318;
  this.height = 10;
  this.top = 77;
  this.left = 62;
}

function Explanation() {
  this.innerHTML = "The program starts the execution from the main method.";
  this.left = 448;
  this.width = 158;
  this.height = 40;
  this.top = 75;
}

function CommandPrompt() {
  this.innerHTML = "The program starts the execution from the main method.";
  this.left = 448;
  this.width = 158;
  this.height = 40;
  this.top = 75;
}
animationSpeed = 500;
lineOffSet = 15;
highLight = [];
highLight[0] = new HighLight();
highLight[0].top = 79;
highLight[0].left = 62;
highLight[0].width = 318;

highLight[1] = new HighLight();
highLight[1].top = 77 + lineOffSet;
highLight[1].left = 60 + 20;
highLight[1].width = 318 - 14;

highLight[2] = new HighLight();
highLight[2].top = 77 + 2 * lineOffSet;
highLight[2].width = 6;
highLight[2].left = 62;

explanation = [];
explanation[0] = new Explanation();
explanation[0].innerHTML = "The program starts the execution from the main method.";
explanation[0].top = 75;
explanation[0].left = 448;

explanation[1] = new Explanation();
explanation[1].innerHTML = "The statement displays Welcome to Java! to the console.";
explanation[1].top = 77 + 2 * lineOffSet;
explanation[1].left = 270;
//      explanation[1].width = 200;
explanation[2] = new Explanation();
explanation[2].innerHTML = "The main method exits. The program is finished.";
explanation[2].top = 77 + 2 * lineOffSet;
explanation[2].left = 88;

commandPrompt = [];
commandPrompt[0] = new CommandPrompt();
commandPrompt[1] = new CommandPrompt();
commandPrompt[2] = new CommandPrompt();
commandPrompt[0].innerHTML = "c:\\book>java Welcome";
commandPrompt[0].top = 87;
commandPrompt[0].left = 600;
commandPrompt[1].innerHTML = "c:\\book>java Welcome\nWelcome to Java!";
commandPrompt[1].top = 83 + 2 * lineOffSet;
commandPrompt[1].left = 430;
commandPrompt[2].innerHTML = "c:\\book>java Welcome\nWelcome to Java!\n\nc:\\book>";
commandPrompt[2].top = 72 + 3 * lineOffSet;
commandPrompt[2].left = 240;

currentLine = 0;



