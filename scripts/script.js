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
  {
    question: "How do you create a function in JavaScript?",
    choices: ["function:myFunction()", "function = myFunction()", "function myFunction()"],
    answer: "function myFunction()",
  },
  {
    question: "How do you call a function named 'myFunction'?",
    choices: ["call function myFunction()", "myFunction()", "call myFunction()"],
    answer: "myFunction()",
  },
  {
    question: "How to write an IF statement in JavaScript?",
    choices: ["if i = 5", "if i = 5 then", "if (i == 5)", "if i == 5 then"],
    answer: "if (i == 5)",
  },
  {
    question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    choices: ["if i <> 5", "if i =! 5 then", "if (i <> 5)", "if (i != 5)"],
    answer: "if (i != 5)",
  },
  {
    question: "How does a WHILE loop start?",
    choices: ["while (i <= 10)", "while i = 1 to 10", "while (i <= 10; i++)"],
    answer: "while (i <= 10)",
  },
  {
    question: "How does a FOR loop start?",
    choices: ["for i = 1 to 5", "for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for (i <= 5; i++)"],
    answer: "for (i = 0; i <= 5; i++)",
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    choices: ["Math.round(7.25)", "Math.rnd(7.25)", "rnd(7.25)", "round(7.25)"],
    answer: "Math.round(7.25)",
  },
  {
    question: "JavaScript is the same as Java.",
    choices: ["True", "False"],
    answer: "False",
  },
];

//Highscore array stored on users computer.
var highscores = [];

//Load local storage when app launches.
loadHighScores();

//initialize variables, prep app, start timer and present first question.
function init() {
  secondsLeft = 210;
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
      playerScore = secondsLeft;
      clearInterval(timerInterval);
      quizOver();
    }
  }, 1000);
}

//load high scores from local storage.
function loadHighScores() {
  var storedHighScores = JSON.parse(localStorage.getItem("highscores"));
  if (storedHighScores !== null) {
    highscores = storedHighScores;
  }
}

//save high scores to local storage.
function saveHighScores() {
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

//present a question.
function presentQuestion() {
  if (question < questionArray.length) {
    questionElement.textContent = questionArray[question].question;
    answer = questionArray[question].answer;
    presentchoices();
  }
}

//calls appendUlElement, and presents choices.
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

//appends #choice-list <ul> to #ul-container to serve as parent element for <li> choices.
function appendUlElement() {
  //build a new <ul> for each new question.
  choiceListUl = document.createElement("ul");
  choiceListUl.setAttribute("id", "choice-list");
  document.getElementById("ul-container").appendChild(choiceListUl);
}

//removes #choice-list <ul> in preparation of the next group of questions/choices.
function removeUlElement() {
  //remove <ul> containing previous choices
  choiceListUl.remove();
}

//check player selection, if incorrect decrement time by 10 seconds; advance to next question.
function checkAnswer(playerChoice) {
  if (playerChoice !== answer) {
    secondsLeft -= 10;
  }
  question++;
}

//render highscore sheet in place of the questions/choices.
function presentHighScores() {
  removeScoreUlElement();
  appendScoreUlElement();

  //sort highscores array in descending order.
  highscores.sort((a, b) => {
    return b.score - a.score;
  });

  //only render the top 5 scores.
  topFiveScores = highscores.slice(0, 5);

  //loop through our top 5 scores.
  for (var i = 0; i < topFiveScores.length; i++) {
    var leaderboardPlayer = topFiveScores[i].player;
    var leaderboardScore = topFiveScores[i].score;

    //render a new <li> element for each high score in our array.
    var li = document.createElement("li");
    li.textContent = leaderboardPlayer + " - " + leaderboardScore;
    leaderboardUl.appendChild(li);
  }
}

//append score <ul> to #ul-container.
function appendScoreUlElement() {
  leaderboardUl = document.createElement("ul");
  leaderboardUl.setAttribute("class", "jumbotron");
  leaderboardUl.setAttribute("id", "leaderboard-list");
  leaderboardUl.textContent = "Top 5 Players";
  document.getElementById("ul-container").appendChild(leaderboardUl);
}

//remove score <ul> preparing UI for rendering new highscore list.
function removeScoreUlElement() {
  var removeScores = document.getElementById("leaderboard-list");
  if (removeScores !== null) {
    removeScores.remove();
  } else {
  }
}

//called when the quiz is over. we build a <form><label><input> for the player to enter the name.
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

//click event for Begin Quiz button, calls the init() and hides buttons during quiz.
startButton.addEventListener("click", function () {
  init();
  startButton.style.display = "none";
  viewHighScores.style.display = "none";
  clearHighScores.style.display = "none";
});

//submit event for user submitting name when the quiz is over.
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

//renders Highscores List and Clear Scores Button.
viewHighScores.addEventListener("click", function (event) {
  presentHighScores();
  clearHighScores.style.display = "inline-block";
});

//set the array to an empty array, pushes the array to local storage and renders the Highscores.
clearHighScores.addEventListener("click", function (event) {
  highscores = [];
  saveHighScores();
  presentHighScores();
});
