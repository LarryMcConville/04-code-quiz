var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start");
var submitButton = document.getElementById("submit");
var questionElement = document.getElementById("question");
// var answerElement = document.getElementById("answer");
// var answerClassEl = document.querySelector(".answers");
// console.log(answerClassEl);

var playerAnswer = '';
var playerScore = 0;
var secondsLeft = 15;
var nextQuestion = 0;
var questionObjectKey = '';
var questionObjectValue = '';

var questionArray = [
    {
        question: "What is 10/2?",
        answers: {
            a: '3',
            b: '5',
            c: '115'
        },
        correctAnswer: 'b'
    },
    {
        question: "What is 30/3?",
        answers: {
            a: '6',
            b: '7',
            c: '10'
        },
        correctAnswer: 'c'
    },
    {
        question: "What is 0*7?",
        answers: {
            a: '0',
            b: '1',
            c: '7',
            d: '-7'
        },
        correctAnswer: 'a'
    },
    {
        question: "Is 0 equal to null?",
        answers: {
            a: true,
            b: false
        },
        correctAnswer: 'b'
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
    // secondsLeft = 0;
    // var imgEl = document.createElement("img");
    // imgEl.setAttribute("src", "images/image_1.jpg");
    // mainEl.appendChild(imgEl);

}

function presentQuestion() {

    if (nextQuestion < questionArray.length) {
        console.log(questionArray[nextQuestion].question);
        questionElement.textContent = questionArray[nextQuestion].question;
        // appendAnswerClass();
        presentAnswers();
    } else {
        quizOver();
    }
    nextQuestion++;
}

function presentAnswers() {
    //loop through answers and build a dynamic list of n answers.
    for (var i = 0; i < Object.keys(questionArray[nextQuestion].answers).length; i++) {
        questionObjectKey = Object.keys(questionArray[nextQuestion].answers)[i];
        questionObjectValue = Object.values(questionArray[nextQuestion].answers)[i];

        buildRadioControl(questionObjectKey, questionObjectValue);

    }
    checkAnswers();
    // removeAnswerClass();

};

function checkAnswers() {
    console.log(questionArray[nextQuestion].correctAnswer);
};

function appendAnswerClass() {
    //build div class answers
    //this is being built with each answer iteration
    //it needs to be moved to the question function
    var answersEl = document.createElement("div");
    answersEl.setAttribute("class", "answers");
    document.querySelector(".container").appendChild(answersEl);
};

function removeAnswerClass() {
    //remove previous answers
    var removeRadio = document.querySelector(".answers");
    removeRadio.remove();
    console.log(removeRadio);
};

function buildRadioControl(item, choice) {
    var labelEl = document.createElement("label");
    labelEl.setAttribute("class", "radio");
    //answersEl.appendChild(labelEl);
    document.querySelector(".answers").appendChild(labelEl);
    labelEl.textContent = item + ' : ' + choice;

    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "radio");
    inputEl.setAttribute("name", "answer");
    labelEl.appendChild(inputEl);

}

startButton.addEventListener("click", function () {
    setTimer();
    presentQuestion();
    startButton.style.display = "none";
    submitButton.style.display = "inline";
});

submitButton.addEventListener("click", presentQuestion);