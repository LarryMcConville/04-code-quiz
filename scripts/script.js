var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start");
var questionElement = document.getElementById("question");
var ulContainer = document.getElementById("ul-container");
var choiceListUl = document.getElementById("choice-list");
var scoreElement = document.getElementById("score");

var playerScore = 0;
var secondsLeft = 60;
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

//TODO: define as empty array, remove array contents.
var highscores = [];

//Load local storage regardless if user has started a session.
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
  //   appendUlElement();
  //TODO: Add quizOver housekeeping.
  presentHighScores();
  // TODO: Change question jumbo to leaderboard text.
  // prompt player to enter initials.
  // if null-empty then use 'dad'.
  // push player initials and score to highScoreArray.
  //json stringify and update local storage.
}

function loadHighScores() {
  var storedHighScores = JSON.parse(localStorage.getItem("highscores"));
  //console.log(storedHighScores);
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
  } else {
    // quizOver();
    //FIXME: - either add some logic here or flip this to !question to remove else.
  }
}

function presentchoices() {
  appendUlElement();

  //loop through choices and build a dynamic list of <li> for n choices.
  for (var i = 0; i < questionArray[question].choices.length; i++) {
    var choices = questionArray[question].choices[i];

    var li = document.createElement("li");
    li.textContent = choices;
    li.setAttribute("data-index", i);

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
  //   $("#score").text(playerScore);
  //   scoreElement.textContent = playerScore;
  question++;
}

function presentHighScores() {
  leaderboardUl = document.createElement("ul");
  leaderboardUl.setAttribute("class", "jumbotron");
  leaderboardUl.setAttribute("id", "leaderboard-list");
  leaderboardUl.textContent = "Current Leaders";
  document.getElementById("ul-container").appendChild(leaderboardUl);

  for (var i = 0; i < highscores.length; i++) {
    var leaderboardPlayer = highscores[i].player;
    var leaderboardScore = highscores[i].score;

    var li = document.createElement("li");
    li.textContent = leaderboardPlayer + " : " + leaderboardScore;
    //li.setAttribute("data-index", i);

    leaderboardUl.appendChild(li);
  }
  playerSubmit();
}

function playerSubmit() {
  //TODO: add one more <li> with a button so users can submit their initials.
  var leaderboardListUl = document.getElementById("leaderboard-list");

  console.log("playerSubmit function called");

  hr = document.createElement("hr");
  leaderboardListUl.appendChild(hr);

  form = document.createElement("form");
  form.setAttribute("id", "scoreForm");
  form.setAttribute("method", "post");
  leaderboardListUl.appendChild(form);

  label = document.createElement("label");
  label.setAttribute("for", "playerText");
  label.textContent = "Enter your Name";
  form.appendChild(label);

  input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter your Name");
  input.setAttribute("name", "playerText");
  input.setAttribute("id", "playerText");
  form.appendChild(input);
}

//$("#start").on("click", function () {
startButton.addEventListener("click", function () {
  //TODO: load highScoreArray with json parse.
  setTimer();
  presentQuestion();
  startButton.style.display = "none";
});

ulContainer.addEventListener("submit", function (event) {
  event.preventDefault();

  //console.log(document.getElementById("playerText").value.trim());
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

  console.log(newScore);

  //TODO: hide label and input once submitted
  document.getElementById("scoreForm").style.display = "none";
  //document.getElementById("playerText").value = "";
});

//When an element inside of the ulContainer is clicked.
ulContainer.addEventListener("click", function (event) {
  //   console.log(event.target.textContent);

  checkAnswer(event.target.textContent.trim());
  removeUlElement();
  presentQuestion();
});
