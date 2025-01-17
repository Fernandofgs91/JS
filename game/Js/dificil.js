class Game {
    constructor() {
        this.sounds = {
            correct: new Audio('Audio/acerto.mp3'),
            wrong: new Audio('Audio/erro.mp3'),
            gameOver: new Audio('Audio/gameover.mp3'),
            victory: new Audio('Audio/vitoria.mp3'),
        };

        this.GAME_DURATION = 120; // 2 minutos em segundos
        this.MAX_ERRORS = 3;
        this.MAX_SCORE = 10;
        this.MAX_SKIPS = 3; // Número máximo de pulos permitidos

        this.gameState = {
            timer: this.GAME_DURATION,
            errors: 0,
            score: 0,
            skips: this.MAX_SKIPS,
            correctAnswer: null,
            timerInterval: null,
            playerName: localStorage.getItem('currentPlayer') || 'Jogador',
        };

        this.elements = {
            playerName: document.getElementById('playerName'),
            startButton: document.getElementById('startButton'),
            userAnswerInput: document.getElementById('userAnswer'),
            feedback: document.getElementById('feedback'),
            scoreCounter: document.getElementById('scoreCounter'),
            errorCounter: document.getElementById('errorCounter'),
            timerDisplay: document.getElementById('timerDisplay'),
            questionDisplay: document.getElementById('question'),
            skipButton: document.getElementById('skipButton'),
        };

        this.init();
    }

    init() {
        this.elements.playerName.innerText = `Bem-vindo, ${this.gameState.playerName}!`;
        this.elements.startButton.addEventListener('click', this.startGame.bind(this));
        this.elements.userAnswerInput.addEventListener('keypress', this.handleAnswerSubmission.bind(this));
        this.elements.skipButton.addEventListener('click', this.handleSkipQuestion.bind(this));
    }

    startGame() {
        this.toggleGameUI();
        this.startTimer();
        this.generateQuestion();
    }

    toggleGameUI() {
        document.querySelector('.description').style.display = 'none';
        this.elements.startButton.style.display = 'none';
        this.elements.timerDisplay.style.display = 'block';
        this.elements.scoreCounter.style.display = 'block';
        this.elements.errorCounter.style.display = 'block';
        this.elements.skipButton.style.display = 'block';
        document.querySelector('.input-answer').style.display = 'block';
        document.querySelector('.question').style.display = 'block';
    }

    startTimer() {
        this.gameState.timerInterval = setInterval(() => {
            if (this.gameState.timer <= 0) {
                clearInterval(this.gameState.timerInterval);
                if (this.gameState.score < this.MAX_SCORE) {
                    this.showGameOver();
                } else {
                    this.showCongratulations();
                }
                return;
            }

            if (this.gameState.errors >= this.MAX_ERRORS || this.gameState.score >= this.MAX_SCORE) {
                clearInterval(this.gameState.timerInterval);
                this.endGame();
            }

            this.gameState.timer--;
            this.updateTimerDisplay();
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.gameState.timer / 60);
        const seconds = this.gameState.timer % 60;
        this.elements.timerDisplay.innerText = `Tempo restante: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    generateQuestion() {
        const num1 = Math.floor(Math.random() * 300);
        const num2 = Math.floor(Math.random() * 300);
        const operations = ['+', '-', '*'];
        const operation = operations[Math.floor(Math.random() * operations.length)];

        this.gameState.correctAnswer = this.calculateAnswer(num1, num2, operation);
        this.elements.questionDisplay.innerText = `Quanto é ${num1} ${operation} ${num2}?`;
    }

    calculateAnswer(num1, num2, operation) {
        switch (operation) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '*': return num1 * num2;
            default: return 0;
        }
    }

    handleAnswerSubmission(event) {
        if (event.key === 'Enter') {
            this.submitAnswer();
        }
    }

    submitAnswer() {
        const userAnswer = parseInt(this.elements.userAnswerInput.value);

        if (userAnswer === this.gameState.correctAnswer) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer();
        }

        this.elements.userAnswerInput.value = '';
    }

    handleCorrectAnswer() {
        this.elements.feedback.innerText = 'Correto!';
        this.elements.feedback.style.color = '#00ff00';
        this.sounds.correct.play();
        this.gameState.score++;
        this.elements.scoreCounter.innerText = `Acertos: ${this.gameState.score}`;
        if (this.gameState.score >= this.MAX_SCORE) {
            this.showCongratulations();
        } else {
            this.generateQuestion();
        }
    }

    handleWrongAnswer() {
        this.elements.feedback.innerText = 'Errado!';
        this.elements.feedback.style.color = 'red';
        this.sounds.wrong.play();
        this.gameState.errors++;
        this.elements.errorCounter.innerText = `Erros: ${this.gameState.errors}`;
        if (this.gameState.errors >= this.MAX_ERRORS) {
            this.showGameOver();
        }
    }

    handleSkipQuestion() {
        if (this.gameState.skips > 0) {
            this.gameState.skips--;
            this.elements.skipButton.innerText = `Pular Questão (${this.gameState.skips} restante${this.gameState.skips === 1 ? '' : 's'})`;
            this.generateQuestion();

            if (this.gameState.skips === 0) {
                this.elements.skipButton.disabled = true;
            }
        }
    }

    async showGameOver() {
        this.updateGameStateDisplay('Game Over!', 'red');
        this.sounds.gameOver.play();
        await this.waitForSoundEnd(this.sounds.gameOver);
        this.endGame();
    }

    async showCongratulations() {
        this.updateGameStateDisplay('Você ganhou!', '#00ff00');
        this.sounds.victory.play();
        await this.waitForSoundEnd(this.sounds.victory);

        await this.delay(3000);

        this.endGame();
    }

    updateGameStateDisplay(message, color) {
        document.querySelector('.container').innerHTML = `<h1 style="color: ${color}; font-size: 3em;">${message}</h1>`;
    }

    waitForSoundEnd(sound) {
        return new Promise(resolve => {
            sound.onended = resolve;
        });
    }

    async endGame() {
        try {
            const results = JSON.parse(localStorage.getItem('results')) || [];
            results.push({
                jogador: this.gameState.playerName,
                modalidade: 'Difícil',
                acertos: this.gameState.score,
                erros: this.gameState.errors,
                tempoRestante: this.gameState.timer,
                pulos: this.MAX_SKIPS - this.gameState.skips,
            });

            localStorage.setItem('results', JSON.stringify(results));

            const soundToPlay = 
                this.gameState.errors >= this.MAX_ERRORS || this.gameState.score < this.MAX_SCORE
                    ? this.sounds.gameOver
                    : this.sounds.victory;

            await this.waitForSoundEnd(soundToPlay);
            await this.delay(2000);

            window.location.href = 'resultados.html';
        } catch (error) {
            console.error('Erro ao finalizar o jogo:', error);
            alert('Ocorreu um erro ao finalizar o jogo. Por favor, tente novamente.');
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ==========================
// Inicialização do Jogo
// ==========================
const game = new Game();
