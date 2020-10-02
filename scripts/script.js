var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start");
// var submitButton = document.getElementById("submit");
var questionElement = document.getElementById("question");
var ulContainer = document.getElementById("ul-container");
var choiceListUl = document.getElementById("choice-list");

// var playerAnswer = '';
var playerScore = 0;
var secondsLeft = 120;
var question = 0;
//var choices = '';
var answer = '';
// var questionObjectKey = '';
// var questionObjectValue = '';

var questionArray = [
    {
        question: "What is 10/2?",
        choices: ['3', '5', '115'],
        answer: '5'
    },
    {
        question: "What is 30/3?",
        choices: ['6', '7', '10'],
        answer: '10'
    },
    {
        question: "What is 0*7?",
        choices: ['0', '1', '7', '-7'],
        answer: '0'
    },
    {
        question: "Is 0 equal to null?",
        choices: [true, false],
        answer: false
    }
];

var highScoreArray = [];

function setTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = "Timer: " + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            quizOver();
        }

    }, 1000);
}

function quizOver() {
    timerElement.textContent = "Quiz Over";
    //if last question then hide submit button.
    // submitButton.style.display = "none";

    //if all questions are answered and time remains.
    // clearInterval(timerInterval);
    // secondsLeft = 1;
    // var imgEl = document.createElement("img");
    // imgEl.setAttribute("src", "images/image_1.jpg");
    // mainEl.appendChild(imgEl);

}

function presentQuestion() {
    if (question < questionArray.length) {
        questionElement.textContent = questionArray[question].question;
        console.log(questionArray[question].question);
        answer = questionArray[question].answer;

        presentchoices();
    } else {
        quizOver();
    }
    //nextQuestion++;

}

function presentchoices() {
    //build a new <ul> for each set of new choices.
    appendUlElement();

    //loop through choices and build a dynamic list of <li> for n choices.
    for (var i = 0; i < questionArray[question].choices.length; i++) {
        var choices = questionArray[question].choices[i];
        console.log(choices);

        var li = document.createElement("li");
        li.textContent = choices;
        li.setAttribute("data-index", i);

        choiceListUl.appendChild(li);

    }

};

function appendUlElement() {
    //build a new <ul> for each set of new choices.
    choiceListUl = document.createElement("ul");
    choiceListUl.setAttribute("id", "choice-list");
    document.getElementById("ul-container").appendChild(choiceListUl);
};

function removeUlElement() {
    //remove <ul> containing previous choices
    // var removeUl = document.querySelector(".choice-list");
    choiceListUl.remove();
    // console.log(removeForm);
};

function checkAnswer(event) {

    console.log('checkAnswer function, correct answer is  ' + answer);
    console.log(event);

    // console.log("i'm in check answer loop  " + nextQuestion);
    // for (var i = 0; i < Object.keys(questionArray[nextQuestion].answers).length; i++) {
    //     key = Object.keys(questionArray[nextQuestion].answers)[i];
    //     value = Object.values(questionArray[nextQuestion].answers)[i];
    //     if (document.getElementById(key).checked === true) {
    //         if (key === correctAnswer) {
    //             playerScore++;
    //         } else {
    //             secondsLeft -= 10;
    //         }
    //     };
    // }
    question++;
}

function appendRadioControl(item, choice) {
    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", item);
    labelEl.setAttribute("class", "labelClass");
    document.querySelector(".radio").appendChild(labelEl);
    labelEl.textContent = item + ' : ' + choice;

    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "radio");
    inputEl.setAttribute("name", "choice");
    inputEl.setAttribute("class", "inputClass");
    inputEl.setAttribute("id", item);
    inputEl.setAttribute("value", item + ' : ' + choice);
    document.querySelector(".radio").appendChild(inputEl);

}

startButton.addEventListener("click", function () {
    setTimer();
    presentQuestion();
    startButton.style.display = "none";
    // submitButton.style.display = "inline";
});

//submitButton.addEventListener("click", function () {
// checkAnswer();
// removeUlElement();
// presentQuestion();
//});

//When an element inside of the ulContainer is clicked.
ulContainer.addEventListener("click", function (event) {
    var element = event.target;
    // console.log(element);
    // console.log(element.textContent);
    checkAnswer(element.textContent);
    removeUlElement();
    presentQuestion();
})