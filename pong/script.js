// set up the canvas
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2; // change in x
var dy = -2; // change in y

// set up the players (player 1 = left, player 2 = computer)
let player1 = {
    x: 0,
    y: canvas.height/2,
    width: 10,
    height: 75,
    score: 0,
    color: "white"
}

let player2 = {
    x: canvas.width - 10,
    y: canvas.height/2,
    width: 10,
    height: 75,
    score: 0,
    color: "white"
}

// set up the ball
let ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "white"
}

// draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// draw the players
function drawPlayer(player) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// draw the score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(player1.score, 8, 20);
    ctx.fillText(player2.score, canvas.width-16, 20);
}

// draw the net
function drawNet() {
    for(let i = 0; i <= canvas.height; i+=15) {
        drawRect(canvas.width/2-1, i, 2, 10, "white");
    }
}

// draw the rectangle
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// draw everything
function draw() {
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "black");
    // draw the net
    drawNet();
    // draw the score
    drawScore();
    // draw the players
    drawPlayer(player1);
    drawPlayer(player2);
    // draw the ball
    drawBall();
}

// update the game (move the ball, move the players, etc.)
function update() {
    // move the ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    // simple AI to control the computer player 
    let computerLevel = 0.1;
    player2.y += (ball.y - (player2.y + player2.height/2)) * computerLevel;
    // check if the ball hits the top or bottom of the canvas
    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }
    // check if the ball hits the left or right of the canvas
    if(ball.x + ball.radius > canvas.width) {
        // player 1 scores
        player1.score++;
        // reset the ball
        resetBall();
    } else if(ball.x - ball.radius < 0) {
        // player 2 scores
        player2.score++;
        // reset the ball
        resetBall();
    }
    // check if the ball hits the player
    let player = (ball.x < canvas.width/2) ? player1 : player2;
    if(collision(ball, player)) {
        // where the ball hits the player
        let collidePoint = ball.y - (player.y + player.height/2);
        // normalize the values
        collidePoint = collidePoint/(player.height/2);
        // calculate the angle of the ball
        let angleRad = collidePoint * Math.PI/4;
        // change the x and y velocity direction
        let direction = (ball.x < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        // increase speed
        ball.speed += 0.1;
    }
}

// reset the ball
function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

// collision detection
function collision(b, p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

// game loop
function game() {
    update();
    draw();
}

// number of frames per second
let framePerSecond = 50;
// call the game function 50 times every 1 Sec
let loop = setInterval(game, 1000/framePerSecond);

// move the player with W and S keys
window.addEventListener("keydown", keyDown);
function keyDown(event) {
    switch(event.keyCode) {
      // make sure that it goes by 10 pixels at a time (so that it doesn't go too fast)
        case 87: // W key
            player1.y -= 10;
            break;  
        case 83: // S key
            player1.y += 10;
            break;
            
    }
}


// start the game when the page loads
window.onload = function() {
    game();
}
