

const myHeading = document.querySelector("h1");
myHeading.textContent = "Hello world!";

// Adding an image changer
const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/firefox-icon.png") {
    myImage.setAttribute("src", "images/firefox2.png");
  } else {
    myImage.setAttribute("src", "images/firefox-icon.png");
  }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
  const myName = prompt("Please enter your name.");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Mozilla is cool, ${myName}`;
  }
}


if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Mozilla is cool, ${storedName}`;
}

//Event handler
myButton.onclick = () => {
  setUserName();
};



/** let = keyword to declare a variable */

/** let myVariable = "Bob"; */
// let myVariable1;
// myVariable1 = "Bob";

/** Conditionals */
// let iceCream = "chocolate";
// if (iceCream === "chocolate") {
//   alert("Yay, I love chocolate ice cream!");
// } else {
//   alert("Awwww, but chocolate is my favorite…");
// }

/** Functions */
// let myVariable = document.querySelector("h1");
// alert("hello!");

// function multiple(num1, num2) {
//     let result = num1 * num2;
//     return result;
// }

/** Events */
// document.querySelector("html").addEventListener("click", function () {
//     alert("Ouch! Stop poking me!");
//   });
  
// arrow function () =>  instead of function ()
// document.querySelector("html").addEventListener("click", () => {
//     alert("Ouch! Stop poking me!");
// });


  