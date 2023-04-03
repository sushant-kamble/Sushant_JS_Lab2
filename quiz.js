//3 params, questions, score, currQuestIndex
function Quiz(questions) {
  this.score = 0;
  this.currQuestIndex = 0;
  this.questions = questions;
}

Quiz.prototype.getCurrentQuestionIndex = function () {
  return this.questions[this.currQuestIndex];
};

Quiz.prototype.isEnded = function () {
  return this.currQuestIndex === this.questions.length;
};

//Function will 3 things
// 1. Validate the answer
// 2. Update the score
// 3. Increment the current index
Quiz.prototype.validateAnswerAndUpdateScore = function (choice) {
  let question = this.getCurrentQuestionIndex();
  if (question.answer === choice) {
    this.score++;
  }
  this.currQuestIndex++;
};

function Question(text, options, answer) {
  this.text = text;
  this.options = options;
  this.answer = answer;
}

let questions = [
  new Question(
    "Commonly used data types DO NOT include:",
    ["strings", "booleans", "alerts", "numbers"],
    "alerts"
  ),
  new Question(
    "The condition in an if / else statement is enclosed within ____.",
    ["quotes", "curly brackets", "parentheses", "square brackets"],
    "parentheses"
  ),
  new Question(
    "What language is used for styling web pages?",
    ["HTML", "JQuery", "CSS", "JavaScript"],
    "CSS"
  ),
  new Question(
    "Which of the following is not a data type?",
    ["string", "boolean", "function", "object"],
    "function"
  ),
  new Question(
    "Arrays in JavaScript can be used to store ____.",
    ["numbers and strings", "other arrays", "booleans", "all of the above"],
    "all of the above"
  ),
  new Question(
    "String values must be enclosed within ____ when being assigned to variables.",
    ["commas", "curly brackets", "quotes", "parentheses"],
    "quotes"
  ),
  new Question(
    "A very useful tool used during development and debugging for printing content to the debugger is:",
    ["JavaScript", "terminal/bash", "for loops", "console.log"],
    "console.log"
  )
];

function showScores() {
  console.log("Scores :-", quiz.score);
  let gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += `<h2 id='score'> Your Scores:- ${
    quiz.score
  } and mark percentage is :- ${(quiz.score / questions.length) * 100}% </h1>`;
  document.getElementById("quiz").innerHTML = gameOverHTML;
}

function loadQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    //Show current question!
    let curQuest = quiz.getCurrentQuestionIndex();
    if (curQuest.text) {
      let questionEle = document.getElementById("question");
      questionEle.innerHTML = curQuest.text;

      //Show current question's options
      let options = curQuest.options;
      for (var i = 0; i < options.length; i++) {
        let currOption = options[i];
        let eachOptElement = document.getElementById("choice" + i);
        eachOptElement.innerHTML = currOption;
        handleOptionBtn("btn" + i, currOption);
      }
    } 
    showProgress();
  }
}

function showProgress() {
  let curQuestNumber = quiz.currQuestIndex + 1;
  let progress = document.getElementById("progress");
  progress.innerHTML = `Question ${curQuestNumber} of ${quiz.questions.length}`;
}

function handleOptionBtn(btnId, choice) {
  let btn = document.getElementById(btnId);
  btn.onclick = () => {
    quiz.validateAnswerAndUpdateScore(choice);
    loadQuestions();
  };
}

let quiz = new Quiz(questions);

//Load questions
loadQuestions();
