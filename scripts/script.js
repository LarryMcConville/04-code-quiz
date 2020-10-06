//variables mapped to HTML Elements.
var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start");
var viewHighScores = document.getElementById("btn-show-scores");
var clearHighScores = document.getElementById("btn-clear-scores");
var questionElement = document.getElementById("question");
var ulContainer = document.getElementById("ul-container");
var choiceListUl = document.getElementById("choice-list");
var scoreElement = document.getElementById("score");

//Global variables.
var playerScore = 0;
var secondsLeft = 0;
var question = 0;
var answer = "";

//Question Array.
var questionArray = [
  {
    question: "Inside which HTML element do we place JavaScript?",
    choices: ["<javascript>", "<scripting>", "<script>", "<js>"],
    answer: "<script>",
  },
  {
    question: 'What is the correct JavaScript syntax to change the content of <p id="demo">This is a demonstration.</p>?',
    choices: [
      '#demo.innerHTML = "Hello World!";',
      'document.getElementById("demo").innerHTML = "Hello World!";',
      'document.getElement("p").innerHTML = "Hello World!";',
      'document.getElementByName("p").innerHTML = "Hello World!";',
    ],
    answer: 'document.getElementById("demo").innerHTML = "Hello World!";',
  },
  {
    question: "Where is the correct place to insert JavaScript?",
    choices: ["The <head> section", "The <body> section", "Both the <head> section and the <body> section are correct"],
    answer: "The <body> section",
  },
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    choices: ['<script href="xxx.js">', '<script name="xxx.js">', '<script src="xxx.js">'],
    answer: '<script src="xxx.js">',
  },
  {
    question: "The external JavaScript file must contain the <script> tag.",
    choices: ["True", "False"],
    answer: "False",
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    choices: ['msg("Hello World");', 'alertBox("Hello World");', 'msgBox("Hello World");', 'alert("Hello World");'],
    answer: 'alert("Hello World");',
  },
];

//Highscore array stored on users computer.
var highscores = [];

//Load local storage when app launches.
loadHighScores();

function init() {
  secondsLeft = 60;
  question = 0;
  playerScore = 0;
  removeScoreUlElement();
  setTimer();
  presentQuestion();
}

//Timer decrements secondsLeft by 1 on a 1000ms interval.
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

//quizOver performs end of execution housekeeping chores.
function quizOver() {
  timerElement.textContent = "Quiz Over";
  questionElement.textContent = " You scored " + playerScore + " points!!!";
  removeUlElement();
  presentHighScores();
  playerSubmit();
  startButton.style.display = "inline-block";
  viewHighScores.style.display = "inline-block";
  clearHighScores.style.display = "inline-block";
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
    removeScores.remove();
  } else {
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
  label.textContent = "Enter your Name:";
  form.appendChild(label);

  input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter your Name");
  input.setAttribute("name", "playerText");
  input.setAttribute("id", "playerText");
  form.appendChild(input);
}

startButton.addEventListener("click", function () {
  init();
  startButton.style.display = "none";
  viewHighScores.style.display = "none";
  clearHighScores.style.display = "none";
});

ulContainer.addEventListener("submit", function (event) {
  event.preventDefault();

  var playerInput = document.getElementById("playerText").value.trim();

  // Return from function early if submitted text is blank
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
