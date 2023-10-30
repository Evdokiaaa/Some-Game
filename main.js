import {
  lvlOne,
  lvlTwo,
  lvlThree,
  lvlFour,
  lvlFive,
  lvlSix,
  lvlSeven,
  lvlEight,
} from "./words.js";

const LEVELS = [
  lvlOne,
  lvlTwo,
  lvlThree,
  lvlFour,
  lvlFive,
  lvlSix,
  lvlSeven,
  lvlEight,
];

//rules
const rules = document.querySelector(".rules");
const playBtn = document.querySelector(".play__btn");
//game
const gameField = document.querySelector(".game__field");
const userInput = document.querySelector(".game__field-input");
const wordToGuess = document.querySelector(".game__field-word");
const submitBtn = document.querySelector(".game__field-submit");
const rerollBtn = document.querySelector(".game__field-reroll");

const levelOutput = document.querySelector("#level");
const scoreOutput = document.querySelector("#score");
const attemptsOutput = document.querySelector("#attempts");
const info = document.querySelector(".info");

let level = 1;
let score = 0;
let attempts = 0;
let correct = 0;
let guess;

const startGame = () => {
  rules.classList.add("hidden");
  gameField.classList.remove("hidden");
};
const reset = () => {
  level = 1;
  score = 0;
  attempts = 0;
};
const updateBoard = () => {
  levelOutput.textContent = level;
  scoreOutput.textContent = score;
  attemptsOutput.textContent = attempts;
};
const randomWord = (lvl) => {
  const word = lvl[Math.floor(Math.random() * lvl.length) + 1];
  guess = word;
  console.log(word);
  return word;
};
const shuffleWord = (word) => {
  return word
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};
const setWord = (lvl) => {
  switch (lvl) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 8: {
      wordToGuess.textContent = shuffleWord(randomWord(LEVELS[lvl - 1]));
      break;
    }
    default: {
      reset();
      alert("You WIN!");
    }
  }
};
function checkAnswer(userWord) {
  const MAX_CORRECT_ANSWERS = 3;
  const MAX_ATTEMPTS = 2;
  if (correct === MAX_CORRECT_ANSWERS) {
    level += 1;
    correct = 0;
    attempts = 0;
  }
  if (attempts === MAX_ATTEMPTS) {
    gameField.classList.add("hidden");
    retryBlock.classList.remove("hidden");
  }
  if (userWord === guess) {
    info.innerHTML = `<span class='correct'>CORRECT</span>`;
    score += 1;
    correct += 1;
    attempts = 0;
    userInput.readOnly = true;
    setTimeout(() => {
      info.innerHTML = "";
      userInput.value = "";
      userInput.readOnly = false;
      setWord(level);
    }, 1000);
  } else {
    info.innerHTML = `<span class='incorrect'>INCORRECT</span>`;
    score = score == 0 ? 0 : (score -= 1);
    attempts += 1;
  }
  updateBoard();
}

let rerollCounter = 3;
function updateRerollBtn() {
  if (rerollCounter !== 0) {
    rerollCounter--;
    const currentLevel = LEVELS[level - 1];
    wordToGuess.textContent = shuffleWord(randomWord(currentLevel));
    rerollBtn.querySelector("span").textContent = rerollCounter;
  }
}

function newGame() {
  reset();
  console.log("New Game Started");

  retryBlock.classList.add("hidden");
  gameField.classList.remove("hidden");

  info.innerHTML = "";

  updateBoard();
  setWord(level);
}
function enterCheck(e) {
  if (!gameField.classList.contains("hidden") && userInput.readOnly == false) {
    if (e.key === "Enter") {
      checkAnswer(userInput.value.toLowerCase());
    }
  }
}
function createRetryBlock() {
  const retryMessage = document.createElement("p");
  retryMessage.className = "retry hidden";
  retryMessage.textContent = "Sorry. You are out of chances.";

  const retryButton = document.createElement("button");
  retryButton.className = "retry__button";
  retryButton.textContent = "Retry";

  retryButton.addEventListener("click", newGame);

  retryMessage.appendChild(retryButton);

  const mainElement = document.querySelector(".main");
  mainElement.appendChild(retryMessage);
  return retryMessage;
}

window.addEventListener("keydown", enterCheck);
playBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", () => {
  checkAnswer(userInput.value.toLowerCase());
});
rerollBtn.addEventListener("click", updateRerollBtn);

//Retry block

const retryBlock = createRetryBlock();
setWord(level); //Ставим слово
