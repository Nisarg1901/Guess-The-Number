function run() {
  var coll = document.getElementsByClassName("collapsible");
  var i;
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}
// Variables
let guesses;
let correctNumber;
let counter = 1;

window.onload = function () {
  initGame();
  document.getElementById("number-submit").addEventListener("click", playGame);
  document.getElementById("restart-game").addEventListener("click", initGame);
};

function playGame() {
  let numberGuess = document.getElementById("number-guess").value;
  saveGuessHistory(numberGuess);
  displayHistory();
  displayResult(numberGuess);
}

// Initialize a new game
function initGame() {
  correctNumber = getRandomNumber();
  guesses = [];
  displayHistory();
  resetResultContent();
}

// Reset results
function resetResultContent() {
  document.getElementById("result").innerHTML = "";
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

// Save the user guess entered from the input
function saveGuessHistory(guess) {
  guesses.push(guess);
}

// Display history in HTML
function displayHistory() {
  let index = guesses.length - 1;
  let list = "<ul class='list-group'>";
  while (index >= 0) {
    list +=
      "<li class='list-group-item'>" +
      "You guessed " +
      guesses[index] +
      "</li>";
    index -= 1;
  }
  list += "</ul>";
  document.getElementById("history").innerHTML = list;
}

function displayResult(numberGuess) {
  if (numberGuess > correctNumber) {
    counter++;
    showNumberAbove();
  } else if (numberGuess < correctNumber) {
    counter++;
    showNumberBelow();
  } else {
    showYouWon();
  }
}

function getDialog(dialogType, text) {
  let dialog;
  switch (dialogType) {
    case "warning":
      dialog = "<div class='alert alert-warning' role='alert'>";
      break;
    case "won":
      dialog = "<div class='alert alert-success' role='alert'>";
      break;
  }
  dialog += text;
  dialog += "</div>";
  return dialog;
}

function showYouWon() {
  const text = "Awesome job, you got it in " + counter + " attempts!";
  let dialog = getDialog("won", text);
  document.getElementById("result").innerHTML = dialog;
  document.getElementById("history").innerHTML = "";
}

function showNumberAbove() {
  const text = "Your guess is high!";
  let dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}

function showNumberBelow() {
  const text = "Your guess is low!";
  let dialog = getDialog("warning", text);
  document.getElementById("result").innerHTML = dialog;
}
