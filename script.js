const mario = document.querySelector('.mario');
let pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const highscoreElement = document.querySelector('.highscore');
let score = 0;
let hasPassedPipe = false;
let highscore = localStorage.getItem('highscore') || 0;
highscoreElement.textContent = highscore;
const retryButton = document.querySelector('.retry-button');
let isGameOver = false;
let isJumping = false;

const jump = (event) => {
    if (event.key !== ' ' || isJumping) {
        return;
    }
    isJumping = true;
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
        isJumping = false;
    }, 500);
}

const increaseScore = () => {
    score++;
    scoreElement.textContent = score;
    if (score > highscore) {
        highscore = score;
        highscoreElement.textContent = highscore;
        localStorage.setItem('highscore', highscore);
    }
}

const showRetryButton = () => {
    retryButton.style.display = 'block';
    retryButton.addEventListener('click', restartGame);
}

const restartGame = () => {
    location.reload();
};

const loop = () => {
    if (isGameOver) {
        return;
    }

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 140 && pipePosition > 0 && marioPosition < 80) {
        pipe.classList.remove('pipe-animation');
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/super-mario-world-panicking.gif';
        mario.style.width = '192px';

        showRetryButton();
        isGameOver = true;
    } else if (pipePosition <= 140 && pipePosition > 0 && marioPosition >= 80) {
        if (!hasPassedPipe) {
            increaseScore();
            hasPassedPipe = true;
        }
    } else if (pipePosition <= 0) {
        hasPassedPipe = false;
    }
    
    requestAnimationFrame(loop);
};

document.addEventListener('keydown', jump);
requestAnimationFrame(loop);
