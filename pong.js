const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const ball = document.getElementById("ball");

const movement = 20;

const Player1 = "Bar-1";
const Player2 = "Bar-2";
const storeName = "Jon";
const storeScore = 123;

//set the variables
let Player;
let moveX = 2;
let moveY = 2;
let ballMoving;
let border = 12;
let score;
let highScore;
let gameStart = false;

// set the high Scores in local storage
localStorage.setItem(storeScore, null);

// see if the score exits or this is first game
(function () {
  highScore = localStorage.getItem(storeScore);
  Player = localStorage.getItem(storeName);
  if (Player === "null" || highScore === "null") {
    alert("Hello.. This is your first game");
    highScore = 0;
    Player = Player1;
  } else {
    alert(Player + " has maximum score of " + highScore * 100);
  }
  gameReset(Player);
})();

// function to initialize the game
function gameReset(barName) {
  bar1.style.left = (window.innerWidth - bar1.offsetWidth) / 2 + "px";
  bar2.style.left = (window.innerWidth - bar2.offsetWidth) / 2 + "px";
  ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + "px";

  // .getBoundingClientRect will give the position of the element
  if (barName === Player1) {
    ball.style.top =
      bar2.getBoundingClientRect().y -
      bar2.getBoundingClientRect().height +
      "px";
    moveY = -2;
  } else if (barName === Player2) {
    ball.style.top = bar1.getBoundingClientRect().height + "px";
    moveY = 2;
  }
  console.log("reset");
  score = 0;
  gameStart = false;
}
// Add Event Listener to keydown
document.addEventListener("keydown", function (event) {
  let key = event.code;
  console.log(key);
  if (key == "keyD" || key == "ArrowRight") {
    if (
      parseInt(bar1.style.left) <
      window.innerWidth - bar1.offsetWidth - border
    ) {
      bar1.style.left = parseInt(bar1.style.left) + movement + "px";
      bar2.style.left = bar1.style.left;
    }
  }

  if (key == "keyA" || key == "ArrowLeft") {
    if (parseInt(bar1.style.left) > border) {
      bar1.style.left = parseInt(bar1.style.left) - movement + "px";
      bar2.style.left = bar1.style.left;
    }
  }
  // Initialize the game with Enter keypress
  if (key == "Enter") {
    if (!gameStart) {
      gameStart = true;
      let ballRect = ball.getBoundingClientRect();
      let ballX = ballRect.x;
      let ballY = ballRect.y;
      let ballDia = ballRect.width;

      let bar1Height = bar1.offsetHeight;
      let bar2Height = bar2.offsetHeight;
      let bar1Width = bar2.offsetWidth;
      let bar2Width = bar2.offsetWidth;

      ballMoving = setInterval(function () {
        let bar1X = bar1.getBoundingClientRect().x;
        let bar2X = bar2.getBoundingClientRect().x;

        let ballCentre = ballX + ballDia / 2;

        ballX += moveX;
        ballY += moveY;

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        if (ballX + ballDia > window.innerWidth || ballX < 0) {
          moveX = -moveX;
        }

        if (ballY <= bar1Height) {
          moveY = -moveY;
          score++;

          if (ballCentre < bar1X || ballCentre > bar1X + bar1Width) {
            dataStoring(score, Player2);
          }
        }
        if (ballY + ballDia >= window.innerHeight - bar2Height) {
          moveY = -moveY;
          score++;

          if (ballCentre < bar2X || ballCentre > bar2X + bar2Width) {
            dataStoring(score, Player1);
          }
        }
      }, 8);
    }
  }
});

// function to store the highscore in the local memory
function dataStoring(scoreObtained, winningBar) {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem(storeName, winningBar);
    localStorage.setItem(storeScore, highScore);
  }
  clearInterval(ballMoving);
  gameReset(winningBar);

  alert(
    winningBar +
      " wins with score of " +
      scoreObtained * 100 +
      ". Max Score is: " +
      highScore * 100
  );
}
