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

var highScoreArray = [];

function setTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timerElement.textContent = secondsLeft;
    //$("#timer").text(secondsLeft);

    if (secondsLeft === 0 || question === questionArray.length) {
      clearInterval(timerInterval);
      quizOver();
    }
  }, 1000);
}

function quizOver() {
  //   $("#timer").text("Quiz Over");
  timerElement.textContent = "Quiz Over";
  // Add quizOver housekeeping.
  // call remove ul.
  // append a form to ul-container
  // prompt player to enter initials.
  // if null-empty then use 'dad'.
  // push player initials and score to highScoreArray.
  //json stringify and update local storage.
}

function presentQuestion() {
  if (question < questionArray.length) {
    questionElement.textContent = questionArray[question].question;
    answer = questionArray[question].answer;
    presentchoices();
  } else {
    quizOver();
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
    // console.log("Correct!!!");
    playerScore++;
  } else {
    // console.log("Wrong Answer!!!");
    secondsLeft -= 10;
  }
  //   $("#score").text(playerScore);
  scoreElement.textContent = playerScore;
  question++;
}

$("#start").on("click", function () {
  //startButton.addEventListener("click", function () {
  //load highScoreArray with json parse.
  setTimer();
  presentQuestion();
  startButton.style.display = "none";
});

//When an element inside of the ulContainer is clicked.
ulContainer.addEventListener("click", function (event) {
  //   console.log(event.target.textContent);

  checkAnswer(event.target.textContent.trim());
  removeUlElement();
  presentQuestion();
});
