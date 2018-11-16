window.onload = function () {

  let cvs = document.getElementById('canvas');
  let ctx = cvs.getContext('2d');

// The Canvas Width and height
  let canvasWidth = cvs.width;
  let canvasHeight = cvs.height;

// Snake dimensions
  let snakeW = 20;
  let snakeH = 20;

  let score = 0;

// The Variables for the Snake, Always removing the head and pushing everything up and pushing a new tail in
  let newHead;
  let snake = [];
  let snakeIntiLength = 2;
  let snakeX;
  let snakeY;

  //Food Variabiles
  let foodX;
  let foodY;

  let direction = "down";

  //make the intial snake

for (let i= snakeIntiLength - 1; i > 0; i--) {
  snake.push({x: i +10, y: 13});
}
//Draws foods functions
function randomFoodGen(){
  foodX = Math.round(Math.random() * (canvasWidth/snakeW));
  foodY = Math.round(Math.random() * (canvasHeight/snakeH));
  if (foodX < 0 || foodX > 25 || foodY < 0 || foodY > 25){
    foodX = 13;
    foodY = 10;
  }
}
function displayFood(x,y){
  ctx.fillStyle = "yellow"
  ctx.fillRect(x * snakeW, y * snakeH, snakeW,snakeH);
}
randomFoodGen();
displayFood(foodX,foodY)
//Handel The Keycodes, Controling the snake, 3

document.addEventListener("keydown", getDirection);

function getDirection(e){
if(e.keyCode === 37 && direction !== "right"){
 direction = "left";
}
if(e.keyCode === 38 && direction !== "down"){
 direction = "up";
}
if(e.keyCode === 39 && direction !== "left"){
 direction = "right";
}
if(e.keyCode === 40 && direction !== "up"){
 direction = "down";
}
}

// Making the Snake

function drawSnakeSeg(x,y){
  ctx.fillStyle = "green";
  ctx.fillRect(x * snakeW, y * snakeH, snakeW,snakeH);
}

function collisionDetections(x,y,array){
  for(let m= 0; m< array.length ; m++) {
    if(x=== array[m].x && y === array[m].y){
      return true;
    }
  }
 return false;
}

function drawScore(theScore){
  ctx. font = '20px sans-serif';
  ctx.fillStyle = "white";
  ctx.fillText("Total Score : " + theScore,5,canvasHeight-25);
}

function draw (){
  ctx.clearRect(0,0, canvasWidth,canvasHeight);
for(let i = 0; i<= snake.length - 1; i++){
  let _x = snake[i].x;
  let _y = snake[i].y;
  drawSnakeSeg(_x,_y);
  displayFood(foodX,foodY);
  drawScore(score);

  //Get Snake head
  snakeX = snake[0].x;
  snakeY = snake[0].y;
  }

  if(direction === "left"){
    snakeX = snakeX - 1;
    }
  else if(direction === "right"){
     snakeX = snakeX + 1;
     }
  else if(direction === "down"){
      snakeY = snakeY + 1;
     }
  else if(direction === "up"){
        snakeY = snakeY - 1;
      }

      //collision Detection
      if(snakeX < 0 || snakeY < 0 || snakeX > (canvasWidth/snakeW) || snakeY > (canvasHeight/snakeH)
      || collisionDetections (snakeX, snakeY, snake)){

     location.reload(); //resets the page
   }

      //check to see if snake has eaten food

      if(snakeX === foodX && snakeY === foodY){
        randomFoodGen();
        newHead = {x: snakeX, y: snakeY}
        score ++;


      }
      else {
        snake.pop();
        newHead = {x: snakeX, y: snakeY};

      }
      snake.unshift(newHead);
}//end of the Draw loop)


setInterval(draw,120);


} //end of Game
