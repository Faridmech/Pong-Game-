import Ball from "./Ball.js";
import Paddle from "./Paddle.js"


const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElement = document.getElementById("player-score")
const computerScoreElement = document.getElementById("computer-score")
let lasTime
function update(time){

    if(lasTime != null){
     const delta = time -lasTime;
     ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
     computerPaddle.update(delta, ball.y)

     const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
     document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

     if(isLose()) handleLose()
    
    }
    
    lasTime = time;
    window.requestAnimationFrame(update)
}

function handleLose(){
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
         playerScoreElement.textContent = parseInt(playerScoreElement.textContent) + 1
    }else{
        computerScoreElement.textContent = parseInt(computerScoreElement.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

function isLose(){
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0;
}

document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100
})


window.requestAnimationFrame(update)