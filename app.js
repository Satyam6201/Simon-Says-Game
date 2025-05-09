let gameseq = [];
let userseq = [];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");
let btns = ["yellow", "red", "green", "purple"];
let modeBtn = document.getElementById("mode-toggle");
let restartBtn = document.getElementById("restartBtn");

// Start game
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 200);
}

function gameflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 200);
}

function levelUp() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randomind = Math.floor(Math.random() * 4); // Fix: should be 0-3
    let randomcolor = btns[randomind];
    let randombtn = document.querySelector(`.${randomcolor}`);
    btnflash(randombtn);
    playSound(randomcolor);
    gameseq.push(randomcolor);
    console.log("Game Seq:", gameseq);
}

function checkAns(ind) {
    if (userseq[ind] === gameseq[ind]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerHTML = `❌ Game Over! Your Score: <b>${level}</b>. Press Any Key to Restart.`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => document.body.classList.toggle("dark", false), 200);
        playSound("wrong");
        reset();
    }
}

function btnpress() {
    let btn = this;
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    gameflash(btn);
    playSound(usercolor);
    checkAns(userseq.length - 1);
}

// Add listeners to all buttons
let allbtn = document.querySelectorAll(".btn");
allbtn.forEach(btn => btn.addEventListener("click", btnpress));

// Reset game
function reset() {
    gameseq = [];
    userseq = [];
    level = 0;
    started = false;
}

// Mode toggle
modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    modeBtn.innerText = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Restart button
restartBtn.addEventListener("click", () => {
    reset();
    h3.innerText = "Game Reset. Press Any Key to Start";
});
