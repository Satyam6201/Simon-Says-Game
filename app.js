const modeToggle = document.getElementById("mode-toggle");
const body = document.body;
const h3 = document.querySelector("h3");
const scoreBox = document.getElementById("scoreBox");
const restartBtn = document.getElementById("restartBtn");

let gameseq = [];
let userseq = [];
let btns = ["yellow", "green", "red", "purple"];
let level = 0;
let started = false;

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
});

// Flash animation for game-generated sequence
function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

// Flash animation for user click
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 300);
}

// Start the game
document.addEventListener("keypress", () => {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Level Up Logic
function levelUp() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;
    scoreBox.innerText = `Current Level: ${level}`;

    const randomInd = Math.floor(Math.random() * 4);
    const randomColor = btns[randomInd];
    const randomBtn = document.querySelector(`.${randomColor}`);

    gameseq.push(randomColor);
    setTimeout(() => {
        btnflash(randomBtn);
    }, 500);
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

function gameOver() {
    h3.innerText = `Game Over! You reached Level ${level}. Press any key to restart.`;
    body.classList.add("game-over");
    scoreBox.innerText = `Current Level: 0`;

    setTimeout(() => {
        body.classList.remove("game-over");
    }, 300);

    resetGame();
}

function resetGame() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        let btnColor = btn.classList[1];
        userseq.push(btnColor);
        userflash(btn);
        checkAns(userseq.length - 1);
    });
});

restartBtn.addEventListener("click", () => {
    if (!started) {
        started = true;
        levelUp();
    }
});
