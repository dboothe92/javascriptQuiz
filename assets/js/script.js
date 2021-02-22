let startButtonEl = document.querySelector('#start-btn');
let startTextEl = document.querySelector('#starter-text');
let answerListEl = document.querySelector('#answer-list');
let questionEl = document.querySelector('#question-text');
let timeLeftEl = document.querySelector('#timer');

//keeps track of current question and shuffles my array
let shuffledQuestions, currentQuestionIndex

//setting initial time
let timeLeft = 60;

//Array of questions
let questions = [
    {
        q: 'Question 1',
        a: [
            {text: 'Answer1-1', correct: true},
            {text: 'Answer2-1', correct: false},
            {text: 'Answer3-1', correct: false},
            {text: 'Answer4-1', correct: false}
        ]
    },{
        q: 'Question 2',
        a: [
            {text: 'Answer1-2', correct: true},
            {text: 'Answer2-2', correct: false},
            {text: 'Answer3-2', correct: false},
            {text: 'Answer4-2', correct: false}
        ]
    },{
        q: 'Question 3',
        a: [
            {text: 'Answer1-3', correct: true},
            {text: 'Answer2-3', correct: false},
            {text: 'Answer3-3', correct: false},
            {text: 'Answer4-3', correct: false}
        ]
    },{
        q: 'Question 4',
        a: [
            {text: 'Answer1-4', correct: true},
            {text: 'Answer2-4', correct: false},
            {text: 'Answer3-4', correct: false},
            {text: 'Answer4-4', correct: false}
        ]
    },{
        q: 'Question 5',
        a: [
            {text: 'Answer1-5', correct: true},
            {text: 'Answer2-5', correct: false},
            {text: 'Answer3-5', correct: false},
            {text: 'Answer4-5', correct: false}
        ]
    },
];

function countdown() {
    //displays countdown on screen
    let timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            timeLeftEl.textContent = timeLeft;
            //decrement time by 1 second
            timeLeft--;
        } else {
            timeLeftEl.textContent = 0;
            clearInterval(timeInterval);
            return;
        }

        //stops timer once quiz is complete
        if (currentQuestionIndex >= questions.length) {
            clearInterval(timeInterval);
            return;
        };
    }, 1000);
};

//This is what happens when you click the Start Quiz button
function startGame() {
    //shuffle questions
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    startTextEl.remove(); //removes starter text
    startButtonEl.remove(); //remove the start quiz button

    //Start Timer
    countdown();

    answerListEl.classList.remove('hide'); //show answer buttons
    setNextQuestion();
};

//Shows each question
 function setNextQuestion() {
     //checks if there are any more questions and can end the quiz.
     if (currentQuestionIndex >= questions.length) {
        alert("That's all!");
        clearScreen();
        writeHighScore();
     };
     showQuestion(shuffledQuestions[currentQuestionIndex]);
 };

 //Changes the text of the question and buttons
 function showQuestion (questions) {
     resetButtons();
    questionEl.textContent = questions.q;

    //Create a button for each answer(a) in the array
    questions.a.forEach(a => {
        let answerButton = document.createElement('li');
        answerButton.innerHTML = '<button>'+ a.text +'</button>'
        answerListEl.appendChild(answerButton);

        //Make buttons clickable
        answerButton.addEventListener('click', () => {
            //Check if Answer is correct
            if (a.correct) {
                alert("That is correct!");
                currentQuestionIndex++;
                setNextQuestion();
            } else {
                timeLeft -= 10;
                alert("That is incorrect");
            };
        });
    });
 };

function resetButtons() {
    while (answerListEl.firstChild) {
        answerListEl.removeChild(answerListEl.firstChild);
    };
};

function clearScreen() {
     document.querySelector("#main").remove();
};

function writeHighScore() {
    let highScorePage = document.querySelector("#qAndA").appendChild(document.createElement("div"));
    highScorePage.setAttribute("id", "main");
    let highScorePrompt = document.createElement("h1");
    highScorePrompt.innerHTML("<input name = 'hsPrompt'></input>", "<label name = 'hsPrompt'>BATMAN</label>")
};
//Starts Quiz
startButtonEl.addEventListener('click', startGame);