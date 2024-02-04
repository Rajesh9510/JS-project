const apiUrl = "https://opentdb.com/api.php?amount=1&category=9&type=multiple";
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const newGameButton = document.getElementById('new-game-btn');

let score = 0;
let questionCount = 0;
let isAnswerSelected = false; 

nextButton.addEventListener('click', getNextQuestion);
newGameButton.addEventListener('click', startNewGame);

function init() {
  fetchQuestion();
}

async function fetchQuestion() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const question = data.results[0].question;
    const answers = data.results[0].incorrect_answers;
    const correctAnswer = data.results[0].correct_answer;

    displayQuestion(question, answers, correctAnswer);
    isAnswerSelected = false; 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayQuestion(question, answers, correctAnswer) {
  questionElement.innerText = question;

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }

  const shuffledAnswers = shuffleArray([...answers, correctAnswer]);

  shuffledAnswers.forEach((answer) => {
    const button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = answer;
    button.addEventListener('click', () => checkAnswer(answer, correctAnswer));
    answerButtons.appendChild(button);
  });

  questionCount++;
}

function checkAnswer(selectedAnswer, correctAnswer) {
  const answerButtonsArray = Array.from(answerButtons.children);

  answerButtonsArray.forEach((button) => {
    button.disabled = true;
    if (button.innerText === correctAnswer) {
      button.style.backgroundColor = 'green';
    } else {
      button.style.backgroundColor = 'red';
    }
  });

  if (selectedAnswer === correctAnswer) {
    score++;
  }

  isAnswerSelected = true; 

  if (questionCount === 5) {
    displayResult();
  }
}

function getNextQuestion() {
  if (isAnswerSelected || questionCount === 0) {
    fetchQuestion();
    resetButtons();
  } else {
    alert('Please select an option before proceeding to the next question.');
  }
}

function displayResult() {
  resultElement.innerText = `Your Score: ${score} out of 5`;
  nextButton.disabled = true;
}

function startNewGame() {
  score = 0;
  questionCount = 0;
  resultElement.innerText = '';
  nextButton.disabled = false;
  fetchQuestion();
  resetButtons();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function resetButtons() {
  const answerButtonsArray = Array.from(answerButtons.children);

  answerButtonsArray.forEach((button) => {
    button.style.backgroundColor = '';
    button.disabled = false;
  });
}


init();
