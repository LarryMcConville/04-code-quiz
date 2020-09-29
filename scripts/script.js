var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start");
var submitButton = document.getElementById("submit");
var questionElement = document.getElementById("question");
var answerElement = document.getElementById("answer");

var playerAnswer = '';
var playerScore = 0;
var secondsLeft = 3;
var nextQuestion = 0;

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
            a: '3',
            b: '5',
            c: '10'
        },
        correctAnswer: 'c'
    }
];

var highScoreArray = [];

function setTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }

    }, 1000);
}

function sendMessage() {
    timerElement.textContent = "Game Over";

    // var imgEl = document.createElement("img");

    // imgEl.setAttribute("src", "images/image_1.jpg");
    // mainEl.appendChild(imgEl);

}

//function quizQuestions() {
// console.log(questionArray);
//for (var i = 0; i < questionArray.length; i++) {
//questionElement.textContent = questionArray[i].question;
//console.log(questionArray[i].question);
//for (answers in questionArray[i].answers) {
//load answer radio buttons
//console.log(questionArray[i].answers);
//     console.log(answerElement.textContent = questionArray[i].answers[a]);
//     answerElement.textContent = questionArray[i].answers[a];
//}

//console.log(questionArray[i].correctAnswer);

//submitButton.addEventListener("click", function () {
//i++
//});

//click submit button to:
//capture response and perform evaluation
//update the score or decrement the counter as appropriate
//i++
//}
//}

function displayQuestions() {

    if (nextQuestion < questionArray.length) {
        console.log(questionArray[nextQuestion].question);
        console.log(questionArray[nextQuestion].answers);
        questionElement.textContent = questionArray[nextQuestion].question;
        //loop throught answers and build dynamic list of n answers.
        for (var i = 0; i < questionArray[nextQuestion].answers.length; i++) {
            console.log(answers[i]);
            //build answer elements here.
        }
        console.log(questionArray[nextQuestion].correctAnswer);

        //display question
        //display answer a
        //display answer b
        //display answer c
    } else {
        //if last question then hide submit button.
        submitButton.style.display = "none";
    }
    nextQuestion++;
}

function formatQuestions() {
    //need to load the first question when we enter, other will load with submit.
    submitButton.addEventListener("click", function () {
        displayQuestions();
    })

    //check user answer
    //display happy/sad message
    //increment score if correct
    //capture response and perform evaluation
    //update the score or decrement the counter as appropriate
}


startButton.addEventListener("click", function () {
    setTimer();
    // quizQuestions();
    formatQuestions();
    startButton.style.display = "none";
    submitButton.style.display = "inline";
    //Hide start button and swap out for submit button
});
