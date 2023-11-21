const container = document.querySelector(".text-container");
const questionBox = document.querySelector(".question");
const choicesSelection = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
var check = false;
var timer = 60;
const liveTimer = document.querySelector(".liveTimer");
var clock;
var highscore = 0;
const score = document.querySelector(".highScore");
var scores;
var endGameEl = document.querySelector("#endGame");
var runningGame = document.querySelector("#runningGame");
var submitBtn = document.querySelector("#submit-btn");
var initialsEl = document.querySelector("#initials");

const quiz = [
  {
    question: "What is used to build styling of a website?",
    choices: ["CSS", "HTML", "javascript", "Chicken"],
    answer: "CSS",
  },
  {
    question: "What is used to build backend functions?",
    choices: ["CSS", "HTML", "javascript", "Chicken"],
    answer: "javascript",
  },
  {
    question: "What is used to fetch data?",
    choices: ["CSS", "HTML", "javascript", "json"],
    answer: "json",
  },
  {
    question: "What is used for writing loops?",
    choices: ["CSS", "HTML", "javascript", "Chicken"],
    answer: "javascript",
  },
];
// variables
let currentQuestionIndex = 0;

const showQ = () => {
  const questionDetails = quiz[currentQuestionIndex];
  questionBox.textContent = questionDetails.question;

  choicesSelection.textContent = "";
  // Loop to cycle through questions
  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement("div");
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add("choice");
    choiceDiv.onclick = checkAnswer;
    choicesSelection.appendChild(choiceDiv);
  }
};

// check answers
const checkAnswer = (event) => {
  console.log(event.target.textContent);
  const selectedChoice = document.querySelector("choice.selected");
  if (event.target.classList.contains("selected")) {
    event.target.classList.remove("selected");
  } else {
    event.target.classList.add("selected");
    if (event.target.textContent === quiz[currentQuestionIndex].answer) {
      check = true;
    } else {
      check = false;
    }
  }
};

function runningTimer() {
  clock = setInterval(function () {
    liveTimer.textContent = "Timer: " + timer;
    timer--;
    if (timer <= 0) {
      clearInterval(clock);
      // runEndGame function()
    }
  }, 1000);
}
function scoreBoard() {
  if (check === false) {
    highscore--;
  } else {
    highscore++;
  }
  score.textContent = "score: " + highscore;
}
// Start game
function startGame() {
  endGameEl.setAttribute("style", "display: none;");
  runningGame.setAttribute("style", "display: block;");
  showQ();
  runningTimer();
}

// End game
function endGame() {
  endGameEl.setAttribute("style", "display: block;");
  runningGame.setAttribute("style", "display: none;");
}

// event listener to save to Local storage
submitBtn.addEventListener("click", () => {
    var initials = initialsEl.value;
    if (initials === ""){
        alert("Please enter Initials");
        return
    }
    submitBtn.setAttribute("style", "display: none;");
  var scoresJson = localStorage.getItem("localScores");
  if (scoresJson) {
    scores = JSON.parse(scoresJson);
    scores.push(highscore + " By: " + initials);
  } else {
    scores = [highscore + " By: " + initials];
  }
  localStorage.setItem("localScores", JSON.stringify(scores));
  document.location.href = 'scores.html'
});

// Next button, to get through q's
startGame();
nextBtn.addEventListener("click", () => {
  console.log(check);
  if (check === false) {
    timer -= 10;
    alert("Wrong!");
  } else {
    timer += 5;
    alert("Correct");
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQ();
  } else {
    endGame();
  }
  scoreBoard();
});
