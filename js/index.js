let inputDirection = {x:0 , y:0};

const gameOverSound = new Audio('../assets/game-over.wav');
const bgMusicSound = new Audio('../assets/bgmusic.mp3');
const foodSound = new Audio('../assets/food.mp3');
const movementSound = new Audio('../assets/movement.mp3');
const highScoreElement = document.querySelector(".high-score");
const scoreElement = document.querySelector(".score");



let snakeArray = [
    {x: 13 , y: 15}
]
let speed = 4;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;
let lastPaintTime = 0;

let food = {x: 6 , y: 7}

const main = (curTime) => {
    window.requestAnimationFrame(main);
    // console.log(curTime);

    if((curTime - lastPaintTime)/1000 < 1/speed){
        return ;
    }

    lastPaintTime = curTime;

    gameEngine();
}


let score=0;
const isCollide = (sArr) => {
    for(let idx=1 ; idx<sArr.length ; ++idx) {
        if(sArr[0].x === sArr[idx].x && sArr[0].y === sArr[idx].y) return true;
    }

    if(sArr[0].x >= 18 || sArr[0].x <=0 || sArr[0].y >= 18 || sArr[0].y <=0){
        return true;
    }
}

function gameEngine() {
    // update the snake and food array;

    if(isCollide(snakeArray)) {
        bgMusicSound.pause();
        gameOverSound.play();
        inputDirection = {x: 0 , y: 0};
        alert("Game over press any key to play again ;)");
        snakeArray = [{x: 13 , y: 15}];
        // bgMusicSound.play();
        score = 0;

        scoreElement.innerText = `Score: ${score}`;
    }

    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        score += 1;
        // let n=snakeArray.length();
        // snakeArray[n+1].x = 

        highScore = score > highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;

        snakeArray.unshift({x: snakeArray[0].x + inputDirection.x , y: snakeArray[0].y + inputDirection.y});
        
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // move snake;

    for(let i=snakeArray.length-2 ; i>=0 ; i--) {
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;

    // display snake

    board.innerHTML = "";
    
    snakeArray.forEach((ele , idx) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = ele.y;
        snakeElement.style.gridColumnStart = ele.x;
        
        if(idx === 0) {
            snakeElement.classList.add('head');
        }

        else {
            snakeElement.classList.add('snake-body');
        }

        board.appendChild(snakeElement);
    });

    // display food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown' , e => {
    movementSound.play();

    inputDirection = {x: 0, y: 0}
    
    // bgMusicSound.play();
    
    if(e.key === "ArrowUp" && inputDirection.y != 1) {
        inputDirection.x = 0;
        inputDirection.y = -1;
    } else if(e.key === "ArrowDown" && inputDirection.y != -1) {
        inputDirection.x = 0;
        inputDirection.y = 1;
    } else if(e.key === "ArrowLeft" && inputDirection.x != 1) {
        inputDirection.x = -1;
        inputDirection.y = 0;
    } else if(e.key === "ArrowRight" && inputDirection.x != -1) {
        inputDirection.x = 1;
        inputDirection.y = 0;
    }
})