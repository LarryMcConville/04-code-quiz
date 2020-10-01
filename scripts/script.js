var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start");
var submitButton = document.getElementById("submit");
var questionElement = document.getElementById("question");

var playerAnswer = '';
var correctAnswer = '';
var playerScore = 0;
var secondsLeft = 120;
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
    // secondsLeft = 1;
    // var imgEl = document.createElement("img");
    // imgEl.setAttribute("src", "images/image_1.jpg");
    // mainEl.appendChild(imgEl);

}

function presentQuestion() {
    //remove previously built form so we can load new radio buttons.
    //removeForm();
    if (nextQuestion < questionArray.length) {
        correctAnswer = questionArray[nextQuestion].correctAnswer;
        questionElement.textContent = questionArray[nextQuestion].question;
        console.log(questionArray[nextQuestion].question);
        // console.log("question loop question  " + nextQuestion);
        // console.log('presentQuestion function correct answer ' + correctAnswer);
        presentAnswers();
    } else {
        quizOver();
    }
    //nextQuestion++;

}

function presentAnswers() {
    appendForm();

    //loop through answers and build a dynamic list of n answers.
    for (var i = 0; i < Object.keys(questionArray[nextQuestion].answers).length; i++) {
        questionObjectKey = Object.keys(questionArray[nextQuestion].answers)[i];
        questionObjectValue = Object.values(questionArray[nextQuestion].answers)[i];

        appendRadioControl(questionObjectKey, questionObjectValue);
        // console.log("answer loop question  " + nextQuestion);
        console.log(questionObjectKey, questionObjectValue);

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
    //compare user selection before loading next question.
    //compare playerAnswer to correctAnswer.
    //if correct playerScore++
    //if not correct secondsLeft--

    console.log('checkAnswer function, correct answer is  ' + correctAnswer);

    // console.log("i'm in check answer loop  " + nextQuestion);
    for (var i = 0; i < Object.keys(questionArray[nextQuestion].answers).length; i++) {
        key = Object.keys(questionArray[nextQuestion].answers)[i];
        value = Object.values(questionArray[nextQuestion].answers)[i];
        console.log(" What object key am I?  " + key);
        console.log(" What object value am I?  " + value);
        console.log(" What is the correct answer?  " + correctAnswer);
        console.log(document.getElementById(key).checked);
        if (document.getElementById(key).checked === true) {
            if (key === correctAnswer) {
                playerScore++;
            } else {
                secondsLeft -= 10;
            }
        };
    }
    console.log("Player Score =  " + playerScore);
    nextQuestion++;
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
    removeForm();
    presentQuestion();
});