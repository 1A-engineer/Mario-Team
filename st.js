const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const mario = document.getElementById("mario");
const background = document.getElementById("background");
const container = document.getElementById("game-container");


let marioX = 100;
let marioY = 20;
let velocityY = 0;
let isJumping = false;
const gravity = 0.5;
const jumpForce = -15;
const marioSpeed = 4;
const groundLevel = 20;
const keys = {};
let backgroundX = 0;
const backgroundSpeed = 3;


const containerWidth = container.clientWidth;
const marioWidth = mario.clientWidth;
const backgroundWidth = background.clientWidth;

// Start page

let gameStarted = false;

function startGame() {
 
  startScreen.style.display = "none";
  gameContainer.style.display = "block";
  gameLoop();
}

startBtn.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    startGame();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !gameStarted) {
    gameStarted = true;
    startGame();
  }
});

document.addEventListener("keydown", (event) => {
if (event.key === " " && !gameStarted) {
  gameStarted = true;
  startGame();
}
})

//  Main logic

const obstacles = document.querySelectorAll(".obstacle");


function updatePosition() {


 if (keys["ArrowRight"] || keys["d"]) {
   let canMoveRight = true;
   for (const obstacle of obstacles) {
     const obstacleX = parseInt(obstacle.style.left);
     const obstacleWidth = obstacle.clientWidth;
     if (
       marioX + marioWidth + marioSpeed > obstacleX &&
       marioX < obstacleX + obstacleWidth &&
       marioY < 70
     ) {
       canMoveRight = false;
     }
   }

  //  Mario only can move in first half; otherwise, it must move with bakcground.

   if (canMoveRight) {
     if (marioX + marioWidth < containerWidth / 2) {
       marioX = Math.min(containerWidth - marioWidth, marioX + marioSpeed);
     } else if (backgroundX > -(backgroundWidth - containerWidth)) {
       backgroundX -= backgroundSpeed;
       background.style.left = `${backgroundX}px`;
     }
   }
 }


 if (keys["ArrowLeft"] || keys["a"]) {
   let canMoveLeft = true;
   for (const obstacle of obstacles) {
     const obstacleX = parseInt(obstacle.style.left);
     const obstacleWidth = obstacle.clientWidth;
     if (
       marioX - marioSpeed < obstacleX + obstacleWidth &&
       marioX > obstacleX &&
       marioY < 70
     ) {
       canMoveLeft = false;
   }


   if (canMoveLeft) {
     if (marioX > 0) {
       marioX = Math.max(0, marioX - marioSpeed);
     } else if (backgroundX < 0) {
       backgroundX += backgroundSpeed;
       background.style.left = `${backgroundX}px`;
     }
   }
 }
 }

//  ------>>>

 if(keys[" "] || keys ["w"]){
  marioY++;
 }

//  


 if (isJumping) {
   velocityY += gravity;
 }


 marioY += velocityY;




 if (marioY <= groundLevel) {
   marioY = groundLevel;
   velocityY = 0;
   isJumping = false;
 }


  for (const obstacle of obstacles) {
   const obstacleX = parseInt(obstacle.style.left);
   const obstacleWidth = obstacle.clientWidth;
   const obstacleY = 20;
   const obstacleHeight = obstacle.clientHeight;


    if (
     marioX + marioWidth > obstacleX &&
     marioX < obstacleX + obstacleWidth &&
     marioY + mario.clientHeight > obstacleY &&
     marioY < obstacleY + obstacleHeight
   ) {
      if (velocityY < 0) {
       marioY = obstacleY + obstacleHeight;
       velocityY = 0;
       isJumping = false;
     }
   }
 }


 mario.style.left = `${marioX}px`;
 mario.style.bottom = `${marioY}px`;
}




document.addEventListener("keydown", (event) => {
 keys[event.key] = true;


 if ((event.key === " " || event.key === "w") && !isJumping) {
   isJumping = true;
   velocityY = jumpForce;
 }
});


document.addEventListener("keyup", (event) => {
 keys[event.key] = false;
});


function gameLoop() {
 updatePosition();
 requestAnimationFrame(gameLoop);
}


gameLoop();

