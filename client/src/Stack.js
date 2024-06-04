import * as network from "./Network.js"


let stack = [];

let setPage = null;

function setCallback(callback) {
  setPage = callback;
}

function push(thing) {
  stack.push(thing);
}

function pop(thing) {
  return stack.pop();
}

function peek() {
  return stack[stack.length-1];
}

function view() {
  return stack.reduce((a,x) => a + " - " + x.name + "/" + x.data,"");
}

function getStack() {
  return stack;
}

function clearStack() {
  stack = [];
}

//////////////////////////////////////////////////////////////////////////

function go(page) {
  setPage(page);
  push(page);
}


function goBack() {
  if (stack.length > 1) {
    pop();
    const previousPage = peek();
    setPage(previousPage);
  }
}

function goBack2() {
  if (stack.length > 1) {
    pop();
    pop();
    const previousPage = peek();
    setPage(previousPage);
  }
}


export { push, view, go, goBack, goBack2, setCallback, getStack, clearStack };
