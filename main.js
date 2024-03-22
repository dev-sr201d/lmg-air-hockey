window.addEventListener("DOMContentLoaded", init);

const kickPower = 20;
const friction = 1;

let borderTop;
let borderLeft;
let borderBottom;
let borderRight;

function init() {
    const gameBoard = document.querySelector(".gd-game-board");
    const boardTop = gameBoard.offsetTop;
    const boardLeft = gameBoard.offsetLeft;
    borderTop = boardTop + 10;
    borderLeft = boardLeft + 10;
    borderBottom = boardTop + gameBoard.offsetHeight - 10;
    borderRight = boardLeft + gameBoard.offsetWidth - 10;

    const ball = createBall();

    window.addEventListener("keypress", () => kickBall(ball));
}

function createBall() {
    const ball = document.createElement("div");
    ball.classList.add("gd-ball");

    ball.addEventListener("click", () => kickBall(ball));

    document.body.appendChild(ball);

    return ball;
}

function kickBall(ball) {
    const xDirection = Math.random() < 0.5 ? -1 : 1;
    ball.xFactor = xDirection *  Math.random();

    const yDirection = Math.random() < 0.5 ? -1 : 1;
    ball.yFactor = yDirection *  Math.random();

    ball.startTime = Date.now();
    ball.speed = kickPower;

    roll(ball);
}

function roll(ball) {
    const elapsedSeconds = (Date.now() - ball.startTime) / 1000;
    ball.speed = ball.speed - (0.5 * friction * elapsedSeconds * elapsedSeconds);

    if (ball.speed <= 0) {
        return;
    }

    evaluateBorderCollision(ball);

    const xChange = ball.xFactor * ball.speed;
    const yChange = ball.yFactor * ball.speed;

    ball.style.left = (ball.offsetLeft + xChange) + "px";
    ball.style.top = (ball.offsetTop + yChange) + "px";
    
    window.setTimeout(() => roll(ball), 20);
}

function evaluateBorderCollision(ball) {
    const ballTop = ball.offsetTop;
    const ballBottom = ball.offsetTop + ball.offsetHeight;
    const ballLeft = ball.offsetLeft;
    const ballRight = ball.offsetLeft + ball.offsetWidth;

    if (ballTop <= borderTop
        || ballBottom >= borderBottom) {
        ball.yFactor = ball.yFactor * -1;

        if (ballTop <= borderTop) {
            ball.style.top = borderTop + "px";
        }

        if (ballTop >= borderBottom) {
            ball.style.top = (borderBottom - ball.offsetHeight) + "px";
        }
        return;
    }

    if (ballLeft <= borderLeft
        || ballRight >= borderRight) {
        ball.xFactor = ball.xFactor * -1;

        if (ballLeft <= borderLeft) {
            ball.style.left = borderLeft + "px";
        }

        if (ballRight >= borderRight) {
            ball.style.left = (borderRight - ball.offsetWidth) + "px";
        }
        return;
    }
}
