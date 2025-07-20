// Element Selectors
const modeToggle = document.getElementById("mode-toggle");
const audioToggle = document.getElementById("audio-toggle");
const body = document.body;
const h3 = document.getElementById("status");
const scoreBox = document.getElementById("scoreBox");
const highScoreBox = document.getElementById("highScoreBox");
const restartBtn = document.getElementById("restartBtn");
const startBtn = document.getElementById("startBtn");
const winMessage = document.getElementById("winMessage");
const instructionsModal = document.getElementById("instructionsModal");
const closeModal = document.getElementById("closeModal");

// Game Variables
let gameseq = [];
let userseq = [];
let btns = ["yellow", "green", "red", "purple"];
let level = 0;
let started = false;
let isAudioOn = true;
let highScore = localStorage.getItem("simonHighScore") || 0;

// Update UI
highScoreBox.innerText = `High Score: ${highScore}`;

// Sound Files
const sounds = {
  red: new Audio("sounds/red.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
  green: new Audio("sounds/green.mp3"),
  purple: new Audio("sounds/purple.mp3"),
  wrong: new Audio("sounds/wrong.mp3"),
};

// Handle Mode Toggle
modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
});

// Handle Audio Toggle
audioToggle.addEventListener("click", () => {
  isAudioOn = !isAudioOn;
  audioToggle.innerText = isAudioOn ? "🔊 Sound On" : "🔇 Sound Off";
});

// Flash animation for game-generated sequence
function btnflash(btn) {
  const color = btn.id;
  if (isAudioOn) sounds[color]?.play();
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

// Flash animation for user click
function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 300);
}

// Game Start (Keyboard or Button)
document.addEventListener("keypress", () => {
  if (!started) {
    startGame();
  }
});

startBtn.addEventListener("click", () => {
  if (!started) {
    startGame();
  }
});

// Level Up Logic
function levelUp() {
  userseq = [];
  level++;
  h3.innerText = `Level ${level}`;
  scoreBox.innerText = `Current Level: ${level}`;

  // Check for win
  if (level === 20) {
    winMessage.classList.remove("hidden");
    gameOver();
    return;
  }

  // Random color
  const randomInd = Math.floor(Math.random() * 4);
  const randomColor = btns[randomInd];
  const randomBtn = document.querySelector(`.${randomColor}`);
  gameseq.push(randomColor);

  setTimeout(() => btnflash(randomBtn), 500);
}

// Start Game Logic
function startGame() {
  winMessage.classList.add("hidden");
  resetGame();
  started = true;
  levelUp();
}

// Check user's sequence
function checkAns(index) {
  if (userseq[index] === gameseq[index]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    gameOver();
  }
}

// Game Over
function gameOver() {
  if (isAudioOn) sounds.wrong.play();
  body.classList.add("game-over");
  h3.innerText = `Game Over! You reached Level ${level}. Press Start or any key to retry.`;
  scoreBox.innerText = `Current Level: 0`;
  updateHighScore();
  setTimeout(() => body.classList.remove("game-over"), 300);
  resetGame();
}

// Reset Game State
function resetGame() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}

// High Score Logic
function updateHighScore() {
  if (level > highScore) {
    highScore = level;
    localStorage.setItem("simonHighScore", highScore);
    highScoreBox.innerText = `High Score: ${highScore}`;
  }
}

// User Click
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!started) return;
    let btnColor = btn.id;
    userseq.push(btnColor);
    userflash(btn);
    if (isAudioOn) sounds[btnColor]?.play();
    checkAns(userseq.length - 1);
  });
});

// Restart Button
restartBtn.addEventListener("click", () => {
  if (!started) {
    startGame();
  }
});

// Modal Control
window.addEventListener("load", () => {
  instructionsModal.classList.remove("hidden");
});
closeModal.addEventListener("click", () => {
  instructionsModal.classList.add("hidden");
});
