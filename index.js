const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");
const totalCells = 100;
const totalBombs = 15;
const maxScore = 10;
const bombsList = []; // Using an array to store to store the list of bombs
let score = 0;

window.onload = function startScreen() {
  //I use onload because I want the user to see the difference on the website after their input
  let userName = sessionStorage.getItem("userName");
  if (!userName || userName.trim() === "") {
    // If userName is not stored or empty, prompt the user to enter their name
    alert(
      "Welcome to The Bomb Zone! 🎯 Your goal is to reach 10 points without clicking on any bombs. Each move earns you 1 point—but be careful! One wrong click, and it's game over. Good luck! 💣🚀"
    );
    userName = prompt("To start the game, what's your name?");
    if (userName === null || userName === "") {
      //error handling in user input, so it won't show 'null'
      const userName2 = prompt("One last chance, what's your name?");
      if (userName2 === null || userName2 === "") {
        alert("Ok, I'm just gonna call you John.");
        userName = "John";
      } else {
        userName = userName2;
      }
    }
    sessionStorage.setItem("userName", userName);
    // Store userName in sessionStorage so when thsy click 'play again', they won't have to type in their name again.
    // I have tried to use localStorage as first, but the problem with that is that even if I close the tab and reopen a new one,
    // it will still remember my last input, so sessionStorage solved my problem! (Thank you Stackoverflow)
  }
  document
    .querySelectorAll(".game-title")
    .forEach((title) => (title.textContent = `${userName}'s gameboard`));
  //changing both the title and <h1> after taking user input
};

function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(5, "0"); //to ensure this always shows 5 characters
  if (score === maxScore) {
    endGame(true);
  }
}

for (let i = 1; i <= 100; i++) {
  //Using for loop to create 100 <div> elements to reduce repetition
  const cell = document.createElement("div");
  cell.classList.add("cell");

  cell.addEventListener("click", function () {
    //event listener is attached to each div element to handle the click event
    if (cell.classList.contains("cell-clicked")) return;

    if (bombsList.includes(i)) {
      cell.classList.add("cell-bomb");
      endGame(false);
      //boolean value is used to determine whether the game ends in defeat (false) if the clicked cell contains a bomb
    }
    cell.classList.add("cell-clicked");
    updateScore(); //if it doesn't contain a bomb, then call the updateScore function to add 1 point to the score board
  });
  grid.appendChild(cell);
}

while (bombsList.length < totalBombs) {
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;
  if (!bombsList.includes(randomNumber)) {
    bombsList.push(randomNumber); //generate random numbers to push to the bombsList array
  }
}

console.log(bombsList);
//console.log to see where the bombs are (i.e., what numbers have been pushed to the array), so I can check if the code is working as expected

function endGame(isVictory) {
  //the isVictory parameter is a boolean value indicating whether the game ended in victory (true) or defeat (false)
  if (isVictory) {
    endGameText.innerHTML = "YOU<br/>WON";
    endGameScreen.classList.add("win");
    revealAllBombs();
  }

  endGameScreen.classList.remove("hidden");
  revealAllBombs();
}

function revealAllBombs() {
  const cells = document.querySelectorAll(".cell");

  for (let i = 1; i <= cells.length; i++) {
    const cell = cells[i - 1]; //accessing each cell by index

    if (bombsList.includes(i)) {
      //check to see if the current cell index (i) is included in the bombsList;
      cell.classList.add("cell-bomb"); //if so, add the class 'cell-bomb'(bomb image)
    }
  }
}

playAgainButton.addEventListener("click", function () {
  window.location.reload();
});

//  Footer:
const currentDate = new Date();
let currentYear = currentDate.getFullYear();
document.querySelector("footer p").textContent =
  "Cecilia Chang © " + currentYear;
