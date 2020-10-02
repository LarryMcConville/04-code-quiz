var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start");
var submitButton = document.getElementById("submit");
var questionElement = document.getElementById("question");
var choiceList = document.getElementById("choice-list");

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
    submitButton.style.display = "none";

    //if all questions are answered and time remains.
    // clearInterval(timerInterval);
    // secondsLeft = 1;
    // var imgEl = document.createElement("img");
    // imgEl.setAttribute("src", "images/image_1.jpg");
    // mainEl.appendChild(imgEl);

}

function presentQuestion() {
    if (question < questionArray.length) {
        answer = questionArray[question].answer;
        questionElement.textContent = questionArray[question].question;
        console.log(questionArray[question].question);

        presentchoices();
    } else {
        quizOver();
    }
    //nextQuestion++;

}

function presentchoices() {
    // appendForm();

    //loop through choices and build a dynamic list of n choices.
    for (var i = 0; i < questionArray[question].choices.length; i++) {
        var choices = questionArray[question].choices[i];
        console.log(choices);

        var li = document.createElement("li");
        li.textContent = choices;
        li.setAttribute("data-index", i);

        choiceList.appendChild(li);
        //appendRadioControl(questionObjectKey, questionObjectValue);
        // console.log("answer loop question  " + nextQuestion);
        //console.log(questionObjectKey, questionObjectValue);

    }

};

function appendForm() {
    //build a new <form> for every group of new answers.
    var formEl = document.createElement("form");
    formEl.setAttribute("class", "radio");
    document.querySelector(".answers").appendChild(formEl);
};

function removeForm() {
    //remove <form> containing previous answers
    var removeForm = document.querySelector(".radio");
    removeForm.remove();
    // console.log(removeForm);
};

function checkAnswer() {

    console.log('checkAnswer function, correct answer is  ' + answer);

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
    submitButton.style.display = "inline";
});

submitButton.addEventListener("click", function () {
    checkAnswer();
    // removeForm();
    presentQuestion();
});