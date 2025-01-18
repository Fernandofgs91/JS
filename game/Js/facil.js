// ==========================
// Variáveis Globais
// ==========================
const correctSound = new Audio('Audio/acerto.mp3');
const wrongSound = new Audio('Audio/erro.mp3');
const gameOverSound = new Audio('Audio/gameover.mp3');
const vitoriaSound = new Audio('Audio/vitoria.mp3');
let timeRemaining = 120;
let errors = 0;
let score = 0;
let correctAnswer;
let timerInterval;
let helpUsed = false;

// ==========================
// Inicialização da interface
// ==========================
window.onload = () => {
    initUI();
};

function initUI() {
    const playerName = localStorage.getItem('currentPlayer') || 'Jogador';
    document.getElementById('playerName').innerText = `Bem-vindo, ${playerName}!`;
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('helpButton').addEventListener('click', useHelp);
}

// ==========================
// Atualização da interface
// ==========================
function updateGameStateDisplay(message, color) {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <div style="text-align: center; margin-top: 50px;">
            <h1 style="color: ${color}; font-size: 3em;">${message}</h1>
        </div>
    `;
    setTimeout(() => {
        saveGameResult();
        window.location.href = 'resultados.html';
    }, 4000);
}

function updateCounters() {
    document.getElementById('scoreCounter').innerText = `Acertos: ${score}`;
    document.getElementById('errorCounter').innerText = `Erros: ${errors}`;
}

// ==========================
// Início do jogo
// ==========================
async function startGame() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('helpButton').style.display = 'inline-block';
    document.getElementById('gameArea').style.display = 'block';
    startTimer();
    generateQuestion();
}

// ==========================
// Temporizador
// ==========================
function startTimer() {
    const timerDisplay = document.getElementById('timerDisplay');
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = `Tempo restante: ${timeRemaining}s`;

        if (timeRemaining <= 0 || errors >= 3 || score >= 10) {
            clearInterval(timerInterval);
            endGame(timeRemaining <= 0 ? "Tempo Esgotado" : errors >= 3 ? "Game Over" : "Parabéns");
        }
    }, 1000);
}

// ==========================
// Geração de perguntas
// ==========================
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    correctAnswer = num1 + num2;

    document.getElementById('question').innerText = `Quanto é ${num1} + ${num2}?`;

    const answers = document.getElementById('answers');
    answers.innerHTML = '';

    const answerSet = new Set([correctAnswer]);
    while (answerSet.size < 4) {
        answerSet.add(correctAnswer + Math.floor(Math.random() * 21 - 10));
    }

    Array.from(answerSet)
        .sort(() => Math.random() - 0.5)
        .forEach(answer => {
            const btn = document.createElement('button');
            btn.classList.add('button');
            btn.innerText = answer;
            btn.onclick = () => checkAnswer(answer === correctAnswer);
            answers.appendChild(btn);
        });
}

// ==========================
// Verificação de resposta
// ==========================
function checkAnswer(isCorrect) {
    displayFeedback(isCorrect);
    if (isCorrect) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
    updateCounters();
}

// ==========================
// Feedback visual
// ==========================
function displayFeedback(isCorrect) {
    const feedback = document.getElementById('feedback');
    feedback.innerText = isCorrect ? 'Acertou!' : `Errou! A resposta correta era ${correctAnswer}.`;
    feedback.style.color = isCorrect ? '#00ff00' : 'red';
}

// ==========================
// Resposta correta
// ==========================
function handleCorrectAnswer() {
    score++;
    correctSound.play();
    updateCounters();

    if (score >= 10) {
        clearInterval(timerInterval); // Interrompe o temporizador
        showVictoryMessage();
    } else {
        generateQuestion();
    }
}

// ==========================
// Resposta errada
// ==========================
function handleWrongAnswer() {
    errors++;
    wrongSound.play();
    if (errors >= 3) {
        showGameOverMessage();
    } else {
        setTimeout(generateQuestion, 2000); // Gera nova questão após 2 segundos
    }
}

// ==========================
// Mensagem de vitória
// ==========================
function showVictoryMessage() {
    vitoriaSound.play();
    updateGameStateDisplay("Parabéns! Você venceu!", "#00ff00");
}

// ==========================
// Mensagem de Game Over
// ==========================
function showGameOverMessage() {
    gameOverSound.play();
    updateGameStateDisplay("Game Over!", "red");
}

// ==========================
// Fim do jogo
// ==========================
async function endGame(message) {
    clearInterval(timerInterval); // Garante que o temporizador seja interrompido
    if (message === "Parabéns") {
        vitoriaSound.play();
    } else if (message === "Game Over") {
        gameOverSound.play();
    }
    updateGameStateDisplay(message, message === "Parabéns" ? "#00ff00" : "red");
}

// ==========================
// Salvar resultados
// ==========================
function saveGameResult() {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    results.push({
        jogador: localStorage.getItem('currentPlayer') || 'Jogador',
        modalidade: 'Fácil',
        acertos: score,
        erros: errors,
        tempoRestante: timeRemaining,
    });
    localStorage.setItem('results', JSON.stringify(results));
}

// ==========================
// Ajuda
// ==========================
function useHelp() {
    if (!helpUsed) {
        helpUsed = true;
        const answerButtons = document.querySelectorAll('#answers button');
        const incorrectAnswers = Array.from(answerButtons).filter(button => parseInt(button.innerText) !== correctAnswer);

        incorrectAnswers.slice(0, 2).forEach(button => button.style.display = 'none');
        document.getElementById('helpButton').style.display = 'none';
    }
}
