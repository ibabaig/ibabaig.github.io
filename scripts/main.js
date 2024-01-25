

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


  