
let myImage = document.querySelector('img');

myImage.onclick = function() {
  let mySrc = myImage.getAttribute('src');
  if(mySrc === 'images/books.png') {
    myImage.setAttribute ('src','images/idiot.jpg');
  } else {
    myImage.setAttribute ('src','images/books.png');
  }
}

let myButton = document.querySelector('button');
let hiddenImage = document.getElementById("hiddenImage")

myButton.onclick = function() {
    hiddenImage.style.display = (hiddenImage.style.display === "none") ? "block" : "none";
}



let recommendButton = document.getElementById("recommendButton");
let recommendationText = document.getElementById("recommendationText");

function getBookRecommendation() {
    let myName = prompt('Please enter your name.');
    if(!myName) {
      setUserName();
    } else {
      localStorage.setItem('name', myName);
      myHeading.innerHTML = 'Mozilla is cool, ' + myName;
    }
}

function displayRecommendation(recommendation) {
    if (recommendation !== null && recommendation !== "") {
        recommendationText.textContent = "Your Book Recommendation: " + recommendation;
    } else {
        recommendationText.textContent = "No recommendation entered.";
    }
 }

 recommendButton.onclick = function() {
    var userRecommendation = getBookRecommendation();
    displayRecommendation(userRecommendation)
}


document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    var recommendButton = document.getElementById("recommendButton");
    var recommendationText = document.getElementById("recommendationText");

    // Function to prompt user for a book recommendation
    function getBookRecommendation() {
        var userRecommendation = prompt("Enter a book recommendation:");
        return userRecommendation;
    }

    // Function to display the book recommendation on the page
    function displayRecommendation(recommendation) {
        if (recommendation !== null && recommendation !== "") {
            recommendationText.textContent = "Your Book Recommendation: " + recommendation;
        } else {
            recommendationText.textContent = "No recommendation entered.";
        }
    }

    // Event listener for the button click
    recommendButton.onclick = function () {
        var userRecommendation = getBookRecommendation();
        displayRecommendation(userRecommendation);
    };
});

