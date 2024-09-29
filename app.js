let score = 0;
let highScore = 0;
let gameInterval;
let difficulty = 2000; // Initial difficulty (time between objects falling)

document.getElementById('startButton').onclick = startGame;

function startGame() {
    document.getElementById('score').innerText = score;
    document.getElementById('highScore').innerText = highScore;
    score = 0; // Reset score
    document.getElementById('gameArea').style.display = 'block'; // Show game area
    document.getElementById('startButton').style.display = 'none'; // Hide start button
    gameInterval = setInterval(() => {
        if (Math.random() < 0.8) {
            createFallingItem('coin'); // 80% chance to create a coin
        } else {
            createFallingItem('bomb'); // 20% chance to create a bomb
        }
    }, difficulty);
}

function createFallingItem(type) {
    const gameArea = document.getElementById('gameArea');
    const item = document.createElement('div');
    item.classList.add(type);
    item.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px'; // Random horizontal position
    item.style.top = '0px'; // Start at the top
    gameArea.appendChild(item);
    
    let fallInterval = setInterval(() => {
        let itemTop = parseFloat(item.style.top);
        if (itemTop >= gameArea.clientHeight - 50) {
            clearInterval(fallInterval);
            gameArea.removeChild(item);
        } else {
            item.style.top = (itemTop + 5) + 'px'; // Move down
        }
    }, 100);
    
    item.onmouseover = () => {
        if (type === 'coin') {
            score += 1; // Increase score
            document.getElementById('score').innerText = score;
            gameArea.removeChild(item);
            if (score % 10 === 0) {
                difficulty *= 0.9; // Increase difficulty every 10 points
                clearInterval(gameInterval);
                startGame(); // Restart game with increased difficulty
            }
        } else if (type === 'bomb') {
            alert("Game Over! You hit a bomb!");
            clearInterval(gameInterval);
            resetGame();
        }
    };
}

function resetGame() {
    if (score > highScore) {
        highScore = score; // Update high score
        document.getElementById('highScore').innerText = highScore;
    }
    score = 0;
    difficulty = 2000; // Reset difficulty
    document.getElementById('score').innerText = score;
    document.getElementById('gameArea').style.display = 'none'; // Hide game area
    document.getElementById('startButton').style.display = 'block'; // Show start button
    const gameArea = document.getElementById('gameArea');
    while (gameArea.firstChild) {
        gameArea.removeChild(gameArea.firstChild); // Remove all items from game area
    }
}

