let gameseq = [];
let userseq = [];

let started = false;
let level = 0;
let h3 = document.querySelector("h3");
let btns = ["yellow" , "red" , "green" , "purple"];

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game is started:-");
        started = true
        levelUp();
    };
});

function btnflash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash");
}, 300);
};

function gameflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },300);
};

function levelUp(){
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randomind = Math.floor(Math.random()*3);
    let randomcolor = btns[randomind];
    let randombtn = document.querySelector(`.${randomcolor}`);
    btnflash(randombtn);
    gameseq.push(randomcolor);
    console.log(gameseq);
    gameflash(randombtn);
}

function checkAns(ind){
    if(userseq[ind] === gameseq[ind]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUp ,1000);
        };
    }
    else{
        h3.innerHTML = `Game over! Your Score is <b>${level}</b> Press Any key To Start`;
        document.querySelector("body").style.backgroundColor ="red"
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor ="white" 
        }, 200);
        reset();
    };
};

function btnpress(){
    let btn = this;
    gameflash(btn);
    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length - 1);
};

let allbtn = document.querySelectorAll(".btn");
for(btn of allbtn){
    btn.addEventListener("click" , btnpress);
};

function reset(){
    gameseq = [];
    userseq = [];
    level = 0;
    started = false;
};