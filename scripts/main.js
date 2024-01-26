
let myImage = document.querySelector('img');

myImage.onclick = function() {
  let mySrc = myImage.getAttribute('src');
  if(mySrc === 'images/books.png') {
    myImage.setAttribute ('src','images/idiot.jpg');
  } else {
    myImage.setAttribute ('src','images/books.png');
  }
}

document.addEventListener("DOMContentLoaded", function () {
    var recommendButton = document.getElementById("recommendButton");
    var recommendationText = document.getElementById("recommendationText");

    function getBookRecommendation() {
        var userRec = prompt("Enter a book recommendation:");
        return userRec;
    }
    function displayRecommendation(recommendation) {
        if (recommendation !== null && recommendation !== "") {
            recommendationText.textContent = "Your Book Recommendation: " + recommendation;
        } else {
            recommendationText.textContent = "No recommendation entered.";
        }
    }

    recommendButton.onclick = function () {
        var userRec = getBookRecommendation();
        displayRecommendation(userRec);
    };
});

let myButton = document.getElementById('myButton');
let hiddenImage = document.getElementById("hiddenImage")

myButton.onclick = function() {
    hiddenImage.style.display = (hiddenImage.style.display === "none") ? "block" : "none";
}

// let recommendButton = document.getElementById("recommendButton");
// let recommendationText = document.getElementById("recommendationText");

// function getBookRecommendation() {
//     let myName = prompt('Please enter your name.');
//     if(!myName) {
//       setUserName();
//     } else {
//       localStorage.setItem('name', myName);
//       myHeading.innerHTML = 'Mozilla is cool, ' + myName;
//     }
// }

// function displayRecommendation(recommendation) {
//     if (recommendation !== null && recommendation !== "") {
//         recommendationText.textContent = "Your Book Recommendation: " + recommendation;
//     } else {
//         recommendationText.textContent = "No recommendation entered.";
//     }
//  }

//  recommendButton.onclick = function() {
//     var userRecommendation = getBookRecommendation();
//     displayRecommendation(userRecommendation);
// }

