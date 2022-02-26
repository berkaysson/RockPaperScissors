const choices = document.querySelectorAll(".choice");
const cChoices = document.querySelectorAll(".cChoice");

var delay =3000;
let pScore = 0;
let cScore = 0;
let round = 0;
cChoiceHide();

choices.forEach((choice) => {
    choice.addEventListener("click", function() {
        const pInput=this.id;
        const cChoice = ["Rock", "Paper", "Scissors"];
        const cInput = cChoice[Math.floor(Math.random()*3)];
        let cInputId = "c"+cInput;
        
        compare(pInput,cInput);
        cChoiceHide();
        updateScore();

        document.getElementById(cInputId).style.visibility="visible";

        if (checkWinner(3)) {   
          updateScore();
          setTimeout(function() {
            pScore = cScore = round = 0;
            updateScore()
          },delay);
        }
      });
    });
    

function compare(pInput, cInput) {
    const currentMatch = `${pInput} vs ${cInput}`;

    if (pInput===cInput) {
        document.getElementById("case").textContent = `${currentMatch} is a Tie`;
        round++;
        return;
    }

    if (pInput==="Rock") {
        if (cInput === "Scissors") {
            document.getElementById("case").textContent = `${currentMatch} = You Win`;
            pScore++;
            round++;
          } else {
            document.getElementById("case").textContent = `${currentMatch} = Computer Wins`;
            cScore++;
            round++;
          }
    }

    else if (pInput === "Paper") {
        if (cInput === "Rock") {
          document.getElementById("case").textContent = `${currentMatch} = You Win`;
          pScore++;
          round++;
        } else {
          document.getElementById("case").textContent = `${currentMatch} = Computer Wins`;
          cScore++;
          round++;
        }
    }
    else {
        if (cInput === "Paper") {
          document.getElementById("case").textContent = `${currentMatch} = You Win`;
          pScore++;
          round++;
        } 
        else {
          document.getElementById("case").textContent = `${currentMatch} = Computer Wins`;
          cScore++;
          round++;
        }
      }
}

function updateScore() {
    document.getElementById("pScore").textContent = pScore;
    document.getElementById("cScore").textContent = cScore;
    document.getElementById("round").textContent = round;
}

function checkWinner(score) {
    if (pScore === score || cScore === score) {
        const winner =
          pScore === score
            ? "You win the game! Congratulations!"
            : "Computer wins the game! Try again next time!";
            document.getElementById("case").textContent = winner;
            countdown();
          
        return true;
      }
      return false;
}

function countdown() { /* inside of the checkwinner */
  seconds=3;
  document.getElementById("countdown").textContent = seconds+ " sec to start !";
  choices.forEach((buttons) => { /*disables choice buttons when countdown starts */
    const idOfButtons = buttons.id;
    document.getElementById(idOfButtons).disabled =true;
  });
  var count=setInterval(function() {
    seconds--;
    document.getElementById("countdown").textContent = seconds+ " sec to start !";
    if (seconds < 0) {
      document.getElementById("countdown").textContent =  "Game started.";
      choices.forEach((buttons) => { /*activates choice buttons when countdown ends */
        const idOfButtons = buttons.id;
        document.getElementById(idOfButtons).disabled =false;
      });
      const pInput=this.id;
      cChoiceHide();
      clearInterval(count);
    }
  }, 1000);
}

function cChoiceHide() {
  if (round==0) {
    cChoices.forEach((cChoice)=>{
      const cInputId = cChoice.id;
      document.getElementById(cInputId).style.visibility="visible";
    });
  }
  else {
    cChoices.forEach((cChoice)=>{
      const cInputId = cChoice.id;
      document.getElementById(cInputId).style.visibility="hidden";
    });
  }
}