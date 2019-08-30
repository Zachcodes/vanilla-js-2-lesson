let body = document.getElementsByTagName('body')[0];

// Overwriting the value of onclick on the button element to assing a javascript function
console.log('the body dom object');
console.dir(body);
console.log('body onclick value before assigning function', body.onclick);
body.onclick = handleEvent;
console.log('body onclick value after assigning function', body.onclick);
function handleEvent() {
  console.log('handle event 1 getting invoked');
}

//scoped correctly
let body = document.getElementById('body');

function test() {
  let protected = 'hello';
  return function inner() {
    console.log(protected);
  };
}

body.onclick = test();
// How can we pass in data using this method?
body.param1 = 'hello';
// function handleEvent() {
//   console.log(body[0].param1);
// }

// The above method works just fine since body is a javascript object so we can use the properties inside the function. It can be less clean and easy to see the passed in values as writing inline functions

// Taking this one step further, how can we get information about the element that our function is tied to?
// function handleEvent(e) {
//   console.log('event \n', e);
//   console.dir(e.target);
// }

// We still have the issue of overwriting the function that is attached as the onclick event handler by assigning the value of the body.onclick
function handleEvent2() {
  console.log('I am handleEvent2');
}

body.onclick = handleEvent2;

// How can we attach multiple event handlers to one element?

body.addEventListener('click', handleEvent);
body.addEventListener('click', handleEvent2);

// What will happen here?
// Event bubbling
function doSomething(e) {
  // How can we stop propagation?
  e.stopPropagation();
  console.log('do something is being invoked');
}

let button1 = document.getElementById('button-1');
button1.addEventListener('click', doSomething);

// Event bubbling relates to the order in which event handlers are called when one element is nested inside a second element and both elements have registered a listener for the same event

// Why might we choose to not stop progagation? If we want the parent a tag of a nested button to still go to the link we provided to it.
// or if we want the parent form to submit
function handleNavigation(e) {
  e.preventDefault();
  console.log('a tag is being clicked');
}
let aTag = document.getElementById('myATag');
aTag.addEventListener('click', handleNavigation);

// query selector and query selector all
// Query selector will match the first element in the dom that matches a given set of selectors or return null if no match is found
let firstButton = document.querySelector('button');
console.log('first button', firstButton);

let allButtons = document.querySelectorAll('button');
console.log('all buttons', allButtons);

// demo createElement, append, parentNode, remove, getAttribute and setAttribute
let newButton = document.createElement('button');
newButton.innerText = 'hello';
body.append(newButton);
console.log('newbuttons parent node', newButton.parentNode);
newButton.setAttribute('testing', 'hello');
console.dir(newButton.attributes);

console.log(newButton.getAttribute('testing'));
// remove the node from the tree
// newButton.remove();

// Why use the above instead of innerHtml? Cross Site Scripting

// We can also use innerHtml to set the html of a element but this can lead to issues with cross site scripting attacks

let body = document.getElementById('body');
function showValue() {
  console.log(1111);
  let newElement = document.createElement('div');
  newElement.innerHTML = '<img src=x onerror="alert(\'XSS Attack\')">';
  body.appendChild(newElement);
}
