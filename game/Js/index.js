function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}

function startGame(difficulty) {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Por favor, insira seu nome para continuar.');
        return;
    }

    playSound('click.mp3');
    localStorage.setItem('currentPlayer', username);
    localStorage.setItem('currentDifficulty', difficulty);

    const url = `${difficulty}.html`;
    window.location.href = url;
}

function showResults() {
    playSound('click.mp3');
    window.location.href = 'resultados.html';
}