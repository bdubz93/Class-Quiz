let timeEl = document.querySelector(".time");
let scoresEl = document.getElementById("scores");
let currentScoreEl = document.getElementById("currentScoreTitle");
let currentScoreClass = document.querySelector(".currentscore");
let currentscoreID = document.getElementById("currentscoreID");
let mainscreen = document.getElementById("mainscreen")
let btnStart = document.querySelector("#btnStart");
let scorelist = document.querySelector("#scorelist");
let progressbar = document.querySelector(".progressbar");
let HighScoreForm = document.querySelector("#letHighScore");
let showscore = false;
let secondsLeft = 120;
let FinalScore = {
    initials: "",
    time: 0,
    correct: 0
}

//Questions
let finishGame=false;
let letQuiz = [{
    "question":"Inside which <> HTML element do we put the JavaScript?",
    "choice1":"scripting",
    "choice2":"js",
    "choice3":"javascript",
    "choice4":"script",
    "correct": 4,
    "answered":false
},
{
    "question":"Which event occurs when the user clicks on an HTML element?",
    "choice1":"onclick",
    "choice2":"onmouseover",
    "choice3":"onmouseclick",
    "choice4":"onchange",
    "correct": 1,
    "answered":false
},
{
    "question":"Which of the following is not JavaScript Data Types?",
    "choice1":"Undefined",
    "choice2":"Number",
    "choice3":"Boolean",
    "choice4":"Float",
    "correct": 4,
    "answered":false
},
{
    "question":"Which of the following is correct about features of JavaScript?",
    "choice1":"It can not Handling dates and time",
    "choice2":"JavaScript is a object-based scripting language",
    "choice3":"JavaScript is not interpreter based scripting language",
    "choice4":"All of the above",
    "correct": 2,
    "answered":false
},
{
    "question":"JavaScript is designed for following purpose",
    "choice1":"to style HTML pages",
    "choice2":"to execute Queries related to databases on a server",
    "choice3":"to add interactivity to html pages",
    "choice4":"All of the above",
    "correct": 4,
    "answered":false
},
{
    "question":"What are the types of Pop up boxes available in JavaScript?",
    "choice1":"Alert",
    "choice2":"Prompt",
    "choice3":"Confirm",
    "choice4":"All of the above",
    "correct": 4,
    "answered":false
}
];
letHighScore = JSON.parse(localStorage.getItem("letHighScore"));

function sendMessage(letMessage) {
    if (letMessage == "finish") {
        finishGame = true;
    }
    if (finishGame) {
          timeEl.textContent = "";
    } else {
          timeEl.textContent = letMessage;
    }
}
// Displays message if quiz failed
function printFail() {
    FinalScore.time = secondsLeft;
    FinalScore.correct = 0;

    for (let i = 0; i < letQuiz.length; i++) {
        if(letQuiz[i].answered == letQuiz[i].correct) {
            FinalScore.correct++;
        }
    }
    let letText =  
    `<h2>GAME OVER</h2>
        <p>
            You failed to complete the Quiz in the time allowed!
        </p>
        <p>You scored `+FinalScore.correct+` out of `+letQuiz.length+`<p>
        <br>
        <a href="javascript:location.reload()" class="start" Id="btnStart">Try Again</a>
        `;
    mainscreen.innerHTML = letText;
}

//Starts countdown
function startTime() {
    // Sets interval
    let timerInterval = setInterval(function() {
      timeEl.textContent = secondsLeft + " seconds left";
      secondsLeft -=1;
      if(secondsLeft < 1 || finishGame) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        sendMessage("Game Over");
        if(secondsLeft < 1) {
            printFail();
        }
      }
    }, 1000);
    return(secondsLeft);
}


// Saves score to local storage
function saveScore() {
    let tempText = initialsInput.value.trim();
 
    if (tempText === "") { return; }
    FinalScore.initials = tempText;
    letHighScore.push(FinalScore.time+"s "+FinalScore.initials+" "+FinalScore.correct+"/"+letQuiz.length);
    localStorage.setItem("letHighScore", JSON.stringify(letHighScore));
}
//Clears scores in local storage
function clearScore() {
    letHighScore=[];
    localStorage.setItem("letHighScore", JSON.stringify(letHighScore));
}

//Displays score and a message when quiz completed
function printScore() {
    FinalScore.time = secondsLeft;
    if (secondsLeft < 1) {
        printFail();
        return;
    }
    FinalScore.correct = 0;

    for (let i = 0; i < letQuiz.length; i++) {
        if(letQuiz[i].answered == letQuiz[i].correct) {
            FinalScore.correct++;
        }
    }
    sendMessage("finish");
    let letText =  
    `<h2> Congratulations! </h2>
        <div>
            <h2>You completed the Quiz in time<h2>
        </div>
        <p>You scored `+FinalScore.correct+` out of `+letQuiz.length+` correct
        <p>Your did it with `+FinalScore.time+` seconds left
        <p>Please enter your name to save your highscore:
        <p><input type="text" name="initials" id="initialsInput" placeholder="Input name here" /><p>
        <br>
        <span class="start" Id="btnStart" onclick="saveScore()">Save Score</span>
        <a href="javascript:clearScore()"class="start" Id="btnStart">Clear Highscores</a>
        <a href="javascript:location.reload()" class="start" Id="btnStart">Play Again</a>
        `;

    mainscreen.innerHTML = letText;
}
//Displays questions
function printQuestion (letNumber) {
    if(letNumber < letQuiz.length) {
    let letText =  `<h2>`+letQuiz[letNumber].question+`</h2>`+
        `<div>
            <ol>
                <li class = "choice" id = "choice1" data-value="1">`+letQuiz[letNumber].choice1+`</li>
                <li class = "choice" id = "choice2" data-value="1">`+letQuiz[letNumber].choice2+`</li>
                <li class = "choice" id = "choice3" data-value="1">`+letQuiz[letNumber].choice3+`</li>
                <li class = "choice" id = "choice4" data-value="1">`+letQuiz[letNumber].choice4+`</li>
            </ol>
        </div>`;
    mainscreen.innerHTML = letText;
    } else {printScore()}
}


//Displays correct or wrong on progressbarr
function printProgress () {
    let qRight = `<span style="color:green;">Correct</span>`;
    let qWrong = `<span style="color:red;">Wrong</span>`;
    let qNotDone = `<span style="line-height: 1.2rem;">Unanswered</span>`;
    let qProgress = 0;

    currentscoreID.innerHTML = "";
    for (let i=0; i<letQuiz.length; i++) {
        if (!letQuiz[i].answered) {score = qNotDone;} 
        else if (letQuiz[i].answered == letQuiz[i].correct) {
            score = qRight;
            qProgress++;
        } else {
            score = qWrong;
            qProgress++;
        }  
        let li = document.createElement("li");
        li.innerHTML = score;
        currentscoreID.appendChild(li);
   }
   currentscoreID.style.height = 50 * letQuiz.length +10+"px";
   progressbar.style.width = qProgress * (100/letQuiz.length)+"%";
   progressbar.textContent = qProgress * (100/letQuiz.length)+"%";
}




//Checks if answer is correct or wrong. Deducts 20 seconds if wrong
function getAnswer(i) {
    let choice1El = document.getElementById("choice1"); 
    let choice2El = document.getElementById("choice2"); 
    let choice3El = document.getElementById("choice3"); 
    let choice4El = document.getElementById("choice4"); 
    
    if (i < letQuiz.length) {
        choice1El.addEventListener("click", function() {
            letQuiz[i].answered = 1;
            if (letQuiz[i].answered != letQuiz[i].correct) {secondsLeft -= 20;}
            if (i<letQuiz.length) {
                i++;
                printQuestion(i);
                getAnswer(i);
                printProgress();
            } else {printScore();}        
        });
        choice2El.addEventListener("click", function() {
            letQuiz[i].answered = 2;
            if (letQuiz[i].answered != letQuiz[i].correct) {secondsLeft -= 20;}
            if (i<letQuiz.length) {
                i++;
                printQuestion(i);
                getAnswer(i);
                printProgress();
            } else {printScore();}
        });
        choice3El.addEventListener("click", function() {
            letQuiz[i].answered = 3;
            if (letQuiz[i].answered != letQuiz[i].correct) {secondsLeft -= 20;}
            if (i<letQuiz.length) {
                i++;
                printQuestion(i);
                getAnswer(i);
                printProgress();
            } else {printScore();}
        });
        choice4El.addEventListener("click", function() {
            letQuiz[i].answered = 4;
            if (letQuiz[i].answered != letQuiz[i].correct) {secondsLeft -= 20;}
            if (i<letQuiz.length) {
                i++;
                printQuestion(i);
                getAnswer(i);
                printProgress();
            } else {printScore();}        
        });
    } else {printScore();}
}

function checkAnswer(i) {
    if (letQuiz[i].correct == letQuiz[i].answered) {
        return true;
    } else {return false;}
}
//Displays progress and hides start button
function startQuiz() {
    currentScoreEl.style.display = "block";
    currentScoreClass.style.display ="block";
    btnStart.style.display="none";
    currentScoreClass.style.height = 20 * letQuiz.length +"px";
    let i = 0;
        printQuestion(i);
        getAnswer(i);
}
// Displays highscores
btnHighScore.addEventListener("click", function() {
    if(letHighScore !== null) {
        letHighScore.sort();
        letHighScore.reverse(); 

        if (showscore) {
            showscore=false;
            scoresEl.style.display = "none";
        } else {
            showscore=true;
            scorelist.textContent = "";
            for (let i = 0; i < letHighScore.length; i++) {
                let score = letHighScore[i];
                let li = document.createElement("li");
                li.classList.add('indent');
                li.textContent = score;
                scorelist.appendChild(li);
            }
            scoresEl.style.display = "block";
            scoresEl.style.height = 50 * letHighScore.length +10+"px";
        }
    } else {letHighScore=[];}
});
//Starts game upon clicking start button
btnStart.addEventListener("click", function() {
    startTime();
    //start quiz
    startQuiz();
    printProgress();
});



