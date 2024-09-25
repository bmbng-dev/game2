const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;

// Player (box) properties
const playerWidth = 80;
const playerHeight = 20;
let playerX = (canvas.width - playerWidth) / 2;
const playerSpeed = 7;

// Ball properties
const ballRadius = 10;
let ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
let ballY = ballRadius;
let ballSpeed = 3;

// Keyboard control
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Drawing the player (box)
function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, canvas.height - playerHeight - 10, playerWidth, playerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Drawing the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff6347";
    ctx.fill();
    ctx.closePath();
}

// Detect if the ball is caught by the player
function detectCatch() {
    if (ballY + ballRadius >= canvas.height - playerHeight - 10 && 
        ballX > playerX && ballX < playerX + playerWidth) {
        return true;
    }
    return false;
}

// Reset ball after being caught or falling off the screen
function resetBall() {
    ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
    ballY = ballRadius;
    ballSpeed += 0.2;  // Increase difficulty
}

// Drawing and updating the game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBall();

    // Move ball
    ballY += ballSpeed;

    // Check if ball is caught
    if (detectCatch()) {
        score++;
        document.getElementById("score").textContent = "Score: " + score;
        resetBall();
    }

    // Check if ball falls off the screen
    if (ballY + ballRadius > canvas.height) {
        alert("Game Over! Final Score: " + score);
        document.location.reload();
    }

    // Move player
    if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    } else if (leftPressed && playerX > 0) {
        playerX -= playerSpeed;
    }

    requestAnimationFrame(draw);
}

draw();