var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start");
var viewHighScores = document.getElementById("btn-show-scores");
var clearHighScores = document.getElementById("btn-clear-scores");
var questionElement = document.getElementById("question");
var ulContainer = document.getElementById("ul-container");
var choiceListUl = document.getElementById("choice-list");
var scoreElement = document.getElementById("score");

clearHighScores.style.display = "none";

var playerScore = 0;
var secondsLeft = 0;
var question = 0;
var answer = "";

var questionArray = [
  {
    question: "What is 10/2?",
    choices: ["3", "5", "115"],
    answer: "5",
  },
  {
    question: "What is 30/3?",
    choices: ["6", "7", "10"],
    answer: "10",
  },
  {
    question: "What is 0*7?",
    choices: ["0", "1", "7", "-7"],
    answer: "0",
  },
  {
    question: "Is 0 equal to null?",
    choices: ["true", "false"],
    answer: "false",
  },
  {
    question: "Which number doesn't belong?",
    choices: ["1", "2", "4", "8", "16", "32", "42", "64", "128", "256"],
    answer: "42",
  },
];

var highscores = [];

//Load local storage when app launches.
loadHighScores();

function setTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timerElement.textContent = secondsLeft;

    if (secondsLeft === 0 || question === questionArray.length) {
      clearInterval(timerInterval);
      quizOver();
    }
  }, 1000);
}

function quizOver() {
  timerElement.textContent = "Quiz Over";
  questionElement.textContent = " You scored " + playerScore + " points!!!";
  console.log(timerElement.textContent);
  removeUlElement();
  presentHighScores();
  playerSubmit();
  console.log("Before " + clearHighScores);
  startButton.style.display = "inline-block";
  viewHighScores.style.display = "inline-block";
  clearHighScores.style.display = "inline-block";
  console.log("After " + clearHighScores);
}

function loadHighScores() {
  var storedHighScores = JSON.parse(localStorage.getItem("highscores"));
  if (storedHighScores !== null) {
    highscores = storedHighScores;
  }
}

function saveHighScores() {
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function presentQuestion() {
  if (question < questionArray.length) {
    questionElement.textContent = questionArray[question].question;
    answer = questionArray[question].answer;
    presentchoices();
  }
}

function presentchoices() {
  appendUlElement();

  //loop through choices and build a dynamic list of <li> for n choices.
  for (var i = 0; i < questionArray[question].choices.length; i++) {
    var choices = questionArray[question].choices[i];

    var li = document.createElement("li");
    li.textContent = choices;
    choiceListUl.appendChild(li);
  }
}

function appendUlElement() {
  //build a new <ul> for each new question.
  choiceListUl = document.createElement("ul");
  choiceListUl.setAttribute("id", "choice-list");
  document.getElementById("ul-container").appendChild(choiceListUl);
}

function removeUlElement() {
  //remove <ul> containing previous choices
  choiceListUl.remove();
}

function checkAnswer(playerChoice) {
  if (playerChoice === answer) {
    playerScore++;
  } else {
    secondsLeft -= 10;
  }
  question++;
}

function appendScoreUlElement() {
  leaderboardUl = document.createElement("ul");
  leaderboardUl.setAttribute("class", "jumbotron");
  leaderboardUl.setAttribute("id", "leaderboard-list");
  leaderboardUl.textContent = "Top 5 Players";
  document.getElementById("ul-container").appendChild(leaderboardUl);
}

function removeScoreUlElement() {
  var removeScores = document.getElementById("leaderboard-list");
  if (removeScores !== null) {
    console.log("leaderboard-list exists");
    removeScores.remove();
  } else {
    console.log("leaderboard-list does not exist");
  }
}

function presentHighScores() {
  removeScoreUlElement();
  appendScoreUlElement();

  //sort highscores array in descending order.
  highscores.sort((a, b) => {
    return b.score - a.score;
  });

  //only render the top 5 scores.
  topFiveScores = highscores.slice(0, 5);

  for (var i = 0; i < topFiveScores.length; i++) {
    var leaderboardPlayer = topFiveScores[i].player;
    var leaderboardScore = topFiveScores[i].score;

    var li = document.createElement("li");
    li.textContent = leaderboardPlayer + " - " + leaderboardScore;
    leaderboardUl.appendChild(li);
  }
}

function playerSubmit() {
  var leaderboardListUl = document.getElementById("leaderboard-list");

  hr = document.createElement("hr");
  leaderboardListUl.appendChild(hr);

  form = document.createElement("form");
  form.setAttribute("id", "scoreForm");
  form.setAttribute("method", "post");
  leaderboardListUl.appendChild(form);

  label = document.createElement("label");
  label.setAttribute("for", "playerText");
  label.textContent = "Enter your Name: ";
  form.appendChild(label);

  input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter your Name");
  input.setAttribute("name", "playerText");
  input.setAttribute("id", "playerText");
  form.appendChild(input);
}

startButton.addEventListener("click", function () {
  secondsLeft = 60;
  question = 0;
  playerScore = 0;
  removeScoreUlElement();
  setTimer();
  presentQuestion();
  startButton.style.display = "none";
  viewHighScores.style.display = "none";
  clearHighScores.style.display = "none";
});

ulContainer.addEventListener("submit", function (event) {
  event.preventDefault();

  //TODO: if player input is null, pass 'Player One' as player.
  var playerInput = document.getElementById("playerText").value.trim();

  // Return from function early if submitted todoText is blank
  if (playerInput === "") {
    return;
  }

  var newScore = {
    player: playerInput,
    score: playerScore,
  };

  highscores.push(newScore);
  saveHighScores();
  loadHighScores();
  presentHighScores();
  //if the game is over and we have dropped the score form, do nothing.
  var scoreForm = document.getElementById("scoreForm");
  if (scoreForm != null) {
    document.getElementById("scoreForm").style.display = "none";
  }
});

//When an element inside of the ulContainer is clicked.
ulContainer.addEventListener("click", function (event) {
  checkAnswer(event.target.textContent.trim());
  removeUlElement();
  presentQuestion();
});

viewHighScores.addEventListener("click", function (event) {
  presentHighScores();
  clearHighScores.style.display = "inline-block";
});

clearHighScores.addEventListener("click", function (event) {
  highscores = [];
  presentHighScores();
});
