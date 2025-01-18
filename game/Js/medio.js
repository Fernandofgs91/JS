// ==========================
// Variáveis Globais
// ==========================
let timeRemaining = 120;
let errors = 0;
let score = 0;
let correctAnswer;
let timerInterval;
let helpUsed = false;

const correctSound = new Audio('Audio/acerto.mp3');
const wrongSound = new Audio('Audio/erro.mp3');
const gameOverSound = new Audio('Audio/gameover.mp3');
const victorySound = new Audio('Audio/vitoria.mp3');

const playerName = localStorage.getItem('currentPlayer') || 'Jogador';

// ==========================
// Inicialização da Interface
// ==========================
window.onload = () => {
    initUI();
};

function initUI() {
    document.getElementById('playerName').innerText = `Bem-vindo, ${playerName}!`;
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('helpButton').addEventListener('click', useHelp);
}

// ==========================
// Controle do Jogo
// ==========================
function startGame() {
    resetGameVariables();
    updateUI();
    clearInterval(timerInterval);
    startTimer();
    generateQuestion();
}

function resetGameVariables() {
    timeRemaining = 120;
    score = 0;
    errors = 0;
    helpUsed = false;
}

// ==========================
// Temporizador
// ==========================
function startTimer() {
    const timerDisplay = document.getElementById('timerDisplay');
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            showEndGameMessage("Game Over", gameOverSound);
        } else {
            timeRemaining--;
            timerDisplay.innerText = `Tempo restante: ${timeRemaining}s`;
        }
    }, 1000);
}

// ==========================
// Geração de Perguntas
// ==========================
function generateQuestion() {
    const { num1, num2, operator, isAddition } = generateRandomQuestion();
    correctAnswer = isAddition ? num1 + num2 : num1 - num2;

    document.getElementById('question').innerText = `Quanto é ${num1} ${operator} ${num2}?`;
    generateAnswerButtons();
}

function generateRandomQuestion() {
    const num1 = Math.floor(Math.random() * 300);
    const num2 = Math.floor(Math.random() * 300);
    const isAddition = Math.random() > 0.5;
    const operator = isAddition ? '+' : '-';
    return { num1, num2, operator, isAddition };
}

function generateAnswerButtons() {
    const answers = document.getElementById('answers');
    answers.innerHTML = '';
    const answerSet = new Set([correctAnswer]);

    while (answerSet.size < 6) {
        const randomAnswer = correctAnswer + Math.floor(Math.random() * 41 - 20);
        answerSet.add(randomAnswer);
    }

    Array.from(answerSet)
        .sort(() => Math.random() - 0.5)
        .forEach(answer => {
            const btn = document.createElement('button');
            btn.innerText = answer;
            btn.onclick = () => checkAnswer(answer === correctAnswer);
            answers.appendChild(btn);
        });
}

// ==========================
// Resposta do Jogador
// ==========================
function checkAnswer(isCorrect) {
    displayFeedback(isCorrect);

    if (isCorrect) {
        handleCorrectAnswer();
    } else {
        handleIncorrectAnswer();
    }

    if (score >= 10 || errors >= 3) {
        return;
    }

    generateQuestion();
}

function displayFeedback(isCorrect) {
    const feedback = document.getElementById('feedback');
    feedback.innerText = isCorrect ? 'Correto!' : 'Errado!';
    feedback.style.color = isCorrect ? '#00ff00' : 'red';
}

function handleCorrectAnswer() {
    score++;
    correctSound.play();
    updateUI();
    if (score >= 10) {
        showEndGameMessage('Parabéns!', victorySound);
    }
}

function handleIncorrectAnswer() {
    errors++;
    wrongSound.play();
    updateUI();

    // Mostrar a resposta correta antes de gerar uma nova questão
    const feedback = document.getElementById('feedback');
    feedback.innerText = `Errado! A resposta correta era ${correctAnswer}.`;
    feedback.style.color = 'red';

    // Esperar 2 segundos antes de gerar a próxima questão
    setTimeout(() => {
        if (errors >= 3) {
            showEndGameMessage('Game Over', gameOverSound);
        } else {
            generateQuestion();
        }
    }, 2000);
}

// ==========================
// Função de Ajuda
// ==========================
function useHelp() {
    if (!helpUsed) {
        helpUsed = true;
        hideIncorrectAnswers();
        document.getElementById('helpButton').style.display = 'none';
    }
}

function hideIncorrectAnswers() {
    const answerButtons = document.querySelectorAll('#answers button');
    const incorrectAnswers = Array.from(answerButtons).filter(button => parseInt(button.innerText) !== correctAnswer);

    incorrectAnswers.slice(0, 4).forEach(button => (button.style.display = 'none'));
}

// ==========================
// Finalização do Jogo
// ==========================
function showEndGameMessage(message, sound) {
    document.body.innerHTML = '';
    document.body.style.backgroundColor = '#1B2A41';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';

    const messageDiv = document.createElement('div');
    messageDiv.innerText = message;
    messageDiv.style.color = message === 'Parabéns!' ? 'green' : 'red';
    messageDiv.style.fontSize = '4em';
    messageDiv.style.fontWeight = 'bold';
    document.body.appendChild(messageDiv);

    sound.play();

    setTimeout(() => {
        endGame();
    }, 4000);
}

function endGame() {
    clearInterval(timerInterval);
    saveGameResult();
    window.location.href = 'resultados.html';
}

function saveGameResult() {
    const difficulty = 'Médio';
    const results = JSON.parse(localStorage.getItem('results')) || [];
    results.push({
        jogador: playerName,
        modalidade: difficulty,
        acertos: score,
        tempoRestante: timeRemaining,
    });
    localStorage.setItem('results', JSON.stringify(results));
}

// ==========================
// Atualização da Interface
// ==========================
function updateUI() {
    document.getElementById('timerDisplay').innerText = `Tempo restante: ${timeRemaining}s`;
    document.getElementById('scoreCounter').innerText = `Acertos: ${score}`;
    document.getElementById('errorCounter').innerText = `Erros: ${errors}`;

    document.getElementById('timerDisplay').style.display = 'block';
    document.getElementById('scoreCounter').style.display = 'block';
    document.getElementById('errorCounter').style.display = 'block';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('helpButton').style.display = helpUsed ? 'none' : 'inline-block';
}
