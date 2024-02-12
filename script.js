const canvas = document.getElementById("game-container");
const context = canvas.getContext("2d");

const snake = {
  x: 40,
  y: 40,
  height: 20,
  width: 20,
  dx: 20,
  dy: 0,
  snakevectx: [40, 20, 0],
  snakevecty: [40, 20, 0],
};

const food = {
  x: 20,
  y: 100,
  height: 20,
  width: 20,
};

drawSnake();
drawFood();
moveSnake();
eatfood();

function drawSnake() {
  let len = snake.snakevectx.length;
  for (let i = 0; i < len - 1; i++) {
    context.clearRect(
      snake.snakevectx[i],
      snake.snakevecty[i],
      snake.width,
      snake.height
    );
    context.fillStyle = "red";
    context.fillRect(
      snake.snakevectx[i],
      snake.snakevecty[i],
      snake.width,
      snake.height
    );
  }
  context.clearRect(
    snake.snakevectx[len - 1],
    snake.snakevecty[len - 1],
    snake.width,
    snake.height
  );

  context.fillStyle = "green";
  context.fillRect(
    snake.snakevectx[len - 1],
    snake.snakevecty[len - 1],
    snake.width,
    snake.height
  );
  console.log(snake.snakevectx[len - 1] + " " + snake.snakevecty[len - 1]);
}

function drawFood() {
  context.fillStyle = "yellow";
  context.fillRect(food.x, food.y, food.width, food.height);
}

function updateSnakePosition(direction) {
  switch (direction) {
    case "ArrowUp":
      snake.dx = 0;
      snake.dy = -20;
      break;
    case "ArrowDown":
      snake.dx = 0;
      snake.dy = 20;
      break;
    case "ArrowLeft":
      snake.dx = -20;
      snake.dy = 0;
      break;
    case "ArrowRight":
      snake.dx = 20;
      snake.dy = 0;
      break;
  }
}

function moveback(vect) {
  for (let i = vect.length - 1; i > 0; i--) {
    vect[i] = vect[i - 1];
  }
  return vect;
}

function moveSnake() {
  setInterval(() => {
    snake.x += snake.dx;
    snake.y += snake.dy;

    snake.snakevectx = moveback(snake.snakevectx);
    snake.snakevecty = moveback(snake.snakevecty);
    snake.snakevectx[0] = snake.x;
    snake.snakevecty[0] = snake.y;
    drawSnake();
    drawFood();
    eatfood();
    console.log(snake.snakevectx + " " + snake.snakevecty);
  }, 100);
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  updateSnakePosition(key);
});

function checkWall() {
  if (snake.x === canvas.width - snake.width && snake.dx > 0) {
    snake.x = 0 - snake.width;
  }

  if (snake.x === 0 - snake.width && snake.dx < 0) {
    snake.x = canvas.width;
  }
  if (snake.y === canvas.height - snake.height && snake.dy > 0) {
    snake.y = 0 - snake.height;
  }

  if (snake.y === 0 - snake.height && snake.dy < 0) {
    snake.y = canvas.height;
  }
}

const snakeBody = [1];

function eatfood() {
  let len = snake.snakevectx.length;
  if (snake.snakevectx[0] === food.x && snake.snakevecty[0] === food.y) {
    snake.snakevectx.push(snake.snakevectx[len - 1]);
    snake.snakevecty.push(snake.snakevecty[len - 1]);

    // Move the food to a new random position
    food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
  }
}
