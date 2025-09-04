let sequence=[];
let userSequence=[];
let btns=["red","green","yellow","purple"];
//let btn = document.querySelectorAll(".btn");

let started=false;
let level=0;
let h2=document.querySelector("h2");
let highScore = localStorage.getItem("highScore") || 0;  // get from localStorage or 0
let highScoreDisplay = document.getElementById("highScore");  // connect to <p id="highScore">

highScoreDisplay.innerText = "High Score: " + highScore;  // show high score on load

document.addEventListener("keypress",function(){
    if(started===false){
        started=true;
        console.log("Game Started");
        sequence=[];
        levelUp();


    }});

    function gameFlash(btn){
     btn.classList.add("flash");  
       setTimeout(function()  {
        btn.classList.remove("flash");
       }, 300); 
    }

    function userFlash(btn){
     btn.classList.add("userflash");  
       setTimeout(function()  {
        btn.classList.remove("userflash");
       }, 300);
    }

    function levelUp(){
        userSequence=[];
        level++;
        h2.innerText="Level "+level;

        let randIdx=Math.floor(Math.random()*4);
        let randomColor=btns[randIdx];
        let randomBtn=document.querySelector(`.${randomColor}`);
        console.log("sequence");
        sequence.push(randomColor);
        console.log(sequence);
        gameFlash(randomBtn);
        
    }

    function checkAnswer(idx){
        
        if(userSequence[idx]===sequence[idx]){
            if(userSequence.length===sequence.length){
                setTimeout(levelUp,1000);

            }

    }
    else{
        if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
      highScoreDisplay.innerText = "High Score: " + highScore;
    }
        h2.innerHTML=`Game Over, your level <b>'${level}'<b> <br>Press any key to restart`;
        let body=document.querySelector("body");
        body.style.backgroundColor="red";
        setTimeout(function(){
            body.style.backgroundColor="white";
        },150);
        started=false;
        
        level=0;
        sequence=[];

    }
    
}


    function btnpress(){
        
        console.log(this);
        userFlash(this);
        usercolor=this.getAttribute("id");
        userSequence.push(usercolor);
        checkAnswer(userSequence.length-1);
    }
    let allbtn = document.querySelectorAll(".btn");
    for (btn of allbtn){
        btn.addEventListener("click",btnpress);
     } 